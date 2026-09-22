import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../services/book-service';

@Component({
  imports: [RouterLink],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {
  readonly book = input.required<Book>(); 

  //TODO: Ask userService if book exists in the collection :))
}
