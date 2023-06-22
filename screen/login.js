import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { API_Buyer } from "../API/getAPI";
import { checkEmail, checkPassword } from "../compoment/validate";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login(props) {
  const nav = props.navigation;
  const [email, setEmail] = useState("hung12@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [user, setUser] = useState({});
  const onLogin = async () => {
    try {
      const data = {
        email,
        password,
      };
      const response = await fetch(API_Buyer + "/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datas = await response.json();
      AsyncStorage.setItem("data", JSON.stringify(datas));
      props.setIsLogin(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flex: 0.3,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ skewY: "0deg" }],
        }}
      >
        <Image
          style={{
            width: 170,
            height: 170,
            marginBottom: 20,
          }}
          source={require("../assets/logo.png")}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
            color: "gray",
            top: 150,
          }}
        >
          IStore
        </Text>
      </View>
      <View
        style={{
          borderRadius: 50,
          flex: 0.7,
          backgroundColor: "gray",
          transform: [{ skewY: "10deg" }],
        }}
      >
        <View
          style={{
            marginTop: 50,
            transform: [{ skewY: "-10deg" }],
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            Đăng nhập
          </Text>

          <TextInput
            onChangeText={(text) => {
              if (checkEmail(text)) {
                setEmail(text);
                setErrEmail("");
              } else {
                setErrEmail("Email không đúng định dạng !");
              }
            }}
            style={{
              height: 40,
              width: "100%",
              backgroundColor: "white",
              marginTop: 30,
              paddingStart: 10,
              width: "75%",
              borderRadius: 10,
              alignSelf: "center",
            }}
            placeholder="Enter email..."
          />
          {errEmail && (
            <Text
              style={{
                color: "red",
                marginLeft: 50,
              }}
            >
              {errEmail}
            </Text>
          )}
          <TextInput
            onChangeText={(text) => {
              if (checkPassword(text)) {
                setPassword(text);
                setErrPassword("");
              } else {
                setErrPassword("Password không đúng định dạng !");
              }
            }}
            style={{
              height: 40,
              width: "100%",
              backgroundColor: "white",
              marginTop: 15,
              paddingStart: 10,
              width: "75%",
              borderRadius: 10,
              alignSelf: "center",
            }}
            placeholder="Enter password..."
          />
          {errPassword && (
            <Text
              style={{
                color: "red",
                marginLeft: 50,
              }}
            >
              {errPassword}
            </Text>
          )}
          {error && (
            <Text
              style={{
                color: "red",
                marginLeft: 50,
                marginTop: 10,
              }}
            >
              {error}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              onLogin();
            }}
            style={{
              width: "75%",
              backgroundColor: "black",
              marginTop: 30,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              nav.navigate("Register");
            }}
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textDecorationLine: "underline",
              }}
            >
              Bạn chưa có tài khoản ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
