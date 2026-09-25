import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  imports: [FormsModule],
  selector: 'app-login-card',
  styleUrl: './login-card.css',
  templateUrl: './login-card.html',
})
export class LoginCard {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  protected readonly username = signal('');
  protected readonly isLoading = signal(false);

  onSubmit() {
    const name = this.username().trim();
    if (!name || this.isLoading()) return;

    this.isLoading.set(true);

    this.userService.login(name).pipe(
      finalize(()=> this.isLoading.set(false))
    ).subscribe({
      next: () => this.router.navigateByUrl('/book-catalogue'),
      error: (err) => console.error('Login failed', err),
    });
  }
}
