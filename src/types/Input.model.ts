type RegisterInput = {
  displayName: string;
  email: string;
  file: File;
  password: string;
};

type LoginInput = Pick<RegisterInput, 'email' | 'password'>;

export type { LoginInput, RegisterInput };
