import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gestionate2025tailwind');

  isDarkMode = signal<boolean>(false);

  ngOnInit() {
    this.configDarkMode();
    this.updateDarkModeClass();
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, // solo se anima una vez
    });
  }


  configDarkMode() {
    // Detecta si el sistema está en modo oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Si el usuario ya eligió un modo antes, respetalo
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      this.isDarkMode.set(prefersDark);
    }
  }

  updateDarkModeClass(): void {
    const html = document.documentElement;
    if (this.isDarkMode()) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
