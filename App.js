import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import HomeStack from "./routes/HomeStack";
import { View, Text } from "react-native";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
