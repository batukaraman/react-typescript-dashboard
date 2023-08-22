import { users } from "../data";

export const getUserById = (id: number) => {
  return users.find((user) => user.id === id);
};
