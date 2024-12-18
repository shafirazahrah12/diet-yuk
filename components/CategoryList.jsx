import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { useRouter } from 'expo-router'

export default function CategoryList({ categoryList = [] }) {

  const router = useRouter();
  const onCategoryClick = (category) => {
    router.push({
      pathname: '/category-details',
      params: {
        categoryId: category.id
      }
    })
  }

  const calculateTotalCalories = (categoryItems) => {
    let totalCalories = 0;
    categoryItems.forEach(item => {
      totalCalories = totalCalories + item.calories;
    })
    return totalCalories;
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        marginBottom: 15,
      }}>Latest Calories</Text>
      <View>
        {categoryList.map((category, index) => (
          <TouchableOpacity key={index} style={styles.container}
            onPress={() => onCategoryClick(category)}
          >
            <View style={styles.iconContainer}>
              <Text style={[styles.iconText, { backgroundColor: category?.color }]}>
                {category.icon}</Text>
            </View>
            <View style={styles.subContainer}>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
                <Text style={styles.itemCount}>{category?.CategoryItems?.length} Items</Text>
              </View>
              <Text style={styles.totalAmountText}>{calculateTotalCalories(category.CategoryItems)} cal</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  iconText: {
    fontSize: 35,
    padding: 15,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  itemCount: {
    fontSize: 15,
    fontFamily: 'outfit-regular',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  totalAmountText: {
    fontSize: 17,
    fontFamily: 'outfit-bold',
  }
})