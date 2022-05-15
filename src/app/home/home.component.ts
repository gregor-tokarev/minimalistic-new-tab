import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { WeatherService } from './services/weather.service'
import { Weather } from '../../types/weather'
import { NotificationService } from '../ui/services/notification.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public weatherService: WeatherService,
    private notificationService: NotificationService
  ) {}

  @ViewChild('timer') timer?: ElementRef

  public time?: string = this.getTime()
  private timerInterval?: number
  public weather?: Weather

  ngOnInit(): void {
    if (this.weatherService.isAgreeWithWeather()) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.weatherService
            .fetchWeather(position.coords.latitude, position.coords.longitude)
            .subscribe((weather) => {
              this.weather = weather
            })
        },
        (_error) => {
          this.weatherService.setWeatherAgreebilness(false)
        }
      )
    }
  }

  public addWeather(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.weatherService.setWeatherAgreebilness(true)
        this.weatherService
          .fetchWeather(position.coords.latitude, position.coords.longitude)
          .subscribe((weather) => {
            this.weather = weather
          })
      },
      (_error) => {
        this.weatherService.setWeatherAgreebilness(false)
        this.notificationService.createNotification({
          type: 'message',
          message: 'You need to allow location access',
          lifeTime: 3000,
        })
      }
    )
  }

  ngAfterViewInit() {
    this.timerInterval = window.setInterval(() => {
      this.time = this.getTime()
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval)
  }

  private getTime(): string {
    const date = new Date()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    return `${hours}:${minutes}`
  }
}
