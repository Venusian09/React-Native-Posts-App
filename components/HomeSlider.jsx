import React from "react";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { View, Text, Image } from "react-native";

const slides = [
  { uri: require("../assets/slides/slide1.jpeg"), text: "witam", key: 1 },
  { uri: require("../assets/slides/slide2.jpeg"), text: "elo", key: 2 },
  { uri: require("../assets/slides/slide3.jpeg"), text: "cześć", key: 3 },
];

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
    maxHeight: 150,
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  text: {
    zIndex: 9999,
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default function HomeSlider() {
  return (
    <>
      <View style={{ flex: 0.3 }}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          showsPagination={false}
          autoplayTimeout={1.5}
        >
          {slides.map((item) => {
            return (
              <View style={styles.slide} key={item.id}>
                <Image style={styles.image} source={item.uri} />
                <Text style={styles.text}>{item.text}</Text>
              </View>
            );
          })}
        </Swiper>
      </View>
    </>
  );
}
