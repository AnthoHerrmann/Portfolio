import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class.hoverable]="hoverable" [class.animated]="animated">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      @include card-base;
      padding: var(--spacing-unit);
      margin-bottom: var(--spacing-unit);
    }
    
    .hoverable {
      transition: transform var(--transition-speed) var(--animation-timing);
      &:hover {
        transform: translateY(-5px);
      }
    }
    
    .animated {
      @extend .fade-in-element;
    }
  `]
})
export class CardComponent {
  @Input() hoverable = false;
  @Input() animated = false;
}
