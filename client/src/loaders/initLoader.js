import { getCurrentUser } from "api/auth";

export const initLoader = async () => {
  return getCurrentUser();
};
