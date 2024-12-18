import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors'
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { supabase } from '../utils/SupabaseConfig';

export default function CourseItemList({ categoryData, setUpdateRecord }) {
  const [expandItem, setExpandItem] = useState();
  const onDeleteItem = async (id) => {
    const { error } = await supabase.from('CategoryItems')
      .delete()
      .eq('id', id);

    ToastAndroid.show('Item Deleted', ToastAndroid.SHORT);
    setUpdateRecord(true)
  }

  const openURL = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index) => (
          <>
            <View key={index}>
              <TouchableOpacity style={styles.itemContainer}
                onPress={() => setExpandItem(index)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.url} numberOfLines={2}>{item.url}</Text>
                </View>
                <Text style={styles.calories}>{item.calories} cal</Text>
              </TouchableOpacity>
              {expandItem == index &&
                <View style={styles.actionItemContainer}>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                  </TouchableOpacity>
                </View>
              }
            </View>

            {categoryData?.CategoryItems.length - 1 != index &&
              <View style={{
                borderWidth: 0.5,
                borderColor: Colors.GRAY,
                marginTop: 10
              }}>
              </View>
            }
          </>
        )) :
          <Text style={styles.noItemText}>No Item Found</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  url: {
    fontSize: 15,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
  calories: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
  },
  noItemText: {
    marginTop: 140,
    fontSize: 45,
    fontFamily: 'outfit-bold',
    color: Colors.GRAY,
    textAlign: 'center',
  },
  actionItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    marginTop: 10,
  }
})