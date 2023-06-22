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
  ToastAndroid,
} from "react-native";
import {
  API_Buyer,
  API_TypeProduct,
  API_Product,
  API_Address,
  API_Cart,
} from "../../API/getAPI";
import icon from "../../compoment/icon";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiveStar from "./FiveStar";
import { Title } from "react-native-paper";
export default function DetailProduct(props) {
  const route = useRoute();
  const nav = props.navigation;
  const { item } = route.params;
  // console.log(item)
  const [data, setData] = useState([]);
  const getTopSP = () => {
    fetch(API_Product + "/getTopSP")
      .then((item) => item.json())
      .then((list) => setData(list))
      .catch((err) => console.log(err));
  };

  const onUser = async () => {
    const user = await AsyncStorage.getItem("data");
    const data = user ? JSON.parse(user) : null;
    setIDKH(data._id);
  };

  useEffect(() => {
    getTopSP();
    onSetData();
    onUser();
  }, [item]);
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  }
  const onSetData = () => {
    setImage(item.image);
    setName_product(item.name_product);
    console.log(item.name_product);
    setPrice(item.price);
    setDescription(item.description);
    setSold(item.sold);
    setTypeProductID(item.typeProductID);
    setReview(item.review);
    setID(item._id);
  };
  const formData = new FormData();
  const [name_product, setName_product] = useState("");
  const [ID_Product, setID] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [sold, setSold] = useState("");
  const [typeProductID, setTypeProductID] = useState("");
  const [review, setReview] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [ID_KH, setIDKH] = useState("");
  formData.append("name_product", name_product);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("description", description);
  formData.append("sold", sold);
  formData.append("typeProductID", typeProductID);
  formData.append("review", review);
  formData.append("ID_Product", ID_Product);
  formData.append("soLuong", soLuong);
  formData.append("ID_KH", ID_KH);
  const onAddCart = () => {
    // console.log(formData)
    ToastAndroid.show(
      "Thêm vào giỏ hàng thành công !",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
    fetch(API_Cart + "/addCart", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((err) => console.log(err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#DCDCDC" }}>
      <FlatList
        data={[item]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                style={{
                  width: "100%",
                  height: 200,
                }}
                source={{ uri: item.image }}
              />

              <View
                style={{
                  backgroundColor: "white",
                  marginTop: 20,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      fontSize: 25,
                    }}
                  >
                    {item.name_product}
                  </Text>
                  <Text
                    style={{
                      color: "red",
                      fontSize: 17,
                      marginTop: 10,
                    }}
                  >
                    {item.price}$
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <FiveStar
                        numberStar={item.review}
                        height={10}
                        width={10}
                      />
                    </View>
                    <Text>Đã bán {formatNumber(item.sold)}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  marginTop: 10,
                  padding: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Top sản phẩm nổi bật</Text>
                <FlatList
                  data={data}
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          nav.navigate("DetailProduct", { item });
                        }}
                        style={{
                          width: 100,
                          minHeight: 150,
                          borderWidth: 0.5,
                          borderColor: "gray",
                          marginRight: 10,
                          marginTop: 10,
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: 80,
                          }}
                          source={{ uri: item.image }}
                        />
                        <View style={{ padding: 3 }}>
                          <Text>{item.name_product}</Text>
                          <Text style={{ color: "red" }}>{item.price}$</Text>
                          <View style={{ flexDirection: "row", marginTop: 3 }}>
                            <FiveStar
                              numberStar={item.review}
                              width={7}
                              height={7}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              marginTop: 5,
                            }}
                          >
                            Đã bán {formatNumber(item.sold)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Chi tiết sản phẩm </Text>
                <Text style={{ marginTop: 15 }}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}
          style={{}}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: "red",
            }}
            source={icon.back}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Cart");
          }}
          style={{
            marginRight: 20,
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: "white",
            }}
            source={icon.cart}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onAddCart();
          }}
          style={{
            width: "70%",
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: "white",
            }}
            source={icon.addCart}
          />
          <Text style={{ color: "white", marginLeft: 10 }}>
            Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Pay", { item });
          }}
          style={{
            backgroundColor: "red",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
