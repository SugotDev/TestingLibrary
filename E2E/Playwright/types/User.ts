export interface LoginOptions {
  username: string;
  password: string;
  assertSuccess?: boolean;
}

export interface User {
  type: string;
  username: string;
  password: string;
}
