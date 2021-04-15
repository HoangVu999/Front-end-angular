import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateListBookComponent } from './cate-list-book.component';

describe('CateListBookComponent', () => {
  let component: CateListBookComponent;
  let fixture: ComponentFixture<CateListBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateListBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
