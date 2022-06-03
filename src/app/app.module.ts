import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InlineSVGModule } from 'ng-inline-svg-2'
import { HttpClientModule } from '@angular/common/http'
import { UIModule } from './ui/ui.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    UIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
