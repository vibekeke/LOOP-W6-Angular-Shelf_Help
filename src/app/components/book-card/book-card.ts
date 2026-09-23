import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../services/book-service';
import { UserService } from '../../services/user-service';

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
    //TODO: Ask userService if book exists in the collection :))


  addToReadingList() {
    //this.inReadingList = true;
  }

  removeFromReadingList() {
    //this.inReadingList = false;
  }
}
