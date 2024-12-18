import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../../utils/Colors';
import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../utils/SupabaseConfig';
import { useRouter } from 'expo-router';

export default function CourseInfo({ categoryData }) {
  const [totalCalories, setTotalCalories] = useState();
  const [percentageTotal, setPercentageTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    categoryData && calculateTotalPercentage();
  }, [categoryData])
  const calculateTotalPercentage = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach(item => {
      total = total + item.calories;
    });
    setTotalCalories(total);
    // console.log("Total:", total);

    let percentage = (total / categoryData.assigned_calories) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    setPercentageTotal(percentage);
    // console.log("Percentage:", percentage);
  }

  const onDeleteCategory = () => {
    Alert.alert('Are you sure??', 'Do you want to delete?', [
      {
        text: 'cancel',
      },
      {
        text: 'yes',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('CategoryItems')
            .delete()
            .eq('category_id', categoryData.id)

          await supabase
            .from('Category')
            .delete()
            .eq('id', categoryData.id)

          ToastAndroid.show('Category Deleted', ToastAndroid.SHORT);
          router.replace('/(tabs)');
        }
      },
    ])
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={[styles.textIcon,
          { backgroundColor: categoryData.color }]}>
            {categoryData.icon}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryName}>{categoryData?.name}</Text>
          <Text style={styles.categoryItem}>{categoryData?.CategoryItems?.length} Item</Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteCategory(categoryData.id)}>
          <Entypo name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {/* Progress Bar */}
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: 'outfit-bold' }}>{totalCalories} cal</Text>
        <Text style={{ fontFamily: 'outfit' }}>Total Calories: {categoryData.assigned_calories}</Text>
      </View>
      <View style={styles.progressBarMainContainer}>
        <View style={[styles.progressBarSubContainer, { width: percentageTotal + '%' }]}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textIcon: {
    fontSize: 35,
    padding: 20,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  categoryName: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
  },
  categoryItem: {
    fontSize: 18,
    fontFamily: 'outfit',
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  progressBarMainContainer: {
    width: '100%',
    height: 15,
    backgroundColor: Colors.GRAY,
    borderRadius: 99,
    marginTop: 7,
  },
  progressBarSubContainer: {
    width: '20%',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    height: 15,
  }
})