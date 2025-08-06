import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  private router = inject(Router);

  constructor() {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.isLoading = true;
    
    // Simular proceso de login
    setTimeout(() => {
      console.log('Login attempt:', {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      });
      
      this.router.navigate(['/dashboard']);
    }, 2000);
  }
}
