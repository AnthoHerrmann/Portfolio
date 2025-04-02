import { Injectable } from '@angular/core';
import { Skill } from '../model/skill.model';

@Injectable({providedIn: 'root'})
export class SkillsService {
  getTechnicalSkills(): Skill[] {
    return [
      {name: 'Développement Frontend', items: ['Angular', 'TypeScript', 'HTML', 'CSS']},
      {name: 'Développement Backend', items: ['Laravel', 'PHP', 'API REST']},
      {name: 'DevOps', items: ['Docker', 'Intégration Continue', 'Déploiement Continu', 'Hébergement']},
      {name: 'Autres', items: ['Git', 'Gestion de projet Agile']}
    ];
  }

  getSoftSkills(): Skill[] {
    return [
      {name: 'Organisation', items: ['Autonomie', 'Rigueur', 'Persévérent', 'Gestion du temps']},
      {name: 'Collaboration', items: ['Travail en équipe', 'Communication', 'Pédagogie']},
      {name: 'Résolution de problèmes', items: ['Analyse', 'Prise de décision', 'Adaptabilité', 'Polyvalence']}
    ];
  }
}