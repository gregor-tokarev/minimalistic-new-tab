import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  public isURL(value: string): boolean {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      value
    )
  }

  public urlValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && !this.isURL(control.value)) {
      return { url: true }
    }
    return null
  }
}
