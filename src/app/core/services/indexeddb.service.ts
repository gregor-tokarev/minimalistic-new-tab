import { Injectable } from '@angular/core'
import { concatMap, Observable, of, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class IndexeddbService {
  constructor() {}

  private readonly dbName = 'main'
  private readonly dbVersion = 1
  private db?: IDBDatabase

  public init(): Observable<IDBDatabase> {
    return new Observable<IDBDatabase>((observer) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)
      request.addEventListener('error', (event) => {
        observer.error(event)
      })
      request.addEventListener('success', (_event) => {
        this.db = request.result
        observer.next(request.result)
        observer.complete()
      })
      request.addEventListener('upgradeneeded', (event) => {
        this.db = request.result

        if (event.oldVersion < 1) {
          this.v1Schema()
        }
      })
    })
  }

  private v1Schema() {
    const bookmarks = this.db?.createObjectStore('bookmarks', { keyPath: 'id' })
    bookmarks?.createIndex('url', 'url', { unique: true })
    bookmarks?.createIndex('name', 'name')
  }

  public deleteObject(dbName: string, objectId: string): Observable<any> {
    return new Observable<any>((observer) => {
      const transaction = this.db?.transaction([dbName], 'readwrite')
      const objectStore = transaction?.objectStore(dbName)
      const request = objectStore?.delete(objectId)
      request?.addEventListener('error', (event) => {
        observer.error(event)
      })
      request?.addEventListener('success', (event) => {
        observer.next(event)
        observer.complete()
      })
    })
  }

  public find<T>(
    dbName: string,
    indexName: string,
    searchValue: string | IDBKeyRange
  ): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      const transaction = this.db?.transaction([dbName], 'readonly')
      const objectStore = transaction?.objectStore(dbName)
      const index = objectStore?.index(indexName)
      const request = index?.getAll(searchValue)

      request?.addEventListener('error', (event) => {
        observer.error(event)
      })
      request?.addEventListener('success', (_event) => {
        observer.next(request.result)
        observer.complete()
      })
    })
  }

  public getAll<T>(dbName: string): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      const transaction = this.db?.transaction([dbName], 'readonly')
      const objectStore = transaction?.objectStore(dbName)
      const request = objectStore?.getAll()

      request?.addEventListener('error', (event) => {
        observer.error(event)
      })
      request?.addEventListener('success', (_event) => {
        observer.next(request.result)
        observer.complete()
      })
    })
  }

  public getObject<T>(dbName: string, objectId: string): Observable<T> {
    return new Observable<T>((observer) => {
      const transaction = this.db?.transaction([dbName], 'readonly')
      const objectStore = transaction?.objectStore(dbName)
      const request = objectStore?.get(objectId)

      request?.addEventListener('error', (event) => {
        observer.error(event)
      })
      request?.addEventListener('success', (_event) => {
        observer.next(request.result as T)
        observer.complete()
      })
    })
  }

  public updateObject<T>(
    dbName: string,
    objectId: string,
    objectUpdate: Partial<T>
  ): Observable<T | never> {
    return this.getObject<T>(dbName, objectId).pipe(
      concatMap((object) => {
        const updatedObject = { ...object, ...objectUpdate }

        const transaction = this.db?.transaction([dbName], 'readwrite')
        const store = transaction?.objectStore(dbName)
        const request = store?.put(updatedObject)

        request?.addEventListener('error', (_event) => {
          return throwError(new Error('Error updating object'))
        })

        request?.addEventListener('success', (_event) => {
          return of(updatedObject as T)
        })

        return of(updatedObject as T)
      })
    )
  }

  public addObject<T>(
    dbName: string,
    object: T & { id: string }
  ): Observable<T> {
    return new Observable((observer) => {
      const transaction = this.db?.transaction(dbName, 'readwrite')
      const store = transaction?.objectStore(dbName)
      const request = store?.add(object)

      request?.addEventListener('error', (event) => {
        observer.error(event)
        transaction?.abort()
      })
      request?.addEventListener('success', (_event) => {
        observer.next(object)
        observer.complete()
      })
    })
  }
}
