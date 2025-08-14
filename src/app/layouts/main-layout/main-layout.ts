import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HasRoleDirective } from '../../hasRole.directive';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HasRoleDirective],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  isSidebarOpen = signal(false);
  userSvc = inject(UserService);
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
    this.userSvc.clearProfile();
    this.userSvc.clearRoles();
    this.router.navigate(['/login']);
  }

}
