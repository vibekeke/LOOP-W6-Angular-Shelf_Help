import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

const BOOKS_URL = "https://w5-frontend-assignment-api.onrender.com/shelf_help_books";

export interface Book {
    id: number;
    isbn: number;
    title: string;
    author: string;
    coverImg: string;
    rating: number;
    blurb: string;      
}

@Injectable({providedIn: 'root'})
export class BookService {
    private readonly http = inject(HttpClient);
    private _books = signal<Book[]>([]);

    readonly books = this._books.asReadonly();
    
    fetchBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(BOOKS_URL).pipe(
            tap(books => this._books.set(books))
        )
    }
}