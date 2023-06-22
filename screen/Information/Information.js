import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList, ToastAndroid } from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product } from '../../API/getAPI';
import icon from '../../compoment/icon';
import { useRoute , useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
export default function Information(props) {
    const [data, setData] = useState({})
    const [phone, setPhone] = useState('')
    const nav = useNavigation()
    useEffect(() => {
        setPhone(data.phone);
        setEmail(data.email)
        setName(data.name)
        setImage(data.image)
    }, [data.phone, data.email, data.name , data.image]);

    const [image, setImage] = useState('')

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const getName = async () => {
        const user = await AsyncStorage.getItem("data");
        const data = user ? JSON.parse(user) : null
        setData(data);
    }

    useEffect(() => {
        getName()
    }, [])

    const formData = new FormData()
    formData.append("image", image)
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    const onUpdateProfile = (id) => {
        fetch(API_Buyer + "/updateProfile/" + id, {
            method: "PUT",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(() => ToastAndroid.show("Update thành công",ToastAndroid.CENTER , ToastAndroid.LONG))
        .catch(err => console.log(err))
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#DCDCDC" }}>
            <View style={{
                backgroundColor: "red", width: "100%", height: 80,
                justifyContent: "flex-start", flexDirection: "row", alignItems: "center",

            }}>
                {image ? <Image style={{
                    width: 50, height: 50, marginLeft: 15, tintColor: "white", borderWidth: 1, borderWidth: 1,
                    borderColor: "gray", borderRadius: 30
                }} source={{uri:data.image ? data.image : image}} /> :
                    <Image style={{
                        width: 50, height: 50, marginLeft: 15, tintColor: "white", borderWidth: 1,
                        borderColor: "gray", borderRadius: 30
                    }} source={icon.profile} />}

                <Text style={{ fontSize: 20, color: "white", marginLeft: 10 }}>{data.name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        pickImage()
                    }}
                    style={{
                        position: "absolute", left: 50, top: 45
                    }}>
                    <Image style={{
                        width: 20, height: 20, tintColor: "gray",
                    }} source={icon.camera} />
                </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginStart: 20, marginTop: 20 }}>Thông tin người dùng</Text>
            <View style={{
                minWidth: 100, margin: 10, backgroundColor: "white", borderRadius: 10,
                paddingBottom: 10
            }}>
                <TouchableOpacity style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    marginTop: 15, paddingHorizontal: 10
                }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center"
                    }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray"
                        }} source={icon.phone} />
                        <Text style={{
                            fontSize: 17, marginLeft: 10
                        }}>Số điện thoại</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                            onChangeText={(text) => {
                                setPhone(text);
                            }}
                            style={{ marginRight: 10, color: "gray" }} value={phone} />
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray",
                        }} source={icon.next} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    marginTop: 20, paddingHorizontal: 10,
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: 'gray'
                        }} source={icon.email} />
                        <Text style={{
                            fontSize: 17, marginStart: 10
                        }}>Email</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                            style={{ marginRight: 10, color: "gray" }} value={email} />
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray",
                        }} source={icon.next} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    marginTop: 20, paddingHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center"
                    }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray"
                        }} source={icon.name} />
                        <Text style={{
                            fontSize: 17, marginStart: 10
                        }}>Họ tên</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                            onChangeText={(text) => {
                                setName(text);
                            }}
                            style={{ marginRight: 10, color: "gray" }} value={name} />
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray",
                        }} source={icon.next} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() =>{
                    nav.navigate("DaGiao")
                }}
                style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    marginTop: 20, paddingHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center"
                    }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray"
                        }} source={icon.order} />
                        <Text style={{
                            fontSize: 17, marginStart: 10
                        }}>Đơn mua </Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            color:'gray', marginRight:10
                        }}>Xem lịch sử mua hàng</Text>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray",
                        }} source={icon.next} />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginStart: 20, marginTop: 10 }}>Bảo mật</Text>
            <View style={{
                minWidth: 100, margin: 10, backgroundColor: "white", borderRadius: 10,
            }}>
                <TouchableOpacity 
                onPress={()=>{
                    nav.navigate("ChangePassword")
                }}
                style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    marginVertical: 15, paddingHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center"
                    }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray"
                        }} source={icon.eye} />
                        <Text style={{
                            fontSize: 17, marginStart: 10
                        }}>Đổi mật khẩu</Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray",
                        }} source={icon.next} />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 15, fontWeight: "bold", marginStart: 20, marginTop: 10 }}>Đăng nhập</Text>
            <View style={{
                minWidth: 100, margin: 10, backgroundColor: "white", borderRadius: 10,
            }}>
                <TouchableOpacity 
                onPress={()=>{

                    props.setIsLogin(false)
                }}
                style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                    marginVertical: 15, paddingHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: "row", alignItems: "center",
                    }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray"
                        }} source={icon.logout} />
                        <Text style={{
                            fontSize: 17, marginStart: 10
                        }}>Đăng xuất</Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Image style={{
                            width: 20, height: 20, tintColor: "gray",
                        }} source={icon.next} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,  justifyContent: "center", alignItems: "center",
            }}>
                <TouchableOpacity 
                onPress={()=>{
                    onUpdateProfile(data._id)
                }}
                style={{
                    backgroundColor: "gray",padding:10, paddingHorizontal:20, borderRadius:10
                }}>
                    <Text style={{
                        color: "white", fontWeight:"bold"
                    }}>Update</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}