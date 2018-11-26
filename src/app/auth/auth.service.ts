import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registeredUsers = [];

  constructor() {
    const stockUsername: String = 'user1';
    const stockPassword: String = '123';
    this.registeredUsers.push({ stockUsername, stockPassword });
  }

  signUpUser(username: String, password: String) {
    this.registeredUsers.push({ username, password });
    console.log(this.registeredUsers);
    return new Promise<boolean>((resolve, error) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }

  signInUser(username: String, password: String): Promise<string> {
    return new Promise<string>((resolve, error) => {
      setTimeout(() => {
        const userRegistered = this.registeredUsers.find(
          r => r.username === username && r.password === password
        );
        if (userRegistered) {
          console.log('local set!');
          localStorage.setItem('token_key', 'this is your precious token!');
          resolve('this is your precious token!');
        } else {
          error('invalid credientals');
        }
      }, 1000);
    });
  }

  signOut() {
    window.localStorage.clear();
    localStorage.removeItem('token_key');
    console.log('sign-out executed.');
  }

  getToken() {
    return localStorage.getItem('token_key');
  }

  isAuthenticated() {
    if (localStorage.getItem('token_key')) {
      return true;
    } else {
      return false;
    }
  }
}
