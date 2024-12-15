import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { client } from '../utils/KindeConfig';
import Colors from '../utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  // used to get user data
  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      {/* Bagian kiri: Gambar profil dan teks */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: user?.picture }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
            marginRight: 8,
          }}
        />
        <View>
          <Text style={{
            color: Colors.WHITE,
            fontSize: 16,
            fontFamily: 'outfit',
          }}>
            Welcome,
          </Text>
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 20,
              fontFamily: 'outfit-bold',
            }}>
            {user?.given_name}
          </Text>
        </View>
      </View>

      {/* Icon notifikasi di sebelah kanan */}
      <Ionicons name="notifications" size={24} color={Colors.WHITE} />
    </View>
  );
}
