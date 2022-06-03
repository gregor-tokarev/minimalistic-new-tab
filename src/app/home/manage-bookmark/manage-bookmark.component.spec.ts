import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ManageBookmarkComponent } from './manage-bookmark.component'

describe('ManageBookmarkComponent', () => {
  let component: ManageBookmarkComponent
  let fixture: ComponentFixture<ManageBookmarkComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBookmarkComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookmarkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
