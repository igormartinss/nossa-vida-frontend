import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessages: string[];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const accessToken = JSON.stringify(response);
        localStorage.setItem('access_token', accessToken);
        this.router.navigate(['/']);
      },
      (errorResponse) => {
        this.errorMessages = ['Usuário e/ou senha incorretos'];
      }
    );
  }
}
