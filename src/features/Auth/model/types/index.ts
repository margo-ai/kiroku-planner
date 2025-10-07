import { UserCredential } from "firebase/auth";

export type UserData = {
  uid: string;
  email: string | null;
  name: string | null;
  photo: string | null;
};

export interface AuthContextType {
  signUp: (email: string, password: string) => Promise<UserCredential | undefined>;
  signIn: (email: string, password: string) => Promise<UserCredential | undefined>;
  refreshUser: () => Promise<void>;
  logOut: () => Promise<void>;
  user: UserData | null;
  loading: boolean;
  error: string | null;
}
