import { ValidatorErrorMessagePipe } from './validator-error-message.pipe';

describe('ValidatorErrorMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidatorErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
