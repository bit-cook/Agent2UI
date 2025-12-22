import { Component, computed, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent, Renderer } from '@a2ui/angular';
import { Primitives } from '@a2ui/lit/0.8';
import '@material/web/labs/badge/badge.js';

@Component({
  selector: 'catalog-md-badge',
  standalone: true,
  imports: [CommonModule, Renderer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-badge
        [value]="resolvedValue()"><ng-content></ng-content></md-badge>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MdBadge extends DynamicComponent {
  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  readonly value = input<Primitives.StringValue | string | null>(null);

  protected resolvedValue = computed(() => {
    const v = this.value();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
}
