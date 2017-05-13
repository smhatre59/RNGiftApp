import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

module.exports = StyleSheet.create({
  progressBar: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    width: viewportWidth,
    height: viewportHeight * 9.5 / 12,
    backgroundColor: "#ffffff"
  },
  minicardContainer: {
    flex: 1
  },
  titleContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "center"
  },
  cardContentContainer:{
	flex:9.3,
	justifyContent: "center",
	borderWidth: 4,
    borderColor: "red",
    borderStyle: "dashed",
    borderRadius: 10
  },
  topicTitleText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
    textShadowRadius: 5,
    textShadowOffset: { width: 2, height: 2 }
  },
  topicMessageScrollView: {
    minHeight: viewportHeight * 1 / 2,
    padding: 12,
  },
  imageContainer: {
    flex: 0.4,
	alignItems:'center',
	justifyContent:'center',
  },
  messageContainer: {
    flex: 0.52,
  },
  buttonContainer: {
    width: viewportWidth,
    height: viewportHeight / 12,
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center"
  },
  backgroundVideo: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width:viewportWidth - 10,
    height:180
  }
});
