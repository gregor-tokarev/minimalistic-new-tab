import { Component, OnDestroy, OnInit } from '@angular/core'
import { IndexeddbService } from './core/services/indexeddb.service'
import { noop, Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private indexeddbService: IndexeddbService) {}

  private indexdbInitSubscription$?: Subscription

  ngOnInit() {
    this.indexdbInitSubscription$ = this.indexeddbService.init().subscribe(noop)
  }

  ngOnDestroy() {
    this.indexdbInitSubscription$?.unsubscribe()
  }
}
