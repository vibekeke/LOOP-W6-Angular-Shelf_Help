import { Component, inject, input, signal } from '@angular/core';
import { Book, BookService } from '../../../services/book-service';
import { finalize } from 'rxjs';
import { HoverZoomDirective } from '../../../directives/hover-zoom.directive';
import { RouterLink } from '@angular/router';
import { CollectionButton } from '../../collection-button/collection-button';
import { UserService } from '../../../services/user-service';

@Component({
  imports: [HoverZoomDirective, RouterLink, CollectionButton],
  selector: 'app-book-details',
  styleUrl: './book-details.css',
  templateUrl: './book-details.html',
})
export class BookDetails {
  readonly id = input.required<string>();
  private readonly bookService = inject(BookService);
  readonly userService = inject(UserService);

  protected readonly errorMsg = signal<string | null> (null);
  protected readonly isLoading = signal(false);

  protected book = signal<Book | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true)

    this.bookService.getBook(this.id()).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (book) => this.book.set(book),
      error: (err) => {
        console.error('BookDetails: Fetch failed,', err)
        this.errorMsg.set('Could not load your book :(')
      }
    });
  }
}
