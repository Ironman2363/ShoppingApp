import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import icon from '../../compoment/icon';
export default function Success(props){
    const nav = props.navigation
    return(
        <View style={{ alignItems:"center",flex:1 , justifyContent:"center"}}>
           <Image 
            style={{width:100 , height:100, }} source={icon.success}/>
            <Text style={{fontSize:20, color:"green", marginTop:10}}>Đặt hàng thành công !</Text>
            <TouchableOpacity 
            onPress={()=>{
                nav.navigate("Home")
                props.setOrderCount(props.orderCount + 1)
            }}
            style={{height:40 , width:150 , borderWidth:1 , 
            borderColor:"green", justifyContent:"center", alignItems:"center", marginTop:20,
            borderRadius:10}}>
                <Text style={{fontWeight:"bold"}}>Quay về trang chủ</Text>
            </TouchableOpacity>
        </View>
    )
}