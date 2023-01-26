import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import HomeStack from "./routes/HomeStack";
import { View, Text } from "react-native";

import { AuthProvider } from "./context/AuthContext";
import { ModalPortal } from "react-native-modals";
import Home from "./components/Home";

export default function App() {
  return (
    <AuthProvider>
      <HomeStack />
      <ModalPortal />
    </AuthProvider>
  );
}
