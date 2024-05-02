import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorErrorMessagePipe } from '../../pipes/validator-error-message.pipe';

@Component({
  selector: 'validator-error-message',
  standalone: true,
  imports: [ValidatorErrorMessagePipe, CommonModule],
  templateUrl: './validator-error-message.component.html',
  styleUrl: './validator-error-message.component.scss',
})
export class ValidatorErrorMessageComponent {
  @Input({ required: true }) controlName!: AbstractControl;
}
