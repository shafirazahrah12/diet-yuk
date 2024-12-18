import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'

export default function CourseItemList({ categoryData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index) => (
          <>
            <View key={index}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.url}>{item.url}</Text>
                </View>
                <Text style={styles.calories}>{item.calories} cal</Text>
              </View>
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
  }
})