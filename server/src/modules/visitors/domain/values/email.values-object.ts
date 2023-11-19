import { HttpResponse } from '../../../../infrastructure/http/responses/http.response';

export class Email {
  readonly value: string;

  private constructor(email) {
    this.value = email;
  }

  public static validate(email: string): Email {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !regex.test(email)) {
      throw HttpResponse.BAD_REQUEST('invalid mail');
    }

    return new Email(email);
  }

  public getName() {
    const [name, provider] = this.value.split('@');

    return name;
  }
}
