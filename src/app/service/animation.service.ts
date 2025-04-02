import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AnimationService {
  private readonly defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-10% 0px',
    threshold: 0.1
  };

  initIntersectionObserver(
    selectors: string[], 
    delay: number = 150,
    options: IntersectionObserverInit = this.defaultOptions
  ): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add('visible');
          }, index * delay);
        }
      });
    }, options);

    document.querySelectorAll(selectors.join(', '))
      .forEach(element => observer.observe(element));
  }
}
