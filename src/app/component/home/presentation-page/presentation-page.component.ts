import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-presentation-page',
  standalone: true,
  imports: [],
  templateUrl: './presentation-page.component.html',
  styleUrl: './presentation-page.component.scss'
})
export class PresentationPageComponent implements OnInit, AfterViewInit {

  ngOnInit() {}

  ngAfterViewInit() {
    this.initIntersectionObserver();
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/Anthony_Herrmann_CV.pdf';
    link.download = 'Anthony_Herrmann_CV.pdf';
    link.click();
  }

  private initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add('visible');
          }, index * 150); // Augmenté à 150ms
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('h1, .intro-section, .cv-container, .other-section, .interest-item');
    elements.forEach(element => observer.observe(element));
  }
}
