import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product, API_Address } from '../../API/getAPI';
import icon from '../../compoment/icon';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThemAddress(props) {
  const nav = props.navigation;
  const route = useRoute()
  const { item } = route.params;
  const [name, setName] = useState(item.name)
  const [phone, setPhone] = useState(item.phone)
  const [address, setAddress] = useState(item.address)
  const [ID_KH, setID_KH] = useState(item.ID_KH)
  const onEditAddress = (id) => {
    const data = {
      name, phone, address, ID_KH
    }
    fetch(API_Address + "/updateAddress" + "/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(() => nav.goBack())
      .catch(err => console.log(err))
  }

  const onDeleteAddress = (id) =>{
     fetch(API_Address + "/deleteAddress/"+id)
     .then(() => nav.goBack())
     .catch(err => console.log(err))
  }


  return (
    <View style={{
      padding: 10
    }}>
      <Text>Liên hệ</Text>
      <TextInput
        value={name}
        placeholder='Họ và tên'
        style={{
          backgroundColor: "white", height: 40, marginTop: 15, paddingStart: 10

        }}
        onChangeText={(text) => {
          setName(text);
        }} />
      <TextInput
        value={phone}
        placeholder='Số điện thoại'
        style={{
          backgroundColor: "white", height: 40, marginTop: 5, paddingStart: 10

        }}
        onChangeText={(text) => {
          setPhone(text)
        }} />
      <Text style={{ marginVertical: 10 }}>Địa chỉ</Text>
      <TextInput
        value={address}
        placeholder='Tên đường, Tòa nhà, Số nhà '
        style={{
          backgroundColor: "white", height: 40, marginTop: 5, paddingStart: 10

        }}
        onChangeText={(text) => {
          setAddress(text);
        }} />
      <View style={{
        flexDirection:"row", justifyContent:"space-between"
      }}>
        <TouchableOpacity 
        onPress={() =>{
          Alert.alert("Thông báo","Bạn có chắc chẵn muốn xóa không !",[
            {
              text:"Cancel",
              style:"cancel"
            },{
              text:"OK",
              onPress:() => {
                 onDeleteAddress(item._id)
              }
            }
          ])
         
        }}
        style={{
          width:"35%" , marginTop: 30, height:40, borderRadius:18 , borderWidth:1,
          borderColor:"red", justifyContent:"center" ,alignItems:"center", backgroundColor:"white"
        }}>
          <Text style={{color:"red", fontWeight:"bold"}}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onEditAddress(item._id)
          }}
          style={{
            width: "55%", height: 40, backgroundColor: "red", marginTop: 30,
            justifyContent: "center", alignItems: "center", borderRadius:18,
          }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>HOÀN THÀNH </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}