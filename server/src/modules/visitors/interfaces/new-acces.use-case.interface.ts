interface input {
  email: string;
}

interface output {
  accessToken: string;
  expiresIn: number;
  rules: string[];
}

export namespace TNewAccess {
  export type Input = input;
  export type Output = output;
}
