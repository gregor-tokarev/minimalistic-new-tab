import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Weather, WeatherApiResponse } from '../../../types/weather'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public isAgreeWithWeather(): boolean {
    return localStorage.getItem('agreeWithWeather') === 'true'
  }

  public getWeatherIconUrl(iconName: string): string {
    return `https://openweathermap.org/img/wn/${iconName}@2x.png`
  }

  public setWeatherAgreebilness(agree: boolean): void {
    localStorage.setItem('agreeWithWeather', agree.toString())
  }

  public fetchWeather(lan: number, lon: number): Observable<Weather> {
    return this.http
      .get<WeatherApiResponse>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&appid=${environment.weatherApiKey}&units=metric`
      )
      .pipe(
        map((weather) => ({
          temp: weather.main.temp,
          description: weather.weather[0].description,
          icon: weather.weather[0].icon,
        }))
      )
  }
}
