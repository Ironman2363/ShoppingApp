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
import { API_Buyer, API_TypeProduct, API_Product } from "../../API/getAPI";
import icon from "../../compoment/icon";
import { useRoute } from "@react-navigation/native";
import SlideShow from "../../compoment/slideShowType";
import FiveStar from "./FiveStar";
export default function TypeDetail(props) {
  const nav = props.navigation;
  const route = useRoute();
  const { item } = route.params;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const getAPI = () => {
    const id = item._id;
    console.log(id);
    fetch(API_TypeProduct + "/getAllProduct", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((item) => item.json())
      .then((list) => setData(list))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAPI();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#DCDCDC", flex: 1 }}>
      <View
        style={{
          backgroundColor: "red",
          height: 50,
          justifyContent: "center",
          paddingStart: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: "white",
              }}
              source={icon.back}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginStart: 10,
              fontWeight: "bold",
              fontSize: 18,
              color: "white",
            }}
          >
            {item.product_type}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 70,
          marginTop: 10,
        }}
      >
        <SlideShow />
      </View>
      <FlatList
        style={{ backgroundColor: "white", paddingHorizontal: 5 }}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                marginVertical: 5,
                flexDirection: "row",
                padding: 5,
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderColor: "black",
                  borderWidth: 1,
                }}
                source={{ uri: item.image }}
              />
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: "#FFD700",
                  position: "absolute",
                  left: 70,
                  top: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Text style={{ color: "red", fontSize: 12 }}>50%</Text>
                <Text style={{ color: "white", fontSize: 10 }}>GIẢM</Text>
              </View>
              <View style={{ marginStart: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.name_product}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 30 }}>
                  <FiveStar numberStar={item.review} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <Text style={{ fontSize: 20, color: "red", marginTop: 5 }}>
                    {item.price}$
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      nav.navigate("Pay", { item });
                    }}
                    style={{
                      backgroundColor: "red",
                      marginBottom: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        margin: 10,
                      }}
                    >
                      Mua ngay
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
