import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { concatMap, EMPTY, forkJoin, map, Subject, takeUntil } from 'rxjs';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { UserService } from '../../services/user.service';
import { TokenDecode } from '../../interfaces/token.interface';
import { ResponseInterface } from '../../interfaces/response.interface';

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
        concatMap((res:ResponseInterface) => {
          if (!res) {
            this.errorType.set('adError');
            this.isLoading.set(false);
            return EMPTY; // Cortamos el flujo
          }

          // Guardamos token
          this._authService.setToken(res.token);
          const decoded = this.decodeJwtToken(res.token.split('Bearer ')[1]);

          // Armamos observables dependientes
          const profile$ = this._userSvc.getDataProfile(decoded.payload.legajo);
          const rolUser$ = this._userSvc.getRole(decoded.payload.legajo);

          // Ejecutamos en paralelo y devolvemos resultado combinado
          return forkJoin({ profile: profile$, rolUser: rolUser$ })
            .pipe(map(({ profile, rolUser }) => ({ responseLogin: res, profile, rolUser })));
        })
      )
      .subscribe({
        next: ({ responseLogin, profile, rolUser }) => {
          this.checkAndSetRole(rolUser, responseLogin);
          this._userSvc.setProfile(profile);
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
   * Checks and sets the user role.
   * @param rolUser 
   * @param responseLogin 
   */
  checkAndSetRole(rolUser: string[], responseLogin: ResponseInterface): void {
    // Si no incluye comun significa que es Lider
    if (!rolUser.includes('comun') && (!responseLogin.rol.includes('ROL_RRHH') || !responseLogin.rol.includes('ADMIN-G'))) {
      this._userSvc.setRoles(['lider']);
    } else if (rolUser.includes('comun') && (!responseLogin.rol.includes('ROL_RRHH') && !responseLogin.rol.includes('ADMIN-G'))) {
      this._userSvc.setRoles(['comun']);
    } else if (responseLogin.rol.includes('ROL_RRHH') && !responseLogin.rol.includes('ADMIN-G')) {
      this._userSvc.setRoles(['rrhh']);
    } else {
      this._userSvc.setRoles(['admin']);
    }
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
