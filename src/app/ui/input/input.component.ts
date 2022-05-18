import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string = ''
  @Input() type?: string = 'text'
  @Input() placeholder?: string = ''
  @Input() value?: string = ''
  @Input() disabled?: boolean = false

  @Output() valueChange = new EventEmitter<string>()
  @Output() enter = new EventEmitter<Event>()

  touched: boolean = false
  onTouch: () => void = () => {}
  onWrite: (value: string) => void = () => {}

  constructor() {}

  ngOnInit(): void {}

  updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value

    this.onWrite(value)
    this.valueChange.emit(value)
  }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onWrite = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled
  }
}
