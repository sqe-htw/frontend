import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../shared/account.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {UserAuth} from "../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  loginError = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    console.log("__debug: Component 'login' has loaded")
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    console.log("__debug: onSubmit login component");

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log("Value:" +this.form.value);
    this.loading = true;

    this.accountService.login(this.form.value)
        .pipe(first())
        .subscribe({
          next: (event:UserAuth) => {
            alert(`Der Benutzer ${event.user.username} wurde eingeloggt.`);
            this.loading = false;
            this.router.navigateByUrl('');
            this.loginError = false;
          },
          error: error => {
            //alert("Error"+ error)
            this.loading = false;
            this.loginError = true;
          }
        })

  }


}
