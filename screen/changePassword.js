import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList, ToastAndroid } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_Buyer } from '../API/getAPI';
import { checkRe_Passwords, checkEmail, checkPassword } from '../compoment/validate';
export default function ChangePassword(props) {
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [errorPassword, setErorPassword] = useState("")
    const [errorRePassword, setErrorRePassword] = useState("")
    const [_id, setID] = useState("")
    const nav = useNavigation()
    const onUpdatePassword = (id) => {
        fetch(API_Buyer + "/updatePassword/" + id, {
            method: "PUT",
            body: JSON.stringify({ password: rePassword }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => ToastAndroid.show("Đôi mật khẩu thành công !", ToastAndroid.CENTER, ToastAndroid.LONG))
            .then(() => nav.goBack())
            .catch(err => console.log(err))
    }

    const onGetID = async () => {
        const user = await AsyncStorage.getItem("data");
        const data = user ? JSON.parse(user) : null
        setID(data._id)
    }
    useEffect(() => {
        onGetID()
    }, [])
    return (
        <View style={{
            padding: 20, marginTop: 18
        }}>
            <TextInput
                onChangeText={(text) => {
                    if (checkPassword(text)) {
                        setPassword(text);
                        setErorPassword("")
                    } else {
                        setErorPassword("Mật khâu không đúng định dạng")
                    }


                }}
                style={{
                    width: '100%', height: 40, borderBottomWidth: 2, borderColor: "green"
                }}
                placeholder='Mật khẩu mới ' />
            {errorPassword && <Text style={{ color: "red" }}>{errorPassword}</Text>}
            <TextInput
                onChangeText={(text) => {
                    if (checkRe_Passwords(text, password)) {
                        setRePassword(text);
                        setErrorRePassword("")
                    } else {
                        setErrorRePassword("Mật khâu không đúng định dạng")
                    }


                }}
                style={{
                    width: '100%', height: 40, borderBottomWidth: 2, marginTop: 20, borderColor: "green"
                }}
                placeholder='Xác nhận mật khẩu mới ' />
            {errorRePassword && <Text style={{ color: "red", }}>{errorRePassword}</Text>}
            <TouchableOpacity
                onPress={() => {
                    onUpdatePassword(_id)
                }}
                style={{
                    width: "100%", backgroundColor: "red", marginTop: 26, justifyContent: "center",
                    alignItems: "center", borderRadius: 7
                }}>
                <Text style={{
                    paddingVertical: 10, color: "white", fontWeight: "bold"
                }}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    )
}