import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
// import { icon } from "../../conten"


export default function FiveStar(props) {
    const {numberStar , height , width} = props;
   return(
     [0,1,2,3,4].map((item)=>{
        return(
            <Image
            style={{width:height, height:width,marginRight:2, 
            tintColor:item <= numberStar -1 ? '#ffce3d' : 'gray'}}
            source={require("../../assets/star.png")}/>
        )
     })
   )

}