import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HomePageComponent,
    PresentationPageComponent,
    SkillsPageComponent,
    ProjectsPageComponent,
    ContactsPageComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
