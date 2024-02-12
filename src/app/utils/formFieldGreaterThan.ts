import { AbstractControl } from "@angular/forms";

export const formFieldGreaterThan = (control: AbstractControl) => {
  const estimate = control.value;
  return estimate >= 0 ? null : { estimateInvalid: true };
}
