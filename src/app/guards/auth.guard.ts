import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

// export const AuthGuard: CanActivateFn = (route, state) => {

//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Verifica si el usuario está autenticado
//   if (!authService.isAuthenticated()) {
//     // Si no está autenticado, redirige a la página de login
//     router.navigate(['/login']);
//     return false;
//   }

//   // Si está autenticado, permite el acceso a la ruta
//   return true;
// };

export const AuthGuard = (roles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userService = inject(UserService);
    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    return roles.some(role => userService.getRoles().includes(role));
  }
}