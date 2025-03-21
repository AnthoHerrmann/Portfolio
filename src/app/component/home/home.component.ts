import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { HomePageComponent } from './home-page/home-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HomePageComponent, PresentationPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
