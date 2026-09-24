import { Component, inject, input, signal } from '@angular/core';
import { Book, BookService } from '../../services/book-service';
import { finalize } from 'rxjs';
import { UserService } from '../../services/user-service';

@Component({
  imports: [],
  selector: 'app-book-list-entry',
  styleUrl: './book-list-entry.css',
  templateUrl: './book-list-entry.html',
})
export class BookListEntry {
  readonly book = input.required<Book>();
  readonly userService = inject(UserService)

  protected readonly isLoadingList = signal(false);

  removeFromCollection() {
    this.isLoadingList.set(true);

    this.userService.deleteFromCollection(this.book().id).pipe(
      finalize(() => this.isLoadingList.set(false))
    ).subscribe({
      error: (err) => console.error('Book Removal failed', err),
    })
  }
}
