import { Component, computed, inject, input, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Book } from '../../services/book-service';
import { UserService } from '../../services/user-service';

@Component({
  imports: [],
  selector: 'app-collection-button',
  styleUrl: './collection-button.css',
  templateUrl: './collection-button.html',
})
export class CollectionButton {
  readonly book = input.required<Book>();
  /** 'toggle' shows add/remove based on state; 'remove' is a remove-only action. */
  readonly variant = input<'toggle' | 'remove'>('toggle');
  private readonly userService = inject(UserService);

  protected readonly inReadingList = computed(() =>
    this.userService.isInCollection(this.book().id));
  protected readonly isLoadingList = signal(false);


  protected addToReadingList() {
    this.isLoadingList.set(true);

    this.userService.addToCollection(this.book().id).pipe(
      finalize(() => this.isLoadingList.set(false))
    ).subscribe({
      error: (err) => console.error('List operation failed', err),
    })
  }

  protected removeFromReadingList() {
    this.isLoadingList.set(true);

    this.userService.deleteFromCollection(this.book().id).pipe(
      finalize(() => this.isLoadingList.set(false))
    ).subscribe({
      error: (err) => console.error('List operation failed', err),
    })
  }
}
