import { Injectable } from '@angular/core'

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
}
