import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ValidatorErrorMessageComponent } from '../../shared/components/validator-error-message/validator-error-message.component';
import { ButtonModule } from 'primeng/button';
import { FirebaseService } from '../../core/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ValidatorErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form: FormGroup;
  isLoading = false;

  constructor(
    private firebaseAuthService: FirebaseService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/']);
    }
  }
  onSubmit() {
    this.isLoading = true;
    console.log(this.form.value);
  }

  loginWithGoogle() {
    this.firebaseAuthService
      .loginWithGoogle()
      .then((res) => {
        if (res === null) return;
      })
      .finally(() => {
        window.location.reload();
      });
  }
}
