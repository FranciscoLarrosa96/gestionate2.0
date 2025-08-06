import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  loginForm!: UntypedFormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  onLogin(): void {

    this.isLoading.set(true);

    // Simular proceso de login
    setTimeout(() => {
      console.log('Login successful:', this.loginForm.value);
      

      this.router.navigate(['/dashboard']);
      this.isLoading.set(false);
    }, 2000);
  }
}
