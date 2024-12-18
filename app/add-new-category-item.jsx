import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react';
import Colors from '../utils/Colors';
import { TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import { supabase } from '../utils/SupabaseConfig';
import { useLocalSearchParams, useRouter } from 'expo-router';

const placeholder = 'https://placehold.jp/300x300.png'
export default function addNewCategoryItem() {
  const [image, setImage] = useState(placeholder);

  const [priviewImage, setPriviewImage] = useState(placeholder);
  const { categoryId } = useLocalSearchParams();
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [calories, setCalories] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setPriviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  }

  const onClickAdd = async () => {
    setLoading(true);

    const fileName = Date.now();
    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(fileName + '.png', decode(image), {
        contentType: 'image/png'
      });

    if (data) {
      const fileUrl = "https://xrzqfkunmsncxeapnjly.supabase.co/storage/v1/object/public/images/" + fileName + ".png";
      console.log(fileUrl);

      const { data, error } = await supabase.from('CategoryItems')
        .insert([{
          name: name,
          calories: calories,
          url: url,
          image: fileUrl,
          note: note,
          category_id: categoryId
        }]).select();
      ToastAndroid.show('Item Added Successfully', ToastAndroid.SHORT);
      setLoading(false);
      console.log(data);

      router.replace({
        pathname: '/category-details',
        params: {
          categoryId: categoryId
        }
      })
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image source={{ uri: priviewImage }}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <AntDesign name="tags" size={24} color={Colors.GRAY} />
          <TextInput placeholder='Item Name'
            onChangeText={(value) => setName(value)}
            style={styles.input} />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons name="scale" size={24} color={Colors.GRAY} />
          <TextInput placeholder='Item Calories'
            keyboardType='numeric'
            onChangeText={(value) => setCalories(value)}
            style={styles.input} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="insert-link" size={24} color={Colors.GRAY} />
          <TextInput placeholder='Url'
            onChangeText={(value) => setUrl(value)}
            style={styles.input} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialCommunityIcons name="note-multiple" size={24} color={Colors.GRAY} />
          <TextInput placeholder='Note'
            onChangeText={(value) => setNote(value)}
            style={styles.input}
            numberOfLines={3}
          />
        </View>
        <TouchableOpacity style={styles.button}
          disabled={!name || !calories || loading}
          onPress={() => onClickAdd()}
        >
          {
            loading ?
              <ActivityIndicator size={'small'} color={Colors.WHITE} /> :
              <Text style={{
                textAlign: 'center',
                fontFamily: 'outfit-bold',
                color: Colors.WHITE,
                fontSize: 15,
              }}>ADD</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.GRAY,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.GRAY,
    marginTop: 15,
  },
  input: {
    fontSize: 18,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 17,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 15,
  }
})