import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/shared/account.service';
import {User} from "../../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  registerError = false;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: AccountService,
      private router: Router

  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
  });
  }


  get f() { return this.form.controls; }

    /**
     * Sofern alle Angaben korrekt (Überprüfung durch form.valid), führe Registrierung durch
     *
     */
  onSubmit() {
      this.submitted = true;

      if (this.form.invalid) {
        return;
      }
     

      this.loading = true;
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: (event : User) => {
                  alert(`Der Benutzer ${event.username} wurde registriert.`);
                  this.loading = false;
                  this.router.navigateByUrl('login');
                  this.registerError = false;
              },
              error: error => {
                  //alert("Error" + error);
                  this.loading = false;
                  this.registerError = true;
              }
          });
  }
}


