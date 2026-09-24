import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListEntry } from './book-list-entry';

describe('BookListEntry', () => {
  let component: BookListEntry;
  let fixture: ComponentFixture<BookListEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListEntry],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
