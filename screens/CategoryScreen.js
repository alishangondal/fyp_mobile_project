import React, { Component } from "react";
import Categorylist from "../components/ProjectComponents/Category/Categorylist";
import { Text, View, StyleSheet } from "react-native";

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View style={{ flex: 1 }}>
        <Categorylist navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
