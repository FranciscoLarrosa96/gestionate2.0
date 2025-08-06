import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  isSidebarOpen = signal(false);
  private _authService = inject(AuthService);
  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  logout() {
    // Aquí implementarás la lógica de logout
    this._authService.clearToken();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeSidebar(); // Cerrar sidebar en mobile después de navegar
  }
}
