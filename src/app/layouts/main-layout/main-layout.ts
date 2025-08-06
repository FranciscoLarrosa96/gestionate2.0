import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  isSidebarOpen = signal(false);

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  logout() {
    // Aquí implementarás la lógica de logout
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeSidebar(); // Cerrar sidebar en mobile después de navegar
  }
}
