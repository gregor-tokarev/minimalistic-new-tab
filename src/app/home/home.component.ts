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
import { BookmarkService } from './services/bookmark.service'
import * as dayjs from 'dayjs'
import { concatMap, Subscription } from 'rxjs'
import { Bookmark } from '../../types/bookmark'
import { ValidationService } from '../core/services/validation.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public weatherService: WeatherService,
    private notificationService: NotificationService,
    public bookmarkService: BookmarkService,
    private validationService: ValidationService
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

    this.bookmarksSubscription$ = this.bookmarkService
      .getBookmarks()
      .subscribe((bookmarks) => {
        this.bookmarks = bookmarks
      })
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
    this.bookmarksSubscription$?.unsubscribe()
    clearInterval(this.timerInterval)
  }

  private getTime(): string {
    const date = new Date()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    return `${hours}:${minutes}`
  }

  public bookmarksSubscription$?: Subscription
  private _searchQuery: string = ''
  public bookmarks: Bookmark[] = []

  public get filteredBookmarks(): Bookmark[] {
    if (this._searchQuery === '') {
      return this.bookmarks
    }

    return this.bookmarks.filter((bookmark) =>
      bookmark.name.toLowerCase().includes(this._searchQuery.toLowerCase())
    )
  }

  public get validUrlInSearch(): boolean {
    return this.validationService.isURL(this.searchQuery)
  }

  public get urlInSearch(): URL {
    return new URL(this.searchQuery)
  }

  public get urlDomain(): string {
    const urlDomain = this.urlInSearch.hostname.split('.')
    return urlDomain[urlDomain.length - 2]
  }

  public set searchQuery(value: string) {
    this._searchQuery = value
  }

  public get searchQuery(): string {
    return this._searchQuery
  }

  createBookmarkFromUrl(): void {
    if (this.validUrlInSearch) {
      this.bookmarkService
        .addBookmark({
          name: this.urlDomain,
          url: this.searchQuery,
          createdAt: dayjs().format(),
          updatedAt: dayjs().format(),
        })
        .subscribe((bookmark) => {
          this.bookmarks.push(bookmark)
        })
      this.searchQuery = ''
    }
  }

  public deleteBookmark(event: Event, bookmarkId: string): void {
    event.preventDefault()
    event.stopPropagation()

    this.bookmarkService.deleteBookmark(bookmarkId).subscribe(() => {
      this.bookmarks = this.bookmarks.filter(
        (bookmark) => bookmark.id !== bookmarkId
      )
    })
  }

  public createBookmark() {
    this.bookmarkService
      .openBookmarkModal()
      .pipe(
        concatMap((bookmark) => {
          return this.bookmarkService.addBookmark({
            ...bookmark,
            createdAt: dayjs().format(),
            updatedAt: dayjs().format(),
          })
        })
      )
      .subscribe(
        (bookmark) => {
          this.bookmarks.push(bookmark)
        },
        (error) => {
          this.notificationService.createNotification({
            type: 'error',
            message: error.srcElement.error.message,
            lifeTime: 6000,
          })
        }
      )
  }

  editBookmark(event: Event, id: string) {
    event.preventDefault()
    event.stopPropagation()

    const bookmark = this.bookmarks.find((bookmark) => bookmark.id === id)
    this.bookmarkService
      .openBookmarkModal({
        name: bookmark?.name ?? '',
        url: bookmark?.url ?? '',
      })
      .pipe(
        concatMap((bookmark) => {
          return this.bookmarkService.updateBookmark(id, bookmark)
        })
      )
      .subscribe((bookmark) => {
        this.bookmarks = this.bookmarks.map((b) => {
          if (b.id === id) {
            return bookmark
          }
          return b
        })
      })
  }
}
