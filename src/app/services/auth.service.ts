import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(localStorage.getItem('token'));

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token.set(null);
    localStorage.removeItem('token');
  }

  getToken() {
    return this.token();
  }

//   Si el token es null, el usuario no está autenticado
  isAuthenticated = computed(() => !!this.token());
}
