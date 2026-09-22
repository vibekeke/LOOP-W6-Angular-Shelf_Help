import { Component, inject, OnInit, signal } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { BookService } from '../../services/book-service';
import { finalize } from 'rxjs';

@Component({
  imports: [BookCard],
  selector: 'app-book-catalogue',
  styleUrl: './book-catalogue.css',
  templateUrl: './book-catalogue.html',
})
export class BookCatalogue implements OnInit {
  private readonly bookService = inject(BookService);
  readonly books = this.bookService.books;
  
  protected readonly errorMsg = signal<string | null> (null);
  protected readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true)
    this.bookService.fetchBooks().pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe(
      {error: (err) => {
        console.error('BookCatalogue: Fetch failed', err)
        this.errorMsg.set("Could not load books. Try again later");
      }}
    ); 
  }
}
