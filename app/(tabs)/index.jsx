import { View, Text, StyleSheet, Button, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../../utils/services'
import { client } from '../../utils/KindeConfig'
import { supabase } from '../../utils/SupabaseConfig'
import Header from '../../components/Header'
import Colors from '../../utils/Colors'
import CircularChart from '../../components/CircularChart'
import Ionicons from '@expo/vector-icons/Ionicons';
import addNewCategory from '../add-new-category'
import CategoryList from '../../components/CategoryList'

export default function Home() {

  const router = useRouter();
  const [categoryList, setCategoryList] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshState, setRefreshState] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkUserAuth();
      await getCategoryList();
    };
    init();
  }, [])

  // to check user already auth or not
  const checkUserAuth = async () => {
    // Check if user is authenticated
    const result = await services.getData('login');
    if (result !== 'true') {
      router.replace('/login');
    }
    console.log("Result: ", result)
  };

  const handleRefresh = () => {
    setRefreshState(!refreshState);
    getCategoryList();
  };

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData('login', 'false')
      router.replace('/login');
      // User was logged out
    }
  };

  const getCategoryList = async () => {
    setLoading(true);
    try {
      const user = await client.getUserDetails();
      const { data, error } = await supabase.from('Category')
        .select('*,CategoryItems(*)')
        .eq('created_by', user.email)

      if (data) {
        setCategoryList(data)
      }
    } catch (error) {
      console.error("Error fetching category list: ", error);
    } finally {
      setLoading(false);
    }
    console.log("Data", data);
    setCategoryList(data);
    data
  }

  return (
    <View style={{
      marginTop: 20,
      flex: 1,
    }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={loading}
          />
        }
      >
        <View style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: 150
        }}>
          <Header />
        </View>
        <View style={{
          padding: 20,
          marginTop: -75,
        }}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>

      </ScrollView>
      <Link href={'/add-new-category'} style={styles.addBtnContainer}>
        <Ionicons name="add-circle" size={64} color={Colors.PRIMARY} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'blue',
    fontSize: 30
  },
  addBtnContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  }
})