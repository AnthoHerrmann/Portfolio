import { Component, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../../service/animation.service';
import { createDownloadLink } from '../../../shared/utils/dom.utils';

@Component({
  selector: 'app-presentation-page',
  standalone: true,
  imports: [],
  templateUrl: './presentation-page.component.html',
  styleUrl: './presentation-page.component.scss'
})
export class PresentationPageComponent implements AfterViewInit {
  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    this.animationService.initIntersectionObserver([
      'h1', 
      '.intro-section', 
      '.cv-container', 
      '.other-section', 
      '.interest-item'
    ]);
  }

  downloadCV() {
    createDownloadLink('assets/Anthony_Herrmann_CV.pdf', 'Anthony_Herrmann_CV.pdf');
  }
}
