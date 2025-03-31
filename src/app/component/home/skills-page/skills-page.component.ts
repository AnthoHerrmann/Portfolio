import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../model/skill.model';
import { SkillsService } from '../../../service/skills.service';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss']
})
export class SkillsPageComponent implements OnInit, AfterViewInit {
  technicalSkills?: Skill[];
  softSkills?: Skill[];

  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.technicalSkills = this.skillsService.getTechnicalSkills();
    this.softSkills = this.skillsService.getSoftSkills();
  }

  ngAfterViewInit() {
    this.initIntersectionObserver();
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

    const elements = document.querySelectorAll('.skill-section h1, .skill-section h2, .skill-card');
    elements.forEach(element => observer.observe(element));
  }
}