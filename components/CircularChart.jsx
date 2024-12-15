import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CircularChart() {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.GRAY])

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit',
      }}>Total Estimate Calories : <Text style={{ fontFamily: 'outfit-bold' }}>0 kal</Text></Text>
      <View style={styles.subContaner}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={'#FFF'}
        />

        <View style={{ flexDirection: 'row', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
          <Text style={{ fontFamily: 'outfit' }}>NA</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: Colors.WHITE,
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },
  subContaner: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  }
})