import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { UIModule } from '../ui/ui.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, UIModule, HomeRoutingModule],
})
export class HomeModule {}
