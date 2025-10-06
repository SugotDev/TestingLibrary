import { LoginOptions, User } from "../types/User";

export function getUser(users: User[], type: string): LoginOptions {
  const user = users.find((u) => u.type === type);
  if (!user) throw new Error(`User type ${type} not found`);
  return user as LoginOptions;
}
