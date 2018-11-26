import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    console.log(localStorage);
    this.authService
      .signInUser(form.value.email, form.value.password)
      .then(signinResult => {
        if (signinResult) {
          alert('Success!');
this.router.navigate(['/recipes']);
        } else {
          alert('Failed!');
        }
      })
      .catch(error => console.log(error));

    console.log(localStorage);
  }
}
