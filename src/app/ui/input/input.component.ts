import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label?: string = ''
  @Input() type?: string = 'text'
  @Input() placeholder?: string = ''
  @Input() value?: string = ''

  @Output() valueChange = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.valueChange.emit(value)
  }
}
