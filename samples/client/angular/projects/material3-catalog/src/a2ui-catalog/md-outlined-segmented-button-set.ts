import { Component, computed, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent, Renderer } from '@a2ui/angular';
import { Primitives } from '@a2ui/lit/0.8';
import '@material/web/labs/segmentedbuttonset/outlined-segmented-button-set.js';

@Component({
  selector: 'catalog-md-outlined-segmented-button-set',
  standalone: true,
  imports: [CommonModule, Renderer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-outlined-segmented-button-set
        [multiselect]="resolvedMultiselect()"><ng-content></ng-content></md-outlined-segmented-button-set>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MdOutlinedSegmentedButtonSet extends DynamicComponent {
  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  readonly multiselect = input<Primitives.BooleanValue | boolean | null>(null);

  protected resolvedMultiselect = computed(() => {
    const v = this.multiselect();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
}
