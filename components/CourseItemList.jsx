import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Linking, TextInput } from 'react-native';
import React, { useState } from 'react';
import Colors from '../utils/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { supabase } from '../utils/SupabaseConfig';

export default function CourseItemList({ categoryData, setUpdateRecord }) {
  const [expandItem, setExpandItem] = useState();
  const [editingItem, setEditingItem] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedCalories, setUpdatedCalories] = useState('');
  const [updatedUrl, setUpdatedUrl] = useState('');

  const onDeleteItem = async (id) => {
    const { error } = await supabase
      .from('CategoryItems')
      .delete()
      .eq('id', id);

    ToastAndroid.show('Item Deleted', ToastAndroid.SHORT);
    setUpdateRecord(true);
  };

  const openURL = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const onEditItem = (item) => {
    setEditingItem(item.id);
    setUpdatedName(item.name);
    setUpdatedCalories(item.calories.toString());
    setUpdatedUrl(item.url);
  };

  const onUpdateItem = async (id) => {
    if (!updatedName || !updatedCalories) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }

    const { error } = await supabase
      .from('CategoryItems')
      .update({
        name: updatedName,
        calories: parseInt(updatedCalories),
        url: updatedUrl,
      })
      .eq('id', id);

    if (error) {
      ToastAndroid.show('Update failed', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Item Updated', ToastAndroid.SHORT);
      setEditingItem(null);
      setUpdateRecord(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.CategoryItems?.length > 0 ? (
          categoryData?.CategoryItems?.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => setExpandItem(index)}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.url} numberOfLines={2}>
                    {item.url}
                  </Text>
                </View>
                <Text style={styles.calories}>{item.calories} cal</Text>
              </TouchableOpacity>
              {expandItem == index && (
                <View style={styles.actionItemContainer}>
                  <TouchableOpacity onPress={() => onEditItem(item)}>
                    <Entypo name="edit" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                  </TouchableOpacity>
                </View>
              )}
              {editingItem === item.id && (
                <View style={styles.editForm}>
                  <TextInput
                    style={styles.input}
                    value={updatedName}
                    onChangeText={setUpdatedName}
                    placeholder="Name"
                  />
                  <TextInput
                    style={styles.input}
                    value={updatedCalories}
                    onChangeText={setUpdatedCalories}
                    placeholder="Calories"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={updatedUrl}
                    onChangeText={setUpdatedUrl}
                    placeholder="URL"
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => onUpdateItem(item.id)}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
              {categoryData?.CategoryItems.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: Colors.GRAY,
                    marginTop: 10,
                  }}
                ></View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noItemText}>No Item Found</Text>
        )}
      </View>
    </View>
  );
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
  },
  editForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
});