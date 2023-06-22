import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    SafeAreaView, FlatList, ToastAndroid, Alert
} from 'react-native';
import { API_Buyer, API_TypeProduct, API_Product, API_Address, API_Cart } from '../../API/getAPI';
import icon from '../../compoment/icon'
import GripView from './GridView';
export default function ListSearch(props) {
    const nav = props.navigation
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const getAllSearch = () => {
        fetch(API_Product + '/searchProduct?search=' + search, {
            Headers: {
                "Content-Type": "application/json"
            }
        }).then(item => item.json())
            .then(list => setData(list))
            .catch(err => console.log(err))
    }
    const debounce = (func, delay) => {

        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    }
    const delayedSearch = debounce(getAllSearch, 1);
    return (
        <SafeAreaView style={{
            flex: 1,  backgroundColor: "#DCDCDC",
        }}>
            <View style={{ flexDirection: "row",  justifyContent:"center",
            alignItems: "center" , width:"100%", height:80, backgroundColor:"white",
            padding: 10,  }}>
                <TouchableOpacity
                onPress={()=>{
                    nav.goBack()
                }}
                >
                    <Image style={{
                        width: 25, height: 25, tintColor: "red"
                    }} source={icon.back} />
                </TouchableOpacity>

                <View style={{
                    flexDirection: "row", alignItems: "center", 
                }}>
                    <TextInput
                        onSubmitEditing={getAllSearch}
                        placeholder='Search clothes...'
                        style={{
                            width: "77%", height: 40, paddingStart: 10,
                            marginStart: 20, borderWidth: 1, borderColor: "red", borderRadius: 5
                        }}
                        onChangeText={(text) => {
                            setSearch(text)
                            delayedSearch();
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            getAllSearch()
                        }}
                        style={{
                            backgroundColor: "red", height: 40, width: 40, justifyContent: "center",
                            alignItems: "center", borderRadius: 5, marginLeft:4
                        }}>
                        <Image style={{
                            width: 25, height: 25, tintColor: "white"
                        }} source={icon.search} />
                    </TouchableOpacity>
                </View>

            </View>

          {data.length > 0 ?<FlatList
                style={{ height: 310 }}
                data={data}
                keyExtractor={item => item._id}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <GripView item={item} onPress={() => {
                            nav.navigate("DetailProduct", { item })
                        }} />
                    )
                }}
            />:<View style={{alignItems:"center", justifyContent:"center",
            flex:1}}>
                <Image style={{
                    width:150 , height:150, tintColor:"gray"
                }} source={icon.notSearch}/>
                <Text style={{
                    color:"black", fontSize:20, fontWeight:"bold"
                }}>Không tìm thấy kết quả nào</Text>
                </View>}
        </SafeAreaView>
    )
}