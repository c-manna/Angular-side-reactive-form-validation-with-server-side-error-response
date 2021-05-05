import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  form: FormGroup;
  constructor(private _fb: FormBuilder, private _httpService: HttpService) {
    this.form = this._fb.group({
      registerForm: this._fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }),
    });
  }

  get registerFrmCtrl() {
    return (<FormGroup>this.form.get('registerForm')).controls;
  }

  get registerForm() {
    return this.form.get('registerForm');
  }

  submitRegisterFrm() {
    this._httpService
      .register(
        'http://localhost:4200/api/users/register',
        this.registerForm.value
      )
      .subscribe(
        (result) => {},
        (err) => {
          if (err.status == 400) {
            console.log(err);
            const validationError = err.error.errors;
            Object.keys(validationError).forEach((index) => {
              const formControl = this.registerForm.get(
                validationError[index].param
              );
              if (formControl) {
                formControl.setErrors({
                  serverError: validationError[index].msg,
                });
              }
            });
          }
        }
      );
  }
}
