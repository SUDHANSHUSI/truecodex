import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serverUrl = 'http://localhost/dev/blogger/';
  errorData!: {};

  constructor(private http: HttpClient) {}

  redirectUrl!: string;

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.serverUrl}api/auth/login`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  // getAuthorizationToken(): string {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   return currentUser.token;
  // }
  getAuthorizationToken(): string | null {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const parsedUser = JSON.parse(currentUser);
    return parsedUser.token;
  }
  return null;
}

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.',
    };
    return throwError(this.errorData);
  }
}
