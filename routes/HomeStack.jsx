import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from "react-navigation-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import WelcomeScreen from "../components/WelcomeScreen.jsx";
import LoginRegister from "../components/LoginRegister.jsx";
import LoginUser from "../components/LoginUser.jsx";
import RegisterUser from "../components/RegisterUser.jsx";

import Home from "../components/Home.jsx";
import MyProfile from "../components/MyProfile.jsx";
import Information from "../components/Information.jsx";
import SinglePost from "../components/SinglePost.jsx";
import UserSearch from "../components/UserSearch.jsx";

import { AuthContext } from "../context/AuthContext.jsx";

const Stack = createBottomTabNavigator();

const HomeStack = () => {
  const { userInfo, backScreen } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Tablica") {
              iconName = focused ? "ios-browsers" : "ios-browsers-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            } else if (route.name === "Informacje") {
              iconName = focused
                ? "ios-log-in"
                : "ios-information-circle-outline";
            } else if (route.name === "Zaloguj się") {
              iconName = focused ? "ios-log-in" : "ios-log-in-outline";
            } else if (route.name === "Zarejestruj się") {
              iconName = focused ? "ios-create" : "ios-create-outline";
            } else if (route.name === "Użytkownicy") {
              iconName = focused ? "ios-search" : "ios-search-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#707eff",
        })}
      >
        {userInfo.token ? (
          <>
            <Stack.Screen name="Tablica" component={Home} />
            <Stack.Screen name="Profil" component={MyProfile} />
            <Stack.Screen name="Użytkownicy" component={UserSearch} />
            <Stack.Screen name="Informacje" component={Information} />
            <Stack.Screen
              name="Singlepost"
              component={SinglePost}
              options={({ navigation, route }) => ({
                tabBarItemStyle: {
                  display: "none",
                },
                headerLeft: () => (
                  <HeaderBackButton
                    onPress={() => navigation.navigate(backScreen)}
                    label="Cofnij"
                  />
                ),
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome screen"
              component={WelcomeScreen}
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}
            />
            <Stack.Screen
              name="Login Register"
              component={LoginRegister}
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}
            />
            <Stack.Screen
              name="Zaloguj się"
              component={LoginUser}
              options={{
                headerShown: false,
                tabBarItemStyle: {
                  display: "none",
                },
              }}
            />
            <Stack.Screen
              name="Zarejestruj się"
              component={RegisterUser}
              options={{
                headerShown: false,
                tabBarItemStyle: {
                  display: "none",
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
