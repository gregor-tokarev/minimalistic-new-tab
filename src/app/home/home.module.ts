import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { UIModule } from '../ui/ui.module'
import { ManageBookmarkComponent } from './manage-bookmark/manage-bookmark.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [HomeComponent, ManageBookmarkComponent],
  imports: [CommonModule, UIModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
