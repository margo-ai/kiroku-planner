import { UserCredential } from "firebase/auth";

import { UserData } from "../../../../shared/types";

export interface AuthContextType {
  signUp: (email: string, password: string) => Promise<UserCredential | undefined>;
  signIn: (email: string, password: string) => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
  user: UserData | null;
  loading: boolean;
  error: string | null;
}
