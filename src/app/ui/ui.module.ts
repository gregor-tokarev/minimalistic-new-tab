import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TagButtonComponent } from './tag-button/tag-button.component'
import { IconComponent } from './icon/icon.component'
import { InlineSVGModule } from 'ng-inline-svg-2'
import { NotificationsComponent } from './notifications/notifications.component'
import { InputComponent } from './input/input.component'
import { ModalComponent } from './modal/modal.component'
import { ButtonComponent } from './button/button.component'
import { LoaderComponent } from './loader/loader.component'

@NgModule({
  declarations: [
    TagButtonComponent,
    IconComponent,
    NotificationsComponent,
    InputComponent,
    ModalComponent,
    ButtonComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, InlineSVGModule],
  exports: [
    TagButtonComponent,
    IconComponent,
    NotificationsComponent,
    InputComponent,
    ModalComponent,
    ButtonComponent,
    LoaderComponent,
  ],
})
export class UIModule {}
