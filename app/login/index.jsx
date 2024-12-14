import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import loginBg from './../../assets/images/loginBg.png'
import Colors from './../../utils/Colors'
import { Button } from 'react-native-web'

export default function LoginScreen() {
  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <Image source={loginBg}
        style={styles.bgImage}
      />
      <View style={{
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        height: '100%',
        padding: 20,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.WHITE,
          }}
        >Personal Calories Management</Text>

        <Text style={{
          fontSize: 18,
          textAlign: 'center',
          color: Colors.WHITE,
          marginTop: 20,
        }}>
          Stay on Track, Day by Day: Your Personal Calories Management App!
        </Text>

        <TouchableOpacity style={styles.button}
          onPress={() => console.log("btn Clicked")}
        >
          <Text style={{
            textAlign: 'center',
            color: Colors.PRIMARY,
          }}>
            Login/SignUp
          </Text>
        </TouchableOpacity>
        <Text style={{
          fontSize: 13,
          color: Colors.WHITE,
          marginTop: 10,
        }}>* By login/signup you will agree to our terms and conditions</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    widh: 200,
    height: 400,
    marginTop: 50,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.BLACK
  },

  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 30,
  }
})