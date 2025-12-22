import { Component, computed, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent, Renderer } from '@a2ui/angular';
import { Primitives } from '@a2ui/lit/0.8';
import '@material/web/tabs/secondary-tab.js';

@Component({
  selector: 'catalog-md-secondary-tab',
  standalone: true,
  imports: [CommonModule, Renderer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-secondary-tab
        [active]="resolvedActive()"
        [hasIcon]="resolvedHasIcon()"
        [iconOnly]="resolvedIconOnly()"><ng-content></ng-content></md-secondary-tab>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MdSecondaryTab extends DynamicComponent {
  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  readonly active = input<Primitives.BooleanValue | boolean | null>(null);
  readonly hasIcon = input<Primitives.BooleanValue | boolean | null>(null);
  readonly iconOnly = input<Primitives.BooleanValue | boolean | null>(null);

  protected resolvedActive = computed(() => {
    const v = this.active();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedHasIcon = computed(() => {
    const v = this.hasIcon();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedIconOnly = computed(() => {
    const v = this.iconOnly();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
}
