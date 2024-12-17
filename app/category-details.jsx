import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseInfo from '../components/CourseDetails/CourseInfo'
import CourseItemList from '../components/CourseItemList'

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    console.log("Category ID: ", categoryId)
    categoryId && getCategoryDetails();
  }, [categoryId]);

  const getCategoryDetails = async () => {
    const { data, error } = await supabase.from('Category')
      .select('*,CategoryItems(*)')
      .eq('id', categoryId)
    setCategoryData(data[0]);

    // console.log("Cat:", data)
  }
  return (
    <View style={{
      padding: 20,
      marginTop: 20,
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={45} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItemList categoryData={categoryData} />
    </View>
  )
}