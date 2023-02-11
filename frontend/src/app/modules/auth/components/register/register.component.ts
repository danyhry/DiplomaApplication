import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "../../../../services/auth.service";
import {MustMatch} from "../../validators/must-match.validator";
import {Base} from "../../../../services/destroy.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends Base implements OnInit {

  _showPassword!: boolean;

  _showErrors!: boolean;

  _registerForm: FormGroup = this.fb.group({
    // firstName: ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
    // lastName: ['', [Validators.minLength(2), Validators.maxLength(20), Validators.required]],
    // email: ['', [Validators.email, Validators.maxLength(30), Validators.required]],
    // password: ['', [Validators.minLength(8), Validators.required]],
    // confirmPassword: ['', [Validators.required]]
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this._registerForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._showErrors = false);
  }

  _onSubmit(): void {
    console.log(this._registerForm);
    if (this._registerForm.valid) {
      const data = {
        firstName: this._registerForm.value.firstName,
        lastName: this._registerForm.value.lastName,
        email: this._registerForm.value.email,
        password: this._registerForm.value.password,
        confirmPassword: this._registerForm.value.confirmPassword,
      };
      console.log(data);
      this.authService.register(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() =>
          this.toastr.success(`User was successfully registered.`, '', {
            timeOut: 4000,
          })
        );
      this.router.navigateByUrl('/login');
    } else {
      this._showErrors = true;
      console.log('not valid');
    }
  }

}