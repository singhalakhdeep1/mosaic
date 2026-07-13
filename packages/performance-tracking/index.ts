/**
 * Performance Tracking for Micro-frontends
 * Monitors and reports performance metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

interface PerformanceReport {
  microFrontend: string;
  metrics: {
    fcp: number; // First Contentful Paint
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte
  };
  customMetrics: PerformanceMetric[];
}

class PerformanceTracker {
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private observers: PerformanceObserver[] = [];

  /**
   * Initialize performance tracking
   */
  init(microFrontendName: string): void {
    this.metrics.set(microFrontendName, []);

    // Track Web Vitals
    this.trackFCP(microFrontendName);
    this.trackLCP(microFrontendName);
    this.trackFID(microFrontendName);
    this.trackCLS(microFrontendName);
    this.trackTTFB(microFrontendName);

    // Track custom metrics
    this.trackNavigationTiming(microFrontendName);
    this.trackResourceTiming(microFrontendName);
  }

  /**
   * Track First Contentful Paint
   */
  private trackFCP(microFrontendName: string): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(microFrontendName, {
            name: 'fcp',
            value: entry.startTime,
            timestamp: Date.now(),
          });
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * Track Largest Contentful Paint
   */
  private trackLCP(microFrontendName: string): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(microFrontendName, {
            name: 'lcp',
            value: entry.startTime,
            timestamp: Date.now(),
          });
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * Track First Input Delay
   */
  private trackFID(microFrontendName: string): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(microFrontendName, {
            name: 'fid',
            value: (entry as any).processingStart - entry.startTime,
            timestamp: Date.now(),
          });
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  /**
   * Track Cumulative Layout Shift
   */
  private trackCLS(microFrontendName: string): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.recordMetric(microFrontendName, {
              name: 'cls',
              value: clsValue,
              timestamp: Date.now(),
            });
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  /**
   * Track Time to First Byte
   */
  private trackTTFB(microFrontendName: string): void {
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      this.recordMetric(microFrontendName, {
        name: 'ttfb',
        value: ttfb,
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Track navigation timing
   */
  private trackNavigationTiming(microFrontendName: string): void {
    if (performance.timing) {
      const timing = performance.timing;
      const metrics = [
        { name: 'dom_content_loaded', value: timing.domContentLoadedEventEnd - timing.navigationStart },
        { name: 'dom_complete', value: timing.domComplete - timing.navigationStart },
        { name: 'load_complete', value: timing.loadEventEnd - timing.navigationStart },
      ];

      metrics.forEach(metric => {
        this.recordMetric(microFrontendName, {
          ...metric,
          timestamp: Date.now(),
        });
      });
    }
  }

  /**
   * Track resource timing
   */
  private trackResourceTiming(microFrontendName: string): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          this.recordMetric(microFrontendName, {
            name: 'resource_load',
            value: resource.duration,
            timestamp: Date.now(),
            tags: {
              resource_name: resource.name,
              resource_type: resource.initiatorType,
            },
          });
        }
      });
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  /**
   * Record a custom metric
   */
  recordMetric(microFrontendName: string, metric: PerformanceMetric): void {
    const metrics = this.metrics.get(microFrontendName) || [];
    metrics.push(metric);
    this.metrics.set(microFrontendName, metrics);

    // Keep only last 1000 metrics per micro-frontend
    if (metrics.length > 1000) {
      this.metrics.set(microFrontendName, metrics.slice(-1000));
    }
  }

  /**
   * Get performance report for a micro-frontend
   */
  getReport(microFrontendName: string): PerformanceReport | null {
    const metrics = this.metrics.get(microFrontendName);
    if (!metrics || metrics.length === 0) {
      return null;
    }

    const getLatestMetric = (name: string): number => {
      const metric = metrics.filter(m => m.name === name).pop();
      return metric?.value || 0;
    };

    const customMetrics = metrics.filter(m => 
      !['fcp', 'lcp', 'fid', 'cls', 'ttfb', 'dom_content_loaded', 'dom_complete', 'load_complete'].includes(m.name)
    );

    return {
      microFrontend: microFrontendName,
      metrics: {
        fcp: getLatestMetric('fcp'),
        lcp: getLatestMetric('lcp'),
        fid: getLatestMetric('fid'),
        cls: getLatestMetric('cls'),
        ttfb: getLatestMetric('ttfb'),
      },
      customMetrics,
    };
  }

  /**
   * Get performance score (0-100)
   */
  getScore(microFrontendName: string): number {
    const report = this.getReport(microFrontendName);
    if (!report) return 100;

    const metrics = report.metrics;
    
    // Scoring based on Web Vitals thresholds
    const fcpScore = this.scoreMetric(metrics.fcp, [1800, 3000]); // Good: <1.8s, Poor: >3s
    const lcpScore = this.scoreMetric(metrics.lcp, [2500, 4000]); // Good: <2.5s, Poor: >4s
    const fidScore = this.scoreMetric(metrics.fid, [100, 300]); // Good: <100ms, Poor: >300ms
    const clsScore = this.scoreMetric(metrics.cls, [0.1, 0.25]); // Good: <0.1, Poor: >0.25
    const ttfbScore = this.scoreMetric(metrics.ttfb, [600, 1000]); // Good: <600ms, Poor: >1s

    return Math.round((fcpScore + lcpScore + fidScore + clsScore + ttfbScore) / 5);
  }

  /**
   * Score a single metric
   */
  private scoreMetric(value: number, thresholds: [number, number]): number {
    const [good, poor] = thresholds;
    if (value <= good) return 100;
    if (value >= poor) return 0;
    return Math.round(100 - ((value - good) / (poor - good)) * 100);
  }

  /**
   * Get all metrics for a micro-frontend
   */
  getAllMetrics(microFrontendName: string): PerformanceMetric[] {
    return this.metrics.get(microFrontendName) || [];
  }

  /**
   * Clear metrics for a micro-frontend
   */
  clearMetrics(microFrontendName: string): void {
    this.metrics.set(microFrontendName, []);
  }

  /**
   * Disconnect all observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Mark a custom timing
   */
  mark(microFrontendName: string, name: string): void {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${microFrontendName}:${name}`);
    }
  }

  /**
   * Measure between two marks
   */
  measure(microFrontendName: string, name: string, startMark: string, endMark: string): void {
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.measure(`${microFrontendName}:${name}`, `${microFrontendName}:${startMark}`, `${microFrontendName}:${endMark}`);
        const measure = performance.getEntriesByName(`${microFrontendName}:${name}`)[0];
        if (measure) {
          this.recordMetric(microFrontendName, {
            name,
            value: measure.duration,
            timestamp: Date.now(),
          });
        }
      } catch (e) {
        console.warn('Performance measure failed:', e);
      }
    }
  }
}

export const performanceTracker = new PerformanceTracker();

// React hook for performance tracking
export function usePerformanceTracking(microFrontendName: string) {
  React.useEffect(() => {
    performanceTracker.init(microFrontendName);

    return () => {
      performanceTracker.disconnect();
    };
  }, [microFrontendName]);

  const recordMetric = (name: string, value: number, tags?: Record<string, string>) => {
    performanceTracker.recordMetric(microFrontendName, {
      name,
      value,
      timestamp: Date.now(),
      tags,
    });
  };

  const getReport = () => performanceTracker.getReport(microFrontendName);
  const getScore = () => performanceTracker.getScore(microFrontendName);

  return {
    recordMetric,
    getReport,
    getScore,
  };
}

// Import React for the hook
import React from 'react';
