import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import HomeStack from "./routes/HomeStack";
import { View, Text } from "react-native";

import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/NunitoSans-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/NunitoSans-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  return (
    <AuthProvider>
      <HomeStack />
    </AuthProvider>
  );
}
