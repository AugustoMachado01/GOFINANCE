import React, { useState } from "react";

import {
  Label,
  Title,
  Header,
  Footer,
  LoginWays,
  LoginAdvise,
  SignInContainer,
} from "./styles";

import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import MoneySvg from "../../assets/money.svg";

import { useAuth } from "../../hooks/useAuth";

import { SignSocialButton } from "./components/SignInSocialButton";
import { Alert, Platform } from "react-native";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, SignInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return signIn();
    } catch (error) {
      console.error(error);
      Alert.alert("não foi possível realizar o login");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return SignInWithApple();
    } catch (error) {
      console.error(error);
      Alert.alert("não foi possível realizar o login");
      setIsLoading(false);
    }
  }

  return (
    <SignInContainer>
      <Header>
        <MoneySvg />
        <Label>gofinances</Label>
        <Title>
          Controle suas {"\n"}
          finanças de forma {"\n"}
          muito simples
        </Title>
        <LoginAdvise>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </LoginAdvise>
      </Header>

      <Footer>
        <LoginWays>
          <SignSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithGoogle}
            />
          )}
        </LoginWays>
      </Footer>
    </SignInContainer>
  );
}
