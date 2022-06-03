import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BookmarkService } from '../services/bookmark.service'
import { ValidationService } from '../../core/services/validation.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-manage-bookmark',
  templateUrl: './manage-bookmark.component.html',
  styleUrls: ['./manage-bookmark.component.scss'],
})
export class ManageBookmarkComponent implements OnInit, OnDestroy {
  constructor(
    private bookmarkService: BookmarkService,
    private validationService: ValidationService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [
        Validators.required,
        this.validationService.urlValidator.bind(this.validationService),
      ]),
    })
  }

  set isOpen(value: boolean) {
    if (!value) {
      this.bookmarkService.manageModalResolver?.error()
      this.bookmarkService.manageModalResolver?.complete()

      this.bookmarkService.isManageModalOpen = false
    }
  }

  get isOpen() {
    return this.bookmarkService.isManageModalOpen
  }

  form: FormGroup
  fieldsSubscription$?: Subscription

  modalTitle = ''

  ngOnInit(): void {
    this.fieldsSubscription$ = this.bookmarkService.modalOptions.subscribe(
      (options) => {
        console.log(options)
        this.form.setValue(options.body ?? { name: '', url: '' })
        this.modalTitle = options.title ?? ''
      }
    )
  }

  ngOnDestroy() {
    this.fieldsSubscription$?.unsubscribe()
  }

  public submit() {
    if (!this.form.valid) {
      return
    }

    this.bookmarkService.manageModalResolver?.next(this.form.value)
    this.bookmarkService.manageModalResolver?.complete()

    this.bookmarkService.isManageModalOpen = false
  }
}
