import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordStrengthValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasLetters && hasNumbers && hasSymbols;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one letter, one number, and one symbol.';
  }
}
