import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validatorErrorMessage',
  standalone: true,
})
export class ValidatorErrorMessagePipe implements PipeTransform {
  transform(errors: any): string {
    let message = '';

    if (!errors) return message;

    const error = Object.keys(errors)[0];

    switch (error) {
      case 'required':
        message = `El campo es requerido`;
        break;
      case 'minlength':
        const requiredLength = errors[error].requiredLength;
        message = `Mínimo ${
          requiredLength === 1 ? '1 caracter' : requiredLength + ' caracteres'
        } `;
        break;

      case 'maxlength':
        const requiredMaxLength = errors[error].requiredLength;
        message = `Máximo ${
          requiredMaxLength === 1
            ? '1 caracter'
            : requiredMaxLength + ' caracteres'
        }`;
        break;
      case 'email':
        message = `Email no válido`;
        break;
      case 'pattern':
        message = `Caracteres o formato no válido`;
        break;
      case 'min':
        const min = errors[error].min;
        message = `Debe ser mayor o igual a ${min}`;
        break;
      case 'max':
        const max = errors[error].max;
        message = `Debe ser menor o igual a ${max}`;
        break;
      case 'unique':
        message = `El campo ya existe`;
        break;
      case 'match':
        message = `El campo no coincide`;
        break;
      case 'incorrect':
        message = `El valor no se ha encontrado`;
        break;
      case 'confirmedValidator':
        message = `Las contraseñas no coinciden`;
        break;
      default:
        message = `Error desconocido`;
        break;
    }
    return message;
  }
}
