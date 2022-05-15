import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TagButtonComponent } from './tag-button/tag-button.component'
import { IconComponent } from './icon/icon.component'
import { InlineSVGModule } from 'ng-inline-svg-2'
import { NotificationsComponent } from './notifications/notifications.component'

@NgModule({
  declarations: [TagButtonComponent, IconComponent, NotificationsComponent],
  imports: [CommonModule, InlineSVGModule],
  exports: [TagButtonComponent, IconComponent, NotificationsComponent],
})
export class UIModule {}
