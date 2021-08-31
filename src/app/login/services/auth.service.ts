import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURL + "/api/users";
  tokenUrl: string = environment.apiURL + environment.tokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(
    private http: HttpClient,
  ) { }

  getToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  saveUser(user: User): Observable<any> {
    return this.http.post<User>(this.apiURL, user);
  }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password');
    
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }                      

    return this.http.post(this.tokenUrl, params.toString(), { headers });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getAuthenticatedUser() {
    const token = this.getToken();

    if(token) {
      const user = this.jwtHelper.decodeToken(token).user_name;
      return user;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired
    }

    return false;
  }
}

