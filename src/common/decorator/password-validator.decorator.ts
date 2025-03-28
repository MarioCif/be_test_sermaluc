import { registerDecorator, ValidationOptions } from 'class-validator';
import { PasswordStrengthValidator } from '../validator/password.validator';

export function IsPasswordStrength(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      constraints: [],
      validator: PasswordStrengthValidator,
    });
  };
}
