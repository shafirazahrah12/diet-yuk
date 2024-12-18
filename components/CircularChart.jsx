import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CircularChart({ categoryList = [] }) {
  const widthAndHeight = 150;
  const [values, setValues] = useState([]);
  const [sliceColor, setSliceColor] = useState([]);
  const [totalCalculateEstimate, setTotalCalculateEstimate] = useState(0);

  useEffect(() => {
    updateCircularChart();
  }, [categoryList]); // Jalankan saat categoryList diperbarui

  const updateCircularChart = () => {
    let totalEstimate = 0;

    if (!categoryList || categoryList.length === 0) return; // Cegah error jika categoryList kosong

    let newValues = [];
    let newSliceColors = [];

    categoryList.forEach((item) => {
      let itemTotalCalories = 0;
      item.CategoryItems?.forEach((item_) => {
        itemTotalCalories += item_.calories || 0;
        totalEstimate += item_.calories || 0;
      });

      // Tambahkan nilai total dan warna kategori ke array
      newValues.push(itemTotalCalories);
      newSliceColors.push(item.color || Colors.GRAY);
    });

    setTotalCalculateEstimate(totalEstimate);
    setValues(newValues);
    setSliceColor(newSliceColors);
  };

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit',
      }}>Total Estimate Calories: <Text style={{ fontFamily: 'outfit-bold' }}>{totalCalculateEstimate} cal</Text></Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values.length ? values : [1]} // Tampilkan default jika kosong
          sliceColor={sliceColor.length ? sliceColor : [Colors.GRAY]} // Warna default
          coverRadius={0.65}
          coverFill={'#FFF'}
        />

        {categoryList?.length == 0 ? <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
          <Text style={{ fontFamily: 'outfit' }}>NA</Text>
        </View>
          : <View>
            {categoryList.map((category, index) => (
              <View key={index} style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={category.color} />
                <Text style={{ fontFamily: 'outfit' }}>{category.name}</Text>
              </View>
            ))}
          </View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: Colors.WHITE,
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },
  subContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  },
});
