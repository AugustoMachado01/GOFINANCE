import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
interface AuthContextType {
  useStorageIsLoading: boolean;
  user: User | undefined;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  SignInWithApple: () => Promise<void>;
}
export const AuthContext = createContext({} as AuthContextType);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [useStorageIsLoading, setUserStorageIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri(),
    scopes: ["email", "profile"],
  });

  async function signIn() {
    try {
      await promptAsync();
    } catch (Erro) {
      throw new Error(String(Erro));
    } finally {
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(`${storageKey}:user`);
    setUser(undefined);
  }

  const storageKey = "@gofinances";

  async function SignInWithGoogle(accessToken: string) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response;

      const userInfo: User = {
        name: data.name,
        email: data.email,
        avatarUrl: data.picture,
        id: data.id,
      };

      setUser(userInfo);
      const userToStorage = JSON.stringify(userInfo);
      await AsyncStorage.setItem(`${storageKey}:user`, userToStorage);
    } catch (error) {
      console.log(error);
    }
  }

  async function SignInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName?.givenName!;
        const avatarUrl = `https://ui-avatars.com/api/?name=${name}&length=1`;
        const userLogged: User = {
          id: credential.user,
          name,
          email: credential.email!,
          avatarUrl,
        };
        setUser(userLogged);

        const userToStorage = JSON.stringify(userLogged);
        await AsyncStorage.setItem(`${storageKey}:user`, userToStorage);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async function fetchUserDataInStorage() {
    setUserStorageIsLoading(true);

    const userStorage = await AsyncStorage.getItem(`${storageKey}:user`);
    if (userStorage) {
      const userStorageFormated = JSON.parse(userStorage) as User;
      setUser(userStorageFormated);
    }
    setUserStorageIsLoading(false);
  }

  useEffect(() => {
    fetchUserDataInStorage();
  }, []);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      SignInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        useStorageIsLoading,
        signIn,
        signOut,
        SignInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
