import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit, AfterViewInit {
  projects = [
    {
      title: 'Portfolio Personnel',
      description: 'Site portfolio développé avec Angular, présentant mes compétences et réalisations.',
      technologies: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
      imageUrl: 'assets/images/portfolio_accueil.png'
    },
    {
      title: 'Application Web de Suivi des Stages de l\'IUT de Bayonne',
      description: 'Application web permettant aux étudiants, aux enseignants et au responsable de stages de l\'IUT de Bayonne d\'effectuer un suivi des stages.',
      technologies: ['Angular', 'Laravel', 'TypeScript', 'PHP', 'HTML', 'CSS'],
      imageUrl: 'assets/images/suivi-stage_iut-bayonne.png'
    },
    {
      title: 'Flux SQL d\'import de photos commerciales de véhicule',
      description: 'Flux SQL gérant l\'intégration automatique des photos commerciales des véhicules destinés à la vente pour l\'un des clients de l\'entreprise DEKRA.',
      technologies: ['SQL', 'HTML', 'CSS'],
      imageUrl: 'assets/images/diagramme-flux.png'
    }
  ];
  currentIndex = 0;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initIntersectionObserver();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }

  goToSlide(index: number) {
    if (index !== this.currentIndex) {
      this.currentIndex = index;
    }
  }

  onCardClick(index: number) {
    this.goToSlide(index);
  }

  getCardStyle(index: number): any {
    const diff = index - this.currentIndex;
    const baseStyle = {
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      left: '50%',
      top: '50%'
    };
    
    if (diff === 0) {
      return {
        ...baseStyle,
        transform: 'translate(-50%, -50%)',
        opacity: 1,
        zIndex: 3,
        visibility: 'visible',
      };
    }
    
    if (diff === -1 || (diff === this.projects.length - 1)) {
      return {
        ...baseStyle,
        transform: 'translate(-150%, -65%) scale(0.85)',
        opacity: 0.7,
        zIndex: 1,
        visibility: 'visible',
      };
    }
    
    if (diff === 1 || diff === -(this.projects.length - 1)) {
      return {
        ...baseStyle,
        transform: 'translate(50%, -65%) scale(0.85)',
        opacity: 0.7,
        zIndex: 1,
        visibility: 'visible',
      };
    }
    
    return {
      ...baseStyle,
      transform: 'translate(-50%, -50%) scale(0.7)',
      opacity: 0,
      visibility: 'hidden',
    };
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
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.projects-section h1, .project-card');
    elements.forEach(element => observer.observe(element));
  }
}