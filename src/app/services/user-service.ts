import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable, of, switchMap, tap, throwError, } from "rxjs";

const USER_URL = "https://w5-frontend-assignment-api.onrender.com/shelf_help_users";


export interface User {
    id: number;
    username: string;
    collection: number[]; //might change to Book[] later, but probably not.
}

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly _user = signal<User | null>(this.getStoredUser());
    private readonly http = inject(HttpClient);
    
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
                const existing = users.find(u => u.username.toLowerCase() === username.toLowerCase());
                                //^input users:User[], output existing = User | underfined
                return existing 
                    ? of(existing)      //of(User) gives Observable<User>
                    : this.http.post<User>(USER_URL, {username, collection: []});
            }),
            tap(user => {
                this._user.set(user)
                localStorage.setItem('user', JSON.stringify(user))
            }),
        );
    }
    
    logout() {
        localStorage.removeItem('user');
        this._user.set(null);
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
