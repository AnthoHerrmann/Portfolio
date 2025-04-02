export const VALIDATION_MESSAGES = {
  required: (field: string) => `Le ${field} est requis`,
  minLength: (field: string, length: number) => 
    `Le ${field} doit contenir au moins ${length} caractères`,
  maxLength: (field: string, length: number) => 
    `Le ${field} ne peut pas dépasser ${length} caractères`,
  email: 'Veuillez entrer une adresse email valide'
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
