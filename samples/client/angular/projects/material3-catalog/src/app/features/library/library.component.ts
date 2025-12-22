/*
 Copyright 2025 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Surface } from '@a2ui/angular';
import * as v0_8 from '@a2ui/lit/0.8';
import componentsData from './components.json';

@Component({
  selector: 'app-library',
  imports: [Surface],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class LibraryComponent {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  selectedBlock: { name: string; surface: v0_8.Types.Surface } | null = null;
  activeSection = '';
  showJsonId: string | null = null;

  openDialog(block: { name: string; surface: v0_8.Types.Surface }) {
    this.selectedBlock = block;
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }

  onDialogClick(event: MouseEvent) {
    if (event.target === this.dialog.nativeElement) {
      this.closeDialog();
    }
  }

  scrollTo(name: string) {
    this.activeSection = name;
    const element = document.getElementById('section-' + name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onScroll(event: Event) {
    const container = event.target as HTMLElement;
    const sections = container.querySelectorAll('.component-section');
    let current = '';
    const containerTop = container.scrollTop;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      const sectionTop = section.offsetTop - container.offsetTop;
      if (sectionTop <= containerTop + 100) {
        const id = section.getAttribute('id');
        if (id) current = id.replace('section-', '');
      }
    }
    if (current && current !== this.activeSection) {
      this.activeSection = current;
    }
  }

  toggleJson(name: string) {
    this.showJsonId = this.showJsonId === name ? null : name;
  }

  getJson(surface: v0_8.Types.Surface): string {
    const components = Object.values(surface.components).map((c: any) => ({
      id: c.id,
      component: {
        [c.type]: c.properties,
      },
    }));

    return JSON.stringify(
      {
        root: surface.rootComponentId,
        components,
      },
      null,
      2,
    );
  }

  blocks = (componentsData as any[]).map((data) => ({
    name: data.name,
    tag: data.tag,
    surface: this.createSurfaceFromData(data),
  }));

  private createSurfaceFromData(data: any): v0_8.Types.Surface {
    const rootId = data.rootId || 'root';

    // 1. Convert flat list to map
    const componentsMap: Record<string, any> = {};
    if (data.components && Array.isArray(data.components)) {
      for (const item of data.components) {
        if (item.id && item.component) {
          // item.component is { Type: { props... } }
          // We need to extract the type and properties
          const type = Object.keys(item.component)[0];
          if (type) {
            componentsMap[item.id] = {
              id: item.id,
              type: type,
              properties: item.component[type] || {}
            };
          }
        }
      }
    }

    // 2. Inflate the tree (resolve IDs to component objects)
    const inflatedRoot = this.inflateComponent(componentsMap[rootId], componentsMap);

    return {
      rootComponentId: rootId,
      dataModel: new Map(),
      styles: {},
      componentTree: inflatedRoot,
      components: componentsMap,
    } as any;
  }

  private inflateComponent(node: any, map: Record<string, any>, visited = new Set<string>()): any {
    if (!node) return node;

    // Component Reference Resolution
    if (typeof node === 'string' && map[node]) {
      if (visited.has(node)) return map[node]; // Cycle detected or already visited, return ref
      const component = map[node];
      // We must clone/process this component to inflate ITs properties too
      visited.add(node);
      // Important: We need to inflate the properties of the referenced component
      // We create a copy to avoid mutating the original map entry if reused (though in this context it's fine)
      return {
        ...component,
        properties: this.inflateComponent(component.properties, map, new Set(visited))
      };
    }

    if (Array.isArray(node)) {
      return node.map(item => this.inflateComponent(item, map, new Set(visited)));
    }

    if (typeof node === 'object') {
      const copy: any = {};
      for (const key of Object.keys(node)) {
        copy[key] = this.inflateComponent(node[key], map, visited); // Pass visited set? Shared or branched?
        // Branching visited set is safer for tree structure to allow identical subtrees?
        // But if it IS a tree, shared set prevents cycles.
        // A2UI is strictly a tree usually. Arrays might contain same component ID twice?
        // If so, we want to inflate both.
        // But if we inflate both, we return two objects.
      }
      return copy;
    }

    return node;
  }
}
