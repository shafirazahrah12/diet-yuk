import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig'
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseInfo from '../components/CourseDetails/CourseInfo'
import CourseItemList from '../components/CourseItemList'
import Colors from '../utils/Colors'

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
      flex: 1,
      backgroundColor: Colors.WHITE
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={45} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItemList categoryData={categoryData} />

      <Link href={{
        pathname: '/add-new-category-item',
        params: {
          categoryId: categoryId
        }
      }}
        style={styles.floatingBtn}>
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }
})