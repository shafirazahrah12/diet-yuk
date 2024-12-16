import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  useEffect(() => {
    console.log("Category ID: ", categoryId)
  }, [categoryId])
  return (
    <View>
      <Text>category-detail</Text>
    </View>
  )
}