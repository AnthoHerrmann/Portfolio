import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() threshold = 0.1;
  @Input() rootMargin = '-10% 0px';
  @Input() animationDelay = 0;

  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
    this.observer = this.createObserver();
  }

  ngOnInit() {
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private createObserver(): IntersectionObserver {
    return new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, this.animationDelay);
          this.observer.unobserve(entry.target);
        }
      },
      { threshold: this.threshold, rootMargin: this.rootMargin }
    );
  }
}
