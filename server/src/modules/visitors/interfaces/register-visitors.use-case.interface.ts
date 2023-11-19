interface input {
  email: string;
}

interface output {
  success: boolean;
  accessLevel: string[];
}

export namespace RegisterVisitors {
  export type Input = input;
  export type Output = output;
}
