import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BookmarkService } from '../services/bookmark.service'

@Component({
  selector: 'app-manage-bookmark',
  templateUrl: './manage-bookmark.component.html',
  styleUrls: ['./manage-bookmark.component.scss'],
})
export class ManageBookmarkComponent implements OnInit {
  constructor(public bookmarkService: BookmarkService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(http|https):\/\/[^ "]+$/),
      ]),
    })
  }

  form: FormGroup

  ngOnInit(): void {}

  public submit() {
    if (!this.form.valid) {
      return
    }

    this.bookmarkService.manageModalResolver?.next(this.form.value)
    this.bookmarkService.manageModalResolver?.complete()

    this.bookmarkService.isManageModalOpen = false
  }
}
