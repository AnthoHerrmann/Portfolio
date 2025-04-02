import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../model/skill.model';
import { SkillsService } from '../../../service/skills.service';
import { AnimationService } from '../../../service/animation.service';

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

  constructor(
    private skillsService: SkillsService,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.technicalSkills = this.skillsService.getTechnicalSkills();
    this.softSkills = this.skillsService.getSoftSkills();
  }

  ngAfterViewInit() {
    this.animationService.initIntersectionObserver([
      '.skill-section h1',
      '.skill-section h2', 
      '.skill-card'
    ]);
  }
}