import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    SafeAreaView, FlatList, ToastAndroid, Alert
} from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product, API_Address, API_Cart } from '../../API/getAPI';
import icon from '../../compoment/icon'
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart(props) {
    const nav = props.navigation
    const [data, setData] = useState([])
    const [total, seTtotalPrice] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const onBuy = () => {
        Alert.alert("Thông báo", "Chức năng này đang được bảo chỉ!")
    }
    useEffect(() => {
        seTtotalPrice(selectedItems.reduce((total, item) => total + item.price * item.soLuong, 0));
    }, [selectedItems])

    const handleCheckboxChange = (item) => {
        if (selectedItems.includes(item)) {
            // Nếu sản phẩm đã được chọn, loại bỏ khỏi danh sách
            setSelectedItems(selectedItems.filter((i) => i !== item));
        } else {
            // Nếu sản phẩm chưa được chọn, thêm vào danh sách
            setSelectedItems([...selectedItems, item]);
        }
    };
    const onDelete = (id) => {
        fetch(API_Cart + "/deleteCart" + "/" + id)
            .then(() => onGetAllCart())
            .catch(err => console.log(err))
    }
    const onGetAllCart = async () => {
        const user = await AsyncStorage.getItem("data");
        const data = user ? JSON.parse(user) : null;

        fetch(API_Cart + '/getAllCart',{
            method:"POST",
            body: JSON.stringify({id:data._id}),
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.log(err))
    }
   
 
    useEffect(() => {
        onGetAllCart()
    }, [])

    const [check1, setCheck1] = useState(false);
    return (
        <View style={{
            flex: 1, backgroundColor: "#DCDCDC"
        }}>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            width: "100%", padding: 15, flexDirection: "row", backgroundColor: "white",
                            marginTop: 10,
                        }}>
                            <View style={{
                                marginLeft: -22, alignItems: "center", justifyContent: "center"
                            }}>
                                <CheckBox
                                    value={selectedItems.includes(item)}
                                    onValueChange={() => handleCheckboxChange(item)}
                                    checked={selectedItems.includes(item)}
                                    onPress={() => handleCheckboxChange(item)}
                                />
                            </View>

                            <Image style={{
                                width: 80, height: 80
                            }} source={{ uri: item.image }} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{
                                    fontWeight: 'bold', fontSize: 18,
                                }}>{item.name_product}</Text>
                                <Text style={{ marginTop: 5 }}>Phân loại: {item.nameLoaiSP}</Text>
                                <Text style={{ marginTop: 5, color: "red" }}>{item.price}$</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Thông báo", "Bạn có chắc chẵn muốn xóa không ?", [
                                        {
                                            text: "Cancel",
                                            style: 'cancel',
                                        }, {
                                            text: "ok",
                                            onPress: () => {
                                                onDelete(item.productID)
                                            }
                                        }
                                    ])
                                }}
                                style={{
                                    position: "absolute", right: 20, top: 15, borderWidth: 1,
                                    padding: 6, borderColor: "gray"
                                }}
                            >
                                <Text>Xóa</Text>
                            </TouchableOpacity>
                                <Text style={{
                                    position:"absolute",
                                    bottom:15, right:50
                                }}>x{item.soLuong}</Text>
                        </View>
                    )
                }}
            />
            <View style={{
                flexDirection: "row", height: 50, justifyContent: "space-between", borderTopWidth: 0.4, borderColor: "gray"
            }}>
                <View style={{
                    width: "70%", backgroundColor: "white",
                    justifyContent: "flex-end", flexDirection: "row", alignItems: "center",
                    paddingRight: 10
                }}>
                    <Text style={{
                        marginRight: 5
                    }}>Tổng thanh toán </Text>
                    <Text style={{
                        color: "red", fontWeight: "bold"
                    }}>{total}$</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        onBuy()
                    }}
                    style={{
                        backgroundColor: "red", flex: 1, justifyContent: "center", alignItems: "center"
                    }}>
                    <Text style={{
                        color: "white", fontWeight: "bold"
                    }}>Mua hàng</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}