import { Component, computed, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent, Renderer } from '@a2ui/angular';
import { Primitives } from '@a2ui/lit/0.8';
import '@material/web/button/outlined-button.js';

@Component({
  selector: 'catalog-md-outlined-button',
  standalone: true,
  imports: [CommonModule, Renderer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-outlined-button
        [disabled]="resolvedDisabled()"
        [softDisabled]="resolvedSoftDisabled()"
        [href]="resolvedHref()"
        [download]="resolvedDownload()"
        [target]="resolvedTarget()"
        [trailingIcon]="resolvedTrailingIcon()"
        [hasIcon]="resolvedHasIcon()"
        [type]="resolvedType()"
        [value]="resolvedValue()">
      @for (child of component().properties['children']; track child) {
        <ng-container a2ui-renderer [surfaceId]="surfaceId()!" [component]="child" />
      }
<ng-content></ng-content></md-outlined-button>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MdOutlinedButton extends DynamicComponent {
  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  readonly disabled = input<Primitives.BooleanValue | boolean | null>(null);
  readonly softDisabled = input<Primitives.BooleanValue | boolean | null>(null);
  readonly href = input<Primitives.StringValue | string | null>(null);
  readonly download = input<Primitives.StringValue | string | null>(null);
  readonly target = input<Primitives.StringValue | string | null>(null);
  readonly trailingIcon = input<Primitives.BooleanValue | boolean | null>(null);
  readonly hasIcon = input<Primitives.BooleanValue | boolean | null>(null);
  readonly type = input<Primitives.StringValue | string | null>(null);
  readonly value = input<Primitives.StringValue | string | null>(null);
  readonly children = input<any | Component[] | null>(null);

  protected resolvedDisabled = computed(() => {
    const v = this.disabled();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedSoftDisabled = computed(() => {
    const v = this.softDisabled();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedHref = computed(() => {
    const v = this.href();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedDownload = computed(() => {
    const v = this.download();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedTarget = computed(() => {
    const v = this.target();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedTrailingIcon = computed(() => {
    const v = this.trailingIcon();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedHasIcon = computed(() => {
    const v = this.hasIcon();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedType = computed(() => {
    const v = this.type();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedValue = computed(() => {
    const v = this.value();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedChildren = computed(() => {
    const v = this.children() as any[];
    return Array.isArray(v) ? v : [];
  });
}
