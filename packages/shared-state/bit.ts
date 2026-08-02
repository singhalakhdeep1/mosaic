// Bit integration for mosaic

import { Workspace } from '@teambit/workspace';
import { Component } from '@teambit/component';

export class BitManager {
  private workspace: Workspace;

  constructor(workspacePath: string) {
    this.workspace = new Workspace(workspacePath);
  }

  async listComponents() {
    const components = await this.workspace.list();
    return components.map((comp: Component) => ({
      id: comp.id,
      name: comp.name,
      packageName: comp.packageName,
      mainFile: comp.mainFile,
    }));
  }

  async createComponent(componentPath: string, name: string) {
    const component = await this.workspace.createComponent(componentPath, {
      name,
      scope: 'mosaic',
    });
    return component;
  }

  async exportComponent(componentId: string) {
    const component = await this.workspace.get(componentId);
    return await component.export();
  }

  async importComponent(componentId: string) {
    return await this.workspace.import(componentId);
  }

  async tagComponent(componentId: string, version: string) {
    const component = await this.workspace.get(componentId);
    return await component.tag(version);
  }

  async buildComponent(componentId: string) {
    const component = await this.workspace.get(componentId);
    return await component.build();
  }

  async testComponent(componentId: string) {
    const component = await this.workspace.get(componentId);
    return await component.test();
  }

  async getComponentDependencies(componentId: string) {
    const component = await this.workspace.get(componentId);
    return await component.dependencies();
  }

  async setComponentEnv(componentId: string, envId: string) {
    const component = await this.workspace.get(componentId);
    return await component.setEnv(envId);
  }

  async createScope(scopeName: string) {
    return await this.workspace.createScope(scopeName);
  }

  async listScopes() {
    return await this.workspace.listScopes();
  }

  async ejectComponent(componentId: string, targetPath: string) {
    const component = await this.workspace.get(componentId);
    return await component.eject(targetPath);
  }

  async removeComponent(componentId: string) {
    const component = await this.workspace.get(componentId);
    return await component.remove();
  }
}

export const bitManager = new BitManager(process.cwd());
