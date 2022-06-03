export interface Bookmark {
  id: string
  name: string
  url: string
  createdAt: string
  updatedAt: string
}

export interface ModalResponse {
  name: string
  url: string
}

export interface ModalOptions {
  body?: {
    name: string
    url: string
  }
  title?: string
}
