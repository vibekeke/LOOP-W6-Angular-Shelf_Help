import { Component, input } from '@angular/core';
import { Book } from '../../services/book-service';
import { RouterLink } from '@angular/router';
import { CollectionButton } from '../collection-button/collection-button';

@Component({
  imports: [CollectionButton, RouterLink],
  selector: 'app-book-list-entry',
  styleUrl: './book-list-entry.css',
  templateUrl: './book-list-entry.html',
})
export class BookListEntry {
  readonly book = input.required<Book>();
}
