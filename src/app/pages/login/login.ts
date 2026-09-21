import { Component } from '@angular/core';
import { LoginCard } from '../../components/login-card/login-card';

@Component({
  imports: [LoginCard],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {}
