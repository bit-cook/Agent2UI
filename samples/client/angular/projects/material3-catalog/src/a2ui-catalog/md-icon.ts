import { Component, computed, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent, Renderer } from '@a2ui/angular';
import { Primitives } from '@a2ui/lit/0.8';
import '@material/web/icon/icon.js';

@Component({
  selector: 'catalog-md-icon',
  standalone: true,
  imports: [CommonModule, Renderer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-icon
        ><ng-container
        a2ui-renderer
        [surfaceId]="surfaceId()!"
        [component]="component().properties['child']"
      /><ng-content></ng-content></md-icon>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MdIcon extends DynamicComponent {
  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  readonly child = input<any | Component | null>(null);

  protected resolvedChild = computed(() => {
    const v = this.child() as any;
    if (v && v.type === 'Text') {
        return v.properties?.text ?? '';
    }
    return '';
  });
}
