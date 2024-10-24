import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode!: boolean;

  constructor() {
    this.isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  switchTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  updateTheme(): void {
    const domToRemove = document.getElementById(
      this.isDarkMode ? 'light-theme' : 'dark-theme'
    );
    if (domToRemove) {
      domToRemove.remove();
    }
    const href = this.isDarkMode
      ? '/assets/themes/ng-zorro-antd.dark.min.css'
      : '/assets/themes/ng-zorro-antd.min.css';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = this.isDarkMode ? 'light-theme' : 'dark-theme';
    style.href = href;
    head.appendChild(style);
  }
}
