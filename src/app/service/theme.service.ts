import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme = this.darkTheme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme) this.setDarkTheme(savedTheme === 'true');
  }

  setDarkTheme(isDark: boolean) {
    this.darkTheme.next(isDark);
    localStorage.setItem('darkTheme', isDark.toString());
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
  }

  toggleTheme() {
    this.setDarkTheme(!this.darkTheme.value);
  }
}
