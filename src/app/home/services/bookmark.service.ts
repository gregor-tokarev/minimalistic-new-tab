import { Injectable } from '@angular/core'
import { IndexeddbService } from '../../core/services/indexeddb.service'
import { Bookmark, ModalOptions, ModalResponse } from '../../../types/bookmark'
import { BehaviorSubject, Observable, Subscriber } from 'rxjs'
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  constructor(private readonly indexeddbService: IndexeddbService) {}

  public addBookmark(bookmark: Omit<Bookmark, 'id'>): Observable<Bookmark> {
    const bookmarkWithId = {
      ...bookmark,
      id: nanoid(),
    }

    return this.indexeddbService.addObject<Bookmark>(
      'bookmarks',
      bookmarkWithId
    )
  }

  public removeBookmark(bookmarkId: string): Observable<void> {
    return this.indexeddbService.deleteObject('bookmarks', bookmarkId)
  }

  public getBookmarks(): Observable<Bookmark[]> {
    return this.indexeddbService.getAll<Bookmark>('bookmarks')
  }

  public updateBookmark(
    bookmarkId: string,
    bookmark: Partial<Bookmark>
  ): Observable<Bookmark> {
    return this.indexeddbService.updateObject<Bookmark>(
      'bookmarks',
      bookmarkId,
      bookmark
    )
  }

  public modalOptions = new BehaviorSubject<ModalOptions>({
    body: { name: '', url: '' },
    title: '',
  })

  public manageModalResolver?: Subscriber<ModalResponse>
  public isManageModalOpen = false

  public openBookmarkModal(
    options: ModalOptions = {
      body: { url: '', name: '' },
      title: '',
    }
  ): Observable<ModalResponse> {
    this.isManageModalOpen = true
    this.modalOptions.next(options)

    return new Observable<ModalResponse>((observer) => {
      this.manageModalResolver = observer
    })
  }

  public deleteBookmark(bookmarkId: string): Observable<void> {
    return this.indexeddbService.deleteObject('bookmarks', bookmarkId)
  }
}
