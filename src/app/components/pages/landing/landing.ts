import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { BookService } from '../../../services/book-service';
import { finalize } from 'rxjs';
import { BookCard } from '../../book-card/book-card';
import { RouterLink } from '@angular/router';

@Component({
  imports: [BookCard, RouterLink],
  selector: 'app-landing',
  styleUrl: './landing.css',
  templateUrl: './landing.html',
})
export class Landing {
  private readonly userService = inject(UserService);
  private readonly bookService = inject(BookService);

  protected readonly isLoggedIn = computed(() => 
    this.userService.isLoggedIn()
  );

  protected readonly errorMsg = signal<string | null> (null);
  protected readonly isLoading = signal(false);

  readonly books = this.bookService.books

  readonly randomBooks = computed(() => {
    const copy = this.books();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 3);
  });

  ngOnInit(): void {
    this.isLoading.set(true)
    this.bookService.fetchBooks().pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe(
      {
        error: (err) => {
        console.error('BookCatalogue: Fetch failed', err)
        this.errorMsg.set("Could not load books. Try again later");
      }}
    ); 
  }
}
