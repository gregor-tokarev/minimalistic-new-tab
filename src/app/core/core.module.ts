import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IndexeddbService } from './services/indexeddb.service'

@NgModule({
  providers: [IndexeddbService],
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {}
