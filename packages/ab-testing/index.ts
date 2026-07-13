/**
 * A/B Testing Framework for Micro-frontends
 * Manages experiments, variants, and tracking
 */

interface Experiment {
  id: string;
  name: string;
  description: string;
  variants: Array<{
    id: string;
    name: string;
    weight: number;
  }>;
  status: 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  targeting?: {
    userIds?: string[];
    userSegments?: string[];
  };
}

interface ExperimentAssignment {
  experimentId: string;
  variantId: string;
  userId: string;
  assignedAt: Date;
}

interface ExperimentEvent {
  experimentId: string;
  variantId: string;
  userId: string;
  eventType: 'impression' | 'conversion' | 'custom';
  eventName?: string;
  value?: number;
  timestamp: Date;
}

class ABTestingManager {
  private experiments: Map<string, Experiment> = new Map();
  private assignments: Map<string, ExperimentAssignment> = new Map();
  private events: ExperimentEvent[] = [];

  /**
   * Create a new experiment
   */
  createExperiment(experiment: Omit<Experiment, 'id' | 'startDate'>): string {
    const id = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newExperiment: Experiment = {
      ...experiment,
      id,
      startDate: new Date(),
    };

    // Validate weights sum to 1
    const totalWeight = experiment.variants.reduce((sum, v) => sum + v.weight, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      throw new Error('Variant weights must sum to 1');
    }

    this.experiments.set(id, newExperiment);
    return id;
  }

  /**
   * Get experiment by ID
   */
  getExperiment(id: string): Experiment | undefined {
    return this.experiments.get(id);
  }

  /**
   * Get all active experiments
   */
  getActiveExperiments(): Experiment[] {
    return Array.from(this.experiments.values()).filter(
      exp => exp.status === 'active' &&
              (!exp.endDate || exp.endDate > new Date())
    );
  }

  /**
   * Assign user to a variant
   */
  assignVariant(experimentId: string, userId: string): string | null {
    const experiment = this.experiments.get(experimentId);
    if (!experiment || experiment.status !== 'active') {
      return null;
    }

    // Check if user is already assigned
    const assignmentKey = `${experimentId}_${userId}`;
    if (this.assignments.has(assignmentKey)) {
      const existing = this.assignments.get(assignmentKey)!;
      return existing.variantId;
    }

    // Check targeting
    if (experiment.targeting) {
      if (experiment.targeting.userIds && 
          !experiment.targeting.userIds.includes(userId)) {
        return null;
      }
    }

    // Assign variant based on weights
    const random = Math.random();
    let cumulativeWeight = 0;
    let selectedVariant: string | null = null;

    for (const variant of experiment.variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        selectedVariant = variant.id;
        break;
      }
    }

    if (selectedVariant) {
      const assignment: ExperimentAssignment = {
        experimentId,
        variantId: selectedVariant,
        userId,
        assignedAt: new Date(),
      };
      this.assignments.set(assignmentKey, assignment);

      // Track impression
      this.trackEvent(experimentId, selectedVariant, userId, 'impression');
    }

    return selectedVariant;
  }

  /**
   * Track an event
   */
  trackEvent(
    experimentId: string,
    variantId: string,
    userId: string,
    eventType: 'impression' | 'conversion' | 'custom',
    eventName?: string,
    value?: number
  ): void {
    const event: ExperimentEvent = {
      experimentId,
      variantId,
      userId,
      eventType,
      eventName,
      value,
      timestamp: new Date(),
    };

    this.events.push(event);
  }

  /**
   * Get experiment results
   */
  getExperimentResults(experimentId: string): {
    variants: Array<{
      id: string;
      name: string;
      impressions: number;
      conversions: number;
      conversionRate: number;
      averageValue?: number;
    }>;
    totalImpressions: number;
    totalConversions: number;
  } {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) {
      throw new Error('Experiment not found');
    }

    const variantResults = new Map<string, {
      impressions: number;
      conversions: number;
      values: number[];
    }>();

    // Initialize results
    experiment.variants.forEach(variant => {
      variantResults.set(variant.id, {
        impressions: 0,
        conversions: 0,
        values: [],
      });
    });

    // Process events
    this.events
      .filter(e => e.experimentId === experimentId)
      .forEach(event => {
        const result = variantResults.get(event.variantId);
        if (result) {
          if (event.eventType === 'impression') {
            result.impressions++;
          } else if (event.eventType === 'conversion') {
            result.conversions++;
            if (event.value !== undefined) {
              result.values.push(event.value);
            }
          }
        }
      });

    const variants = Array.from(variantResults.entries()).map(([variantId, result]) => {
      const variant = experiment.variants.find(v => v.id === variantId)!;
      return {
        id: variantId,
        name: variant.name,
        impressions: result.impressions,
        conversions: result.conversions,
        conversionRate: result.impressions > 0 
          ? (result.conversions / result.impressions) * 100 
          : 0,
        averageValue: result.values.length > 0
          ? result.values.reduce((sum, v) => sum + v, 0) / result.values.length
          : undefined,
      };
    });

    const totalImpressions = variants.reduce((sum, v) => sum + v.impressions, 0);
    const totalConversions = variants.reduce((sum, v) => sum + v.conversions, 0);

    return {
      variants,
      totalImpressions,
      totalConversions,
    };
  }

  /**
   * Calculate statistical significance
   */
  calculateSignificance(experimentId: string): {
    variant: string;
    pValue: number;
    isSignificant: boolean;
    confidence: number;
  }[] {
    const results = this.getExperimentResults(experimentId);
    const baseline = results.variants[0];
    const significanceResults = [];

    for (let i = 1; i < results.variants.length; i++) {
      const variant = results.variants[i];
      
      // Simple chi-square test for conversion rates
      const pValue = this.calculateChiSquare(
        baseline.conversions,
        baseline.impressions - baseline.conversions,
        variant.conversions,
        variant.impressions - variant.conversions
      );

      significanceResults.push({
        variant: variant.id,
        pValue,
        isSignificant: pValue < 0.05,
        confidence: (1 - pValue) * 100,
      });
    }

    return significanceResults;
  }

  /**
   * Chi-square test for statistical significance
   */
  private calculateChiSquare(
    aConversions: number,
    aNonConversions: number,
    bConversions: number,
    bNonConversions: number
  ): number {
    const aTotal = aConversions + aNonConversions;
    const bTotal = bConversions + bNonConversions;
    const total = aTotal + bTotal;

    const expectedAConversions = (aTotal * (aConversions + bConversions)) / total;
    const expectedANonConversions = (aTotal * (aNonConversions + bNonConversions)) / total;
    const expectedBConversions = (bTotal * (aConversions + bConversions)) / total;
    const expectedBNonConversions = (bTotal * (aNonConversions + bNonConversions)) / total;

    const chiSquare =
      Math.pow(aConversions - expectedAConversions, 2) / expectedAConversions +
      Math.pow(aNonConversions - expectedANonConversions, 2) / expectedANonConversions +
      Math.pow(bConversions - expectedBConversions, 2) / expectedBConversions +
      Math.pow(bNonConversions - expectedBNonConversions, 2) / expectedBNonConversions;

    // Convert chi-square to p-value (simplified)
    return Math.exp(-chiSquare / 2);
  }

  /**
   * End experiment
   */
  endExperiment(experimentId: string, winningVariantId?: string): void {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) return;

    experiment.status = 'completed';
    experiment.endDate = new Date();

    this.experiments.set(experimentId, experiment);
  }

  /**
   * Get user's active experiments
   */
  getUserExperiments(userId: string): Array<{
    experimentId: string;
    experimentName: string;
    variantId: string;
    variantName: string;
  }> {
    const results: Array<{
      experimentId: string;
      experimentName: string;
      variantId: string;
      variantName: string;
    }> = [];

    this.assignments.forEach((assignment, key) => {
      if (assignment.userId === userId) {
        const experiment = this.experiments.get(assignment.experimentId);
        if (experiment && experiment.status === 'active') {
          const variant = experiment.variants.find(v => v.id === assignment.variantId);
          if (variant) {
            results.push({
              experimentId: experiment.id,
              experimentName: experiment.name,
              variantId: variant.id,
              variantName: variant.name,
            });
          }
        }
      }
    });

    return results;
  }
}

export const abTestingManager = new ABTestingManager();

// React hook for A/B testing
export function useABTesting(experimentId: string, userId: string) {
  const variantId = abTestingManager.assignVariant(experimentId, userId);
  
  const trackConversion = (value?: number) => {
    if (variantId) {
      abTestingManager.trackEvent(experimentId, variantId, userId, 'conversion', undefined, value);
    }
  };

  const trackEvent = (eventName: string, value?: number) => {
    if (variantId) {
      abTestingManager.trackEvent(experimentId, variantId, userId, 'custom', eventName, value);
    }
  };

  return {
    variantId,
    trackConversion,
    trackEvent,
  };
}
