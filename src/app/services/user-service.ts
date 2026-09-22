import { computed, Injectable, signal } from "@angular/core";

export interface User {
    username: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly _user = signal<User | null>(null);
    
    readonly user = this._user.asReadonly();
    readonly isLoggedIn = computed(() => this._user() !== null);

    login(username: string) {
        this._user.set({ username });
    }

    logout() {this._user.set(null);}
}
