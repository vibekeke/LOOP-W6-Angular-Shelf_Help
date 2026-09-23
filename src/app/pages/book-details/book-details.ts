import { Component, computed, inject, input, signal } from '@angular/core';
import { Book, BookService } from '../../services/book-service';
import { finalize } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-book-details',
  styleUrl: './book-details.css',
  templateUrl: './book-details.html',
})
export class BookDetails {
  readonly id = input.required<string>();
  private readonly bookService = inject(BookService);
  
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
