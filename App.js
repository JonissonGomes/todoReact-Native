import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native'; 

export default function App(){
  return(
    <SafeAreaView style={styles.box}>
      <StatusBar backgroundColor="#171d33" barStyle="light-content" />
      <Text>Tasks</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#171d33'
  }
})