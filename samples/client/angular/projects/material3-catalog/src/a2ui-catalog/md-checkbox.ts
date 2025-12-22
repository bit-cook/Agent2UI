import { Component, computed, input, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent, Renderer } from '@a2ui/angular';
import { Primitives } from '@a2ui/lit/0.8';
import '@material/web/checkbox/checkbox.js';

@Component({
  selector: 'catalog-md-checkbox',
  standalone: true,
  imports: [CommonModule, Renderer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-checkbox
        [delegatesFocus]="resolvedDelegatesFocus()"
        [mode]="resolvedMode()"
        [serializable]="resolvedSerializable()"
        [slotAssignment]="resolvedSlotAssignment()"
        [checked]="resolvedChecked()"
        [indeterminate]="resolvedIndeterminate()"
        [required]="resolvedRequired()"
        [value]="resolvedValue()"
        [disabled]="resolvedDisabled()"
        [name]="resolvedName()"><ng-content></ng-content></md-checkbox>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class MdCheckbox extends DynamicComponent {
  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  readonly delegatesFocus = input<Primitives.BooleanValue | boolean | null>(null);
  readonly mode = input<Primitives.StringValue | string | null>(null);
  readonly serializable = input<Primitives.BooleanValue | boolean | null>(null);
  readonly slotAssignment = input<Primitives.StringValue | string | null>(null);
  readonly checked = input<Primitives.BooleanValue | boolean | null>(null);
  readonly indeterminate = input<Primitives.BooleanValue | boolean | null>(null);
  readonly required = input<Primitives.BooleanValue | boolean | null>(null);
  readonly value = input<Primitives.StringValue | string | null>(null);
  readonly disabled = input<Primitives.BooleanValue | boolean | null>(null);
  readonly name = input<Primitives.StringValue | string | null>(null);

  protected resolvedDelegatesFocus = computed(() => {
    const v = this.delegatesFocus();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedMode = computed(() => {
    const v = this.mode();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedSerializable = computed(() => {
    const v = this.serializable();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedSlotAssignment = computed(() => {
    const v = this.slotAssignment();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedChecked = computed(() => {
    const v = this.checked();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedIndeterminate = computed(() => {
    const v = this.indeterminate();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedRequired = computed(() => {
    const v = this.required();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedValue = computed(() => {
    const v = this.value();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
  protected resolvedDisabled = computed(() => {
    const v = this.disabled();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.BooleanValue) : (v as boolean)) ?? false;
  });
  protected resolvedName = computed(() => {
    const v = this.name();
    return ((v && typeof v === 'object') ? this.resolvePrimitive(v as Primitives.StringValue) : (typeof v === 'string' ? v : '')) ?? '';
  });
}
