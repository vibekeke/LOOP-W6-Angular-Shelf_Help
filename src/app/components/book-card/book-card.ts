import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../services/book-service';
import { UserService } from '../../services/user-service';
import { finalize } from 'rxjs';

@Component({
  imports: [RouterLink],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {

  readonly userService = inject(UserService);
  readonly book = input.required<Book>();

  readonly inReadingList = computed(() => 
    this.userService.user()?.collection.includes(this.book().id) ?? false);

  protected readonly isLoadingList = signal(false); //Why does this need to be a signal?


  addToReadingList() {
    this.isLoadingList.set(true);

    this.userService.addToCollection(this.book().id).pipe(
      finalize(() => this.isLoadingList.set(false))
    ).subscribe({
      error: (err) => console.error('List operation failed', err),
    })
  }

  removeFromReadingList() {
    this.isLoadingList.set(true);

    this.userService.deleteFromCollection(this.book().id).pipe(
      finalize(() => this.isLoadingList.set(false))
    ).subscribe({
      error: (err) => console.error('List operation failed', err),
    })
  }
}
