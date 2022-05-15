import { Injectable } from '@angular/core'
import { BehaviorSubject, distinctUntilChanged } from 'rxjs'
import { Notification } from '../../../types/notification'
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private subject = new BehaviorSubject<Notification[]>([])
  private readonly maxNotifications = 5
  public stream$ = this.subject.asObservable().pipe(distinctUntilChanged())

  constructor() {}

  private notificationTimers: { [key: string]: number } = {}

  public createNotification(notification: Omit<Notification, 'id'>) {
    if (this.subject.value.length >= this.maxNotifications) {
      this.subject.next(this.subject.value.slice(1))
    }

    const id = nanoid()
    this.subject.next([...this.subject.getValue(), { ...notification, id }])

    this.notificationTimers[id] = window.setTimeout(() => {
      this.deleteNotification(id)
    }, notification.lifeTime)
  }

  public deleteNotification(id: string) {
    this.subject.next(
      this.subject.getValue().filter((notification) => notification.id !== id)
    )
    clearInterval(this.notificationTimers[id])
  }
}
