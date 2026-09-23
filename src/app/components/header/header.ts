import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly userService = inject(UserService);
  private readonly router = inject(Router);

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
