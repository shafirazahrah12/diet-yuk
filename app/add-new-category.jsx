import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { create } from './../node_modules/@types/istanbul-reports/index.d';
import { supabase } from './../utils/SupabaseConfig';
import { client } from './../utils/KindeConfig';
import { useRouter } from 'expo-router';

export default function addNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState();
  const [totalCalories, setTotalCalories] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const onCreateCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    const { data, error } = await supabase.from('Category')
      .insert([{
        name: categoryName,
        assigned_calories: totalCalories,
        icon: selectedIcon,
        color: selectedColor,
        created_by: user.email,
      }]).select();
    console.log(data);
    if (data) {
      router.replace({
        Pathname: '/category-details',
        params: {
          categoryId: data[0].id
        }
      })
      setLoading(false);
      ToastAndroid.show('Category Created!', ToastAndroid.SHORT);
    }
    if (error) {
      setLoading(false);
    }
  }

  return (
    <View style={{
      marginTop: 20,
      padding: 20,
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >{selectedIcon}</TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/* Add Category name and Total Calories Section */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Category Name'
          onChangeText={(v) => setCategoryName(v)}
          style={{ width: '100%', fontSize: 18 }} />
      </View>

      <View style={styles.inputView}>
        <FontAwesome5 name="running" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Total Calories'
          onChangeText={(v) => setTotalCalories(v)}
          keyboardType='numeric'
          style={{ width: '100%', fontSize: 18 }} />
      </View>

      <TouchableOpacity style={styles.button}
        disabled={!categoryName || !totalCalories || loading}
        onPress={() => onCreateCategory()}
      >
        {
          loading ?
            <ActivityIndicator size={'small'} color={Colors.WHITE} /> :
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'outfit',
              color: Colors.WHITE,
            }}>Create</Text>
        }
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 50,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE,
  },
  inputView: {
    alignItems: 'center',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    marginTop: 30,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: 30,
  }
})