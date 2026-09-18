import { Component } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  imports: [BookCard],
  selector: 'app-book-catalogue',
  styleUrl: './book-catalogue.css',
  templateUrl: './book-catalogue.html',
})
export class BookCatalogue {}
