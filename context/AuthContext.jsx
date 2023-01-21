import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";

import Posts from "../components/Posts";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [backScreen, setBackScreen] = useState("Tablica");
  const [showEditAccount, setShowEditAccount] = useState(false);

  const register = (name, lastName, email, password) => {
    setIsLoading(true);
    const ob = {
      firstname: name,
      lastname: lastName,
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ob),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.firstname) {
          alert(res.message);
        } else {
          login(res.email, res.password);
        }
      })
      .catch((e) => console.log(`error ${e}`));
    // setUserInfo(userExampleInfo);
    // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    setIsLoading(false);
  };

  const login = (email, password) => {
    setIsLoading(true);
    let ob = {
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ob),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.user) {
          alert(res.message);
        } else {
          setUserInfo(res);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      })
      .catch((e) => alert(`Błąd: ${e}`));
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);

    setTimeout(() => {
      AsyncStorage.removeItem("userInfo");
      setUserInfo({});
      setIsLoading(false);
    }, 500);
  };

  const showPosts = (url, setPosts) => {
    setIsLoading(true);
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
    setIsLoading(false);
  };

  const addSinglePost = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      let data = [
        {
          text: value,
          author: userInfo.user._id,
          date: new Date(),
        },
      ];
      setIsLoading(false);
      setShowAddPost(false);
    }, 500);
  };

  const editAccountDetails = (name, lastname, email, password) => {
    setIsLoading(true);
    let ob = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
    };
    setShowEditAccount(false);
    setIsLoading(false);
    logout();
  };

  const deletePost = (value) => {
    setDeleteModal(false);
    console.log(value);
  };

  const passValue = (value) => {
    setId(value);
  };

  const setLogin = () => {
    setIsLogin(true);
  };

  const setRegister = () => {
    setIsLogin(false);
  };

  const setDeleteModal = (value) => {
    setShowDeleteModal(value);
  };

  const setAddPost = (value) => {
    setShowAddPost(value);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        login,
        logout,
        passValue,
        id,
        isLogin,
        setLogin,
        setRegister,
        showDeleteModal,
        setDeleteModal,
        deletePost,
        showAddPost,
        setAddPost,
        addSinglePost,
        showPosts,
        backScreen,
        setBackScreen,
        showEditAccount,
        setShowEditAccount,
        editAccountDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
