import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";

export default function SlideShow() {
  return (
    <Swiper showsPagination={false} autoplay={true} autoplayTimeout={1}>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: "https://bizweb.dktcdn.net/100/176/601/collections/untitled-2-1-ef3e6f0b-cc6b-4d46-bc2f-b4f01071a61b.jpg?v=1663070166100",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: "https://blog.daraz.lk/wp-content/uploads/2020/11/Apple-iPhone-12-Banner.png",
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: "https://dailytimes.com.pk/assets/uploads/2020/12/11/website-banner-1200x4181-1.png",
          }}
        />
      </View>
    </Swiper>
  );
}
