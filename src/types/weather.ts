// export interface MeteomaticsWeather {
//   data: {
//     parameter: string
//     coordinates: {
//       lat: number
//       lon: number
//       dates: {
//         date: string
//         value: number
//       }[]
//     }[]
//   }[]
//   dateGenerated: string
//   status: string
//   user: string
//   version: string
// }
export interface WeatherApiResponse {
  base: string
  clouds: {
    all: number
  }
  cod: number
  coord: {
    lat: number
    lon: number
  }
  dt: number
  id: number
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string
  sys: {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
  }
  timezone: number
  visibility: number
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]

  wind: {
    deg: number
    speed: number
  }
}

export interface Weather {
  temp: number
  description: string
  icon: string
}
