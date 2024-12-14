import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../utils/services'

export default function Home() {

  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
  }, [])

  // to check user already auth or not

  const checkUserAuth = async () => {
    // Check if user is authenticated
    const result = await services.getData('login');
    if (result !== 'true') {
      router.replace('/login');
    }
    console.log("Result: ", result)
  }

}

const styles = StyleSheet.create({
  text: {
    color: 'blue',
    fontSize: 30
  }
})