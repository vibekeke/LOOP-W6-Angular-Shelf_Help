import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, EMPTY, Observable, of, switchMap, tap, throwError, } from "rxjs";

const USER_URL = "https://w5-frontend-assignment-api.onrender.com/shelf_help_users";


export interface User {
    id: number;
    username: string;
    collection: number[]; //might change to Book[] later, but probably not.
}

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly _user = signal<User | null>(this.getStoredUser());

    readonly isLoggedIn = computed(() => this._user() !== null);
    readonly user = this._user.asReadonly();

    login(username: string) : Observable<User> {
        const trimmed = username.trim();
        if (!trimmed) {
            return throwError(() => new Error('Username cannot be empty.'));
        }

        if (trimmed.includes(' ')) {
            return throwError(() => new Error('Username cannot contain spaces.'));
        }

        return this.http.get<User[]>(USER_URL).pipe(
            switchMap(users => {
                const existing = users.find(u => u.username.toLowerCase() === trimmed.toLowerCase());
                                //^input users:User[], output existing = User | underfined
                return existing 
                    ? of(existing)      //of(User) gives Observable<User>
                    : this.createUser(trimmed, [])
            }),
            tap( user => this.setUser(user))
        );
    }
    
    logout() {
        localStorage.removeItem('user');
        this._user.set(null);
    }

    addToCollection(bookId: number) : Observable<User> {
        const currentUser = this._user();
        if (!currentUser) {
            return throwError(() => new Error('Not logged in'))
        }

        if (currentUser.collection.includes(bookId)) {
            return EMPTY;
        }

        const updated = [...currentUser.collection, bookId]
        
        return this.saveCollection(currentUser, updated);
    }

    deleteFromCollection(bookId: number) : Observable<User> {
        const currentUser = this._user();
        if (!currentUser) {
            return throwError(() => new Error('Not logged in'))
        }

        if (!currentUser.collection.includes(bookId)) {
            return EMPTY;
        }

        const updated = currentUser.collection.filter(item => item !== bookId)
        return this.saveCollection(currentUser, updated)
    }

    private saveCollection(user: User, collection: number[]) : Observable<User> {
        return this.http.patch<User>(`${USER_URL}/${user.id}`, {collection}).pipe(
            //If user no longer exists in database (because Render killed the server) create new user.
            catchError((err: HttpErrorResponse) =>
                err.status === 404
                    ? this.createUser(user.username, collection)
                    : throwError(() => err)
        ),    
            tap( user => this.setUser(user))
        );
    }

    private createUser(username:string, collection: number[]) : Observable<User> {
        return this.http.post<User>(USER_URL, {username, collection});
    }

    // --- HELPERS ----
    private setUser(user: User) {
        this._user.set(user)
        localStorage.setItem('user', JSON.stringify(user))

    }

    //LOCALSTORAGE HELPERS
    private getStoredUser() : User | null {
        try {
            const data = localStorage.getItem('user')
            return data? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }
}
