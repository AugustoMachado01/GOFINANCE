import React from "react";

import "intl";
import "intl/locale-data/jsonp/pt-BR";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/context/AuthContext";
import theme from "./src/global/styles/theme";
import { useAuth } from "./src/hooks/useAuth";
import { Loader } from "./src/components/Loader";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { useStorageIsLoading } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthContextProvider>
        {fontsLoaded || useStorageIsLoading ? <Routes /> : <Loader />}
      </AuthContextProvider>
    </ThemeProvider>
  );
}
