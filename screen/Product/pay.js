import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput,
   TouchableOpacity, SafeAreaView, FlatList ,ToastAndroid} from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product, API_Address, API_DetailOrder } from '../../API/getAPI';
import icon from '../../compoment/icon';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
export default function Pay(props) {
  const nav = props.navigation
  const [address, setAddress] = useState([])
  const route = useRoute()
  const { item, selectedItems  } = route.params

  const status = useIsFocused()
  const [result, setResult] = useState("")
  const [count, setCount] = useState(1)
  const [checked, setChecked] = useState(null)
  const [ID_KH, setID_KH] = useState('')
  const [giaSP, setGiaSP] = useState(item.price)
  const [nameSP, setNameSP] = useState(item.name_product)
  const [image, setImage] = useState(item.image)
  // const [sold , setSold] = useState(item.sold)
  const [date , setDate] = useState('')


  const onUpdateSold = (id) =>{
    const sold  = item.sold + 1;
    fetch(API_Product + "/updateSold/"+id,{
      method:"PUT",
      body: JSON.stringify({sold:sold}),
      headers:{
        "Content-Type": "application/json"
      }
    }).catch(err => console.log(err))
  }

  const onSaveOrder =   () => {
    if(!checked){
      ToastAndroid.show("Vui lòng thêm địa chỉ !",ToastAndroid.CENTER ,ToastAndroid.LONG)
      return
    }
    // await increaseSold();
    let date = new Date()
    const formData = new FormData();
    formData.append("ID_KH", ID_KH);
    formData.append("giaSP", giaSP);
    formData.append("nameSP", nameSP);
    formData.append("image", image);
    formData.append("soluongSP", count);
    formData.append("ID_Address", checked);
    formData.append("tongTien", result);
    formData.append("status", "xu ly"); 
    formData.append("date", date.toDateString()); 

    fetch(API_DetailOrder + "/addOrder", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => onUpdateSold(item._id))
      .then(() => nav.navigate("Success"))
      .catch(err => console.error(err))
  }


  useEffect(() => {
    const getAddressAPI = async () => {
      const user = await AsyncStorage.getItem("data");
      const parsedDatas = user != null ? JSON.parse(user) : null;
      setID_KH(parsedDatas._id)
      fetch(API_Buyer + "/getAddress", {
        method: "POST",
        body: JSON.stringify({ id: parsedDatas._id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((item) => item.json())
        .then((list) => setAddress(list))
        .catch((err) => console.log(err));
    };
    getAddressAPI();
    tonTien()
  }, [count, status]);

  useEffect(() => {
    if (address.length > 0 && !checked) {
      setChecked(address[0]._id);
    }
  }, [address])


  const tonTien = () => {
    setResult(giaSP * count)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, backgroundColor: "#FFFAFA", flexDirection: "row" }}>
        <Image style={{
          width: 100, height: 100
        }} source={{ uri: image }} />
        <View style={{ marginStart: 10 }}>
          <Text style={{ fontSize: 30 }}>{nameSP}</Text>
          <Text style={{ fontSize: 20, marginTop: 25 }}>{giaSP}$</Text>
        </View>
        <View style={{ flexDirection: "row", position: "absolute", right: 25, bottom: 18 }}>
          <TouchableOpacity
            onPress={() => {
              if (count > 1) {
                setCount(count - 1)
              }

            }}
          >
            <Image style={{ width: 20, height: 20, marginRight: 7 }} source={icon.minus} />
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1)
            }}>
            <Image style={{ width: 20, height: 20, marginLeft: 7 }} source={icon.plus} />
          </TouchableOpacity>

        </View>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text style={{ fontSize: 20 }}>Địa chỉ nhận hàng </Text>
        </View>
        <FlatList
          data={address}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    value={item._id} // Giá trị của nút radio
                    status={checked === item._id ? 'checked' : 'unchecked'} // Trạng thái của nút radio
                    onPress={() => setChecked(item._id)} // Xử lý khi nút radio được chọn
                  />
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>{item.name} |</Text>
                      <Text> {item.phone}</Text>
                    </View>
                    <Text>{item.address}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate("EditAddress", { item })
                  }}>
                  <Text style={{ color: "red", marginRight: 10 }}>Sửa</Text>
                </TouchableOpacity>

              </View>
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            nav.navigate("ThemAddress", { ID_KH })
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center", alignItems: "center", backgroundColor: "#DCDCDC", height: 40,
            marginTop: 10
          }}>
          <Image style={{ width: 20, height: 20, tintColor: "red" }} source={icon.plus} />
          <Text style={{ color: "red", marginStart: 6 }}>Thêm địa chỉ mới </Text>
        </TouchableOpacity>
      </View>
      <View style={{
        width: "100%", height: 50, position: "absolute",
        bottom: 0, backgroundColor: "white", flexDirection: "row"
      }}>
        <View style={{
          width: "70%", justifyContent: "center", alignItems: "flex-end",
          paddingRight: 20
        }}>
          <Text style={{ fontSize: 18 }}>Tổng thanh toán</Text>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>{result}$</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onSaveOrder()

          }}
          style={{
            width: "30%", backgroundColor: "red", justifyContent: "center",
            alignItems: "center"
          }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}