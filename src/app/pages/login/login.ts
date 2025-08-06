import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MaterialDesignModule } from '../../shared/material-design.module';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialDesignModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnDestroy, OnInit{
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  loginForm!: UntypedFormGroup;
  errorType = signal<string>('adError');
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _loginService = inject(LoginService);
  private _authService = inject(AuthService);
  constructor() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }


  ngOnInit(): void {
    // Verifica si el usuario ya está autenticado
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/dashboard']);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  onLogin(): void {
    this.isLoading.set(true);
    this._loginService.login(this.loginForm.get('username')?.value, this.encodePassword())
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response.token);
          // Aquí puedes manejar la respuesta del login, como guardar el token o redirigir
          // this._router.navigate(['/dashboard']);
          this._authService.setToken(response.token);
          this._router.navigate(['/dashboard']);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Login failed =>:', error.error);
          // Manejar errores de login, como mostrar un mensaje al usuario
          this.isLoading.set(false);
        }
      })
  }

  /**
   *  Función para encriptar la contraseña
   * @returns 
   */
  encodePassword(): string {
    var encondePassword = btoa(this.loginForm.get('password')?.value);
    let passwordArray = encondePassword.split('');
    let posRamdom1 = Math.floor(Math.random() * passwordArray.length);
    let posRamdom2 = Math.floor(Math.random() * (passwordArray.length - 2));
    let letra1 = passwordArray[posRamdom1];
    let letra2 = passwordArray[posRamdom2];
    let encodePasswordWithToken = 'token-' + letra1 + letra2 + encondePassword;

    return encodePasswordWithToken;
  }
}
