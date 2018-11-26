import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('refForm')
  signupForm: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .signUpUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(signupResult => {
        if (signupResult) {
          alert('Success!');
          this.router.navigate(['/signin']);
        } else {
          alert('Failed!');
        }
      })
      .catch(error => console.log(error));
  }
}
