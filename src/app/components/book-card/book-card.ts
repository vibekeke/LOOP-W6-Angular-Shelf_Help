import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../services/book-service';
import { UserService } from '../../services/user-service';
import { CollectionButton } from '../collection-button/collection-button';

@Component({
  imports: [RouterLink, CollectionButton],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {

  private readonly userService = inject(UserService);
  readonly book = input.required<Book>();

  protected readonly inReadingList = computed(() =>
    this.userService.isInCollection(this.book().id));

  protected readonly isLoggedIn = computed(() => 
    this.userService.isLoggedIn()
  );
}
