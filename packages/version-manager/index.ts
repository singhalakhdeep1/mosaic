/**
 * Micro-frontend Version Manager
 * Manages versioning and compatibility across micro-frontends
 */

interface MicroFrontendVersion {
  name: string;
  version: string;
  semver: {
    major: number;
    minor: number;
    patch: number;
  };
  dependencies: Record<string, string>;
  compatibleWith: string[];
  deprecated: boolean;
}

class VersionManager {
  private versions: Map<string, MicroFrontendVersion> = new Map();
  private currentVersions: Map<string, string> = new Map();

  /**
   * Register a micro-frontend version
   */
  registerVersion(version: MicroFrontendVersion): void {
    this.versions.set(`${version.name}@${version.version}`, version);
    
    // Set as current if no current version exists
    if (!this.currentVersions.has(version.name)) {
      this.currentVersions.set(version.name, version.version);
    }
  }

  /**
   * Get current version of a micro-frontend
   */
  getCurrentVersion(name: string): string | undefined {
    return this.currentVersions.get(name);
  }

  /**
   * Set current version of a micro-frontend
   */
  setCurrentVersion(name: string, version: string): void {
    const versionKey = `${name}@${version}`;
    if (!this.versions.has(versionKey)) {
      throw new Error(`Version ${version} for ${name} not registered`);
    }
    this.currentVersions.set(name, version);
  }

  /**
   * Check compatibility between micro-frontends
   */
  checkCompatibility(mf1: string, mf2: string): boolean {
    const v1 = this.versions.get(`${mf1}@${this.currentVersions.get(mf1)}`);
    const v2 = this.versions.get(`${mf2}@${this.currentVersions.get(mf2)}`);

    if (!v1 || !v2) return false;

    // Check if v1 is compatible with v2's version
    const isCompatible = v1.compatibleWith.includes(v2.version) ||
                        this.isSemverCompatible(v1.version, v2.version);

    return isCompatible;
  }

  /**
   * Get all versions of a micro-frontend
   */
  getAllVersions(name: string): MicroFrontendVersion[] {
    return Array.from(this.versions.values())
      .filter(v => v.name === name)
      .sort((a, b) => this.compareVersions(b.version, a.version));
  }

  /**
   * Get latest version of a micro-frontend
   */
  getLatestVersion(name: string): string | undefined {
    const versions = this.getAllVersions(name);
    return versions[0]?.version;
  }

  /**
   * Compare two semantic versions
   */
  private compareVersions(v1: string, v2: string): number {
    const semv1 = this.parseSemver(v1);
    const semv2 = this.parseSemver(v2);

    if (semv1.major !== semv2.major) return semv1.major - semv2.major;
    if (semv1.minor !== semv2.minor) return semv1.minor - semv2.minor;
    return semv1.patch - semv2.patch;
  }

  /**
   * Check if versions are semver compatible
   */
  private isSemverCompatible(v1: string, v2: string): boolean {
    const semv1 = this.parseSemver(v1);
    const semv2 = this.parseSemver(v2);

    // Major version must match for compatibility
    if (semv1.major !== semv2.major) return false;

    return true;
  }

  /**
   * Parse semantic version
   */
  private parseSemver(version: string): { major: number; minor: number; patch: number } {
    const parts = version.split('.').map(Number);
    return {
      major: parts[0] || 0,
      minor: parts[1] || 0,
      patch: parts[2] || 0,
    };
  }

  /**
   * Get version compatibility report
   */
  getCompatibilityReport(): {
    microFrontends: Array<{ name: string; version: string; deprecated: boolean }>;
    compatibilityMatrix: Record<string, Record<string, boolean>>;
    issues: string[];
  } {
    const microFrontends = Array.from(this.currentVersions.entries()).map(([name, version]) => {
      const versionData = this.versions.get(`${name}@${version}`);
      return {
        name,
        version,
        deprecated: versionData?.deprecated || false,
      };
    });

    const compatibilityMatrix: Record<string, Record<string, boolean>> = {};
    const issues: string[] = [];

    microFrontends.forEach(({ name: mf1 }) => {
      compatibilityMatrix[mf1] = {};
      microFrontends.forEach(({ name: mf2 }) => {
        if (mf1 !== mf2) {
          const compatible = this.checkCompatibility(mf1, mf2);
          compatibilityMatrix[mf1][mf2] = compatible;
          if (!compatible) {
            issues.push(`${mf1} is not compatible with ${mf2}`);
          }
        }
      });
    });

    return {
      microFrontends,
      compatibilityMatrix,
      issues,
    };
  }

  /**
   * Rollback to previous version
   */
  rollback(name: string): string | undefined {
    const currentVersion = this.currentVersions.get(name);
    if (!currentVersion) return undefined;

    const versions = this.getAllVersions(name);
    const currentIndex = versions.findIndex(v => v.version === currentVersion);
    
    if (currentIndex < versions.length - 1) {
      const previousVersion = versions[currentIndex + 1].version;
      this.setCurrentVersion(name, previousVersion);
      return previousVersion;
    }

    return undefined;
  }
}

export const versionManager = new VersionManager();

// Initialize with default micro-frontends
versionManager.registerVersion({
  name: 'auth',
  version: '1.0.0',
  semver: { major: 1, minor: 0, patch: 0 },
  dependencies: {},
  compatibleWith: ['1.0.0', '1.1.0'],
  deprecated: false,
});

versionManager.registerVersion({
  name: 'ecommerce',
  version: '1.0.0',
  semver: { major: 1, minor: 0, patch: 0 },
  dependencies: { auth: '^1.0.0' },
  compatibleWith: ['1.0.0'],
  deprecated: false,
});

versionManager.registerVersion({
  name: 'healthcare',
  version: '1.0.0',
  semver: { major: 1, minor: 0, patch: 0 },
  dependencies: { auth: '^1.0.0' },
  compatibleWith: ['1.0.0'],
  deprecated: false,
});
