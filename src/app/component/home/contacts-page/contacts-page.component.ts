import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent implements OnInit {
  formData: FormData = {
    name: '',
    email: '',
    message: ''
  };

  formErrors: FormErrors = {
    name: '',
    email: '',
    message: ''
  };

  validationMessages = {
    name: {
      required: 'Le nom est requis',
      minlength: 'Le nom doit contenir au moins 2 caractères',
      maxlength: 'Le nom ne peut pas dépasser 50 caractères'
    },
    email: {
      required: 'L\'email est requis',
      email: 'Veuillez entrer une adresse email valide'
    },
    message: {
      required: 'Le message est requis',
      minlength: 'Le message doit contenir au moins 10 caractères'
    }
  };

  socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/anthony-herrmann-a3ba55263/', name: 'LinkedIn' },
    { icon: 'fab fa-github', url: 'https://github.com/AnthoHerrmann', name: 'GitHub' }
  ];

  isLoading = false;
  emailSent = false;
  errorMessage = '';

  touchedFields: { [key: string]: boolean } = {
    name: false,
    email: false,
    message: false
  };

  ngOnInit() {
    this.initIntersectionObserver();
  }

  validateField(field: string, checkTouched: boolean = true): boolean {
    let isValid = true;
    this.formErrors[field as keyof FormErrors] = '';

    const value = this.formData[field as keyof FormData];
    const inputElement = document.getElementById(field) as HTMLInputElement;
    const isTouched = this.touchedFields[field];

    // Ne pas montrer d'erreurs si le champ n'a pas été touché et si checkTouched est true
    if (checkTouched && !isTouched) {
      inputElement.classList.remove('valid', 'invalid');
      return true;
    }

    inputElement.classList.remove('valid', 'invalid');

    if (!value) {
      if (!checkTouched || isTouched) {
        this.formErrors[field as keyof FormErrors] = 
          this.validationMessages[field as keyof typeof this.validationMessages].required;
        inputElement.classList.add('invalid');
      }
      return false;
    }

    // Validation spécifique pour chaque champ
    switch (field) {
      case 'name':
        if (value.length < 2) {
          isValid = false;
          if (!checkTouched || isTouched) {
            this.formErrors.name = this.validationMessages.name.minlength;
          }
        } else if (value.length > 50) {
          isValid = false;
          if (!checkTouched || isTouched) {
            this.formErrors.name = this.validationMessages.name.maxlength;
          }
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          if (!checkTouched || isTouched) {
            this.formErrors.email = this.validationMessages.email.email;
          }
        }
        break;
      case 'message':
        if (value.length < 10) {
          isValid = false;
          if (!checkTouched || isTouched) {
            this.formErrors.message = this.validationMessages.message.minlength;
          }
        }
        break;
    }

    if (!checkTouched || isTouched) {
      if (isValid) {
        inputElement.classList.add('valid');
      } else {
        inputElement.classList.add('invalid');
      }
    }

    return isValid;
  }

  async onSubmit() {
    // Marquer tous les champs comme touchés
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field] = true;
    });

    const isNameValid = this.validateField('name', false);
    const isEmailValid = this.validateField('email', false);
    const isMessageValid = this.validateField('message', false);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await emailjs.send(
        'service_cynqxip', // Remplacer par votre Service ID
        'template_zc41k4d', // Remplacer par votre Template ID
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          message: this.formData.message,
          to_name: 'Anthony HERRMANN',
          reply_to: this.formData.email,
        },
        '5WzFmdoSgEXcjMNje' // Remplacer par votre Public Key
      );

      if (response.status === 200) {
        this.emailSent = true;
        this.formData = { name: '', email: '', message: '' };
      }
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue lors de l\'envoi du message';
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onBlur(fieldName: string): void {
    this.touchedFields[fieldName] = true;
    this.validateField(fieldName);
  }

  onInput(fieldName: string): void {
    if (this.touchedFields[fieldName]) {
      this.validateField(fieldName);
    }
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
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.contacts-page h1, .contact-form, .social-links');
    elements.forEach(element => observer.observe(element));
  }
}
