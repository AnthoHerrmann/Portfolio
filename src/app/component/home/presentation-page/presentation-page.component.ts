import { Component } from '@angular/core';

@Component({
  selector: 'app-presentation-page',
  standalone: true,
  imports: [],
  templateUrl: './presentation-page.component.html',
  styleUrl: './presentation-page.component.scss'
})
export class PresentationPageComponent {
  downloadCV() {
    const link = document.createElement('a');
    link.href = '/Anthony_Herrmann_CV_Alternance.pdf';
    link.download = 'Anthony_Herrmann_CV_Alternance.pdf';
    link.click();
  }
}
