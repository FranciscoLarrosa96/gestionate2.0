import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { concatMap, Subject, takeUntil } from 'rxjs';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { UserService } from '../../services/user.service';
import { TokenDecode } from '../../interfaces/token.interface';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialDesignModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnDestroy, OnInit {
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  loginForm!: UntypedFormGroup;
  errorType = signal<string>('');
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _loginService = inject(LoginService);
  private _authService = inject(AuthService);
  private _userSvc = inject(UserService);

  constructor() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  /**
   * Detecta tipo de error
   */
  errorTypeChange = effect(() => {
    if (this._loginService.errorType().includes('Las credenciales ingresadas no existen en LDAP')) {
      this.errorType.set('invalidCredentials');
    }
  });


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
        takeUntil(this._unsubscribeAll),
        concatMap((responseLogin) => {
          if (responseLogin === null) {
            this.errorType.set('adError');
            this.isLoading.set(false);
            return [];
          }
          // Si la respuesta es válida, se guarda el token
          this._authService.setToken(responseLogin.token);
          // Luego se obtiene el perfil del usuario
          let decodedToken: TokenDecode = this.decodeJwtToken(responseLogin.token.split('Bearer ')[1]);
          return this._userSvc.getDataProfile(decodedToken.payload.legajo, responseLogin.token);
        })
      )
      .subscribe({
        next: (response) => {

          this._authService.setToken(response.token);
          this._router.navigate(['/dashboard']);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Login failed =>:', error.error);
          this.errorType.set('invalidCredentials');
          this.isLoading.set(false);
        }
      })
  }

  /**
   * Decodes a JWT token.
   * @param token 
   * @returns 
   */
  decodeJwtToken(token: string): TokenDecode {
    const [header, payload, signature] = token.split('.');

    const decodedHeader = JSON.parse(this.base64UrlDecode(header));
    const decodedPayload = JSON.parse(this.base64UrlDecode(payload));

    return { header: decodedHeader, payload: decodedPayload, signature };
  }

  /**
   * Decodes a base64 URL string.
   * @param base64Url 
   * @returns 
   */
  base64UrlDecode(base64Url: string): string {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64);
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
