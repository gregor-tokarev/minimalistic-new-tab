import { Injectable } from '@angular/core'
import { IndexeddbService } from '../../core/services/indexeddb.service'
import { Bookmark } from '../../../types/bookmark'
import { Observable } from 'rxjs'
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
}
