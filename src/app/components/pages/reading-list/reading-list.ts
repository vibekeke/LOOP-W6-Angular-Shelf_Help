import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { BookService } from '../../../services/book-service';
import { finalize } from 'rxjs';
import { BookListEntry } from '../../book-list-entry/book-list-entry';

@Component({
  imports: [BookListEntry],
  selector: 'app-reading-list',
  styleUrl: './reading-list.css',
  templateUrl: './reading-list.html',
})
export class ReadingList {
  readonly userService = inject(UserService)
  readonly bookService = inject(BookService)

  readonly books = this.bookService.books;
  readonly booksInCollection = computed(() =>
    this.books().filter( b => this.userService.isInCollection(b.id)
    )
  );
  
  protected readonly errorMsg = signal<string | null> (null);
  protected readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true)
    this.bookService.fetchBooks().pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe(
      {error: (err) => {
        console.error('Reading list: Fetch failed', err)
        this.errorMsg.set("Could not load books. Try again later");
      }}
    ); 
  }
}
