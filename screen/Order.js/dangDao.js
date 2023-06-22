import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { API_Clothes, API_DetailOrder } from "../../API/getAPI";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
export default function DangDao() {
  const nav = useNavigation();
  const [list, setList] = useState([]);
  const trangThai = useIsFocused();
  const getAllXacNhan = async () => {
    const user = await AsyncStorage.getItem("data");
    const data = user ? JSON.parse(user) : null;
    fetch(API_DetailOrder + "/getAllOrderXacNhan", {
      method: "POST",
      body: JSON.stringify({ id: data._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((item) => item.json())
      .then((data) => setList(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllXacNhan();
  }, [trangThai]);

  const onXacNhan = (id) => {
    fetch(API_DetailOrder + "/updateOrder/" + id, {
      method: "PUT",
      body: JSON.stringify({ status: "da nhan", date: new Date() }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => nav.navigate("DaGiao"))
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#DCDCDC" }}>
      <StatusBar></StatusBar>
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                height: 190,
                padding: 10,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{ marginLeft: 12, fontSize: 20, fontWeight: "bold" }}
                >
                  {item.nameSP}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                  marginTop: 7,
                }}
              >
                <Text>{item.soluongSP} sản phẩm</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 20 }}>Thành tiền: </Text>
                  <Text style={{ fontSize: 20, color: "red" }}>
                    {item.tongTien}$
                  </Text>
                </View>
              </View>
              <View style={{ position: "absolute", right: 10, top: 37 }}>
                <Text style={{ fontSize: 16, marginLeft: 30 }}>
                  x{item.soluongSP}
                </Text>
                <Text style={{ color: "red", fontSize: 20 }}>
                  {item.giaSP}$
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "gray" }}>Đang chờ giao hàng</Text>
                <TouchableOpacity
                  onPress={() => {
                    onXacNhan(item._id);
                  }}
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Đã nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
