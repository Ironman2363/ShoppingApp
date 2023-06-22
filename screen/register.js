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
import {
  checkRe_Passwords,
  checkEmail,
  checkPassword,
} from "../compoment/validate";
export default function Register(props) {
  const nav = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const onRegister = () => {
    const data = {
      email,
      password: rePassword,
    };
    fetch(API_Buyer + "/Register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((reponse) => {
        if (!reponse.ok) {
          setErrorEmail("Email đã tồn tại !");
        } else {
          nav.navigate("Login");
        }
      })
      .catch((err) => console.log(err));
  };

  const checkValidate = () => {
    if (
      checkEmail(email) &&
      checkPassword(password) &&
      checkRe_Passwords(rePassword, password)
    ) {
      onRegister();
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
            marginBottom: 10,
          }}
          source={require("../assets/logo.png")}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
            color: "gray",
            top: 130,
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
            // alignItems: 'center',
            marginTop: 30,
            transform: [{ skewY: "-10deg" }],
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 10,
            flex: 1,
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
            Đăng ký
          </Text>

          <TextInput
            onChangeText={(text) => {
              if (checkEmail(text)) {
                setEmail(text);
                setErrorEmail("");
              } else {
                setErrorEmail("Email không đúng định dạng !");
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
              borderColor: errorEmail ? "red" : null,
              borderWidth: 1,
            }}
            placeholder="Enter email..."
          />
          {errorEmail && (
            <Text style={{ color: "red", marginStart: 50 }}>{errorEmail}</Text>
          )}
          <TextInput
            onChangeText={(text) => {
              if (checkPassword(text)) {
                setPassword(text);
                setErorPassword("");
              } else {
                setErorPassword("Password không đúng định dạng !");
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
              borderColor: errorPassword ? "red" : null,
              borderWidth: 1,
            }}
            placeholder="Enter password..."
          />
          {errorPassword && (
            <Text style={{ color: "red", marginStart: 50 }}>
              {errorPassword}
            </Text>
          )}
          <TextInput
            onChangeText={(text) => {
              if (checkRe_Passwords(text, password)) {
                setRePassword(text);
                setErrorRePassword("");
              } else {
                setErrorRePassword("Password không đúng định dạng !");
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
              borderColor: errorRePassword ? "red" : null,
              borderWidth: 1,
            }}
            placeholder="Re-enter password..."
          />
          {errorRePassword && (
            <Text style={{ color: "red", marginStart: 50 }}>
              {errorRePassword}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              checkValidate();
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
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
