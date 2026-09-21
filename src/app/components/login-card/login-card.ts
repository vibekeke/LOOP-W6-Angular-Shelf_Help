import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login-card',
  styleUrl: './login-card.css',
  templateUrl: './login-card.html',
})
export class LoginCard {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected readonly username = signal('');

  onSubmit() {
    const name = this.username().trim();
    if (!name) return;

    //TODO: Backend stuff

    this.auth.login(name);
    this.router.navigateByUrl('/');
  }
}
