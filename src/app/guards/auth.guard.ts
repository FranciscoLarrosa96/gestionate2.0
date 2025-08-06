import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  // Verifica si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    // Si no está autenticado, redirige a la página de login
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  } else {
    router.navigate(['/dashboard']);
    // Si está autenticado, permite el acceso a la ruta
    return true;
  }
};
