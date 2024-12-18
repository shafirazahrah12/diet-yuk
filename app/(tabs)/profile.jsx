import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { client } from './../../utils/KindeConfig';
import Colors from '../../utils/Colors';
import { useRouter } from 'expo-router';

export default function Profile() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  // used to get user data
  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  // used to handle logout
  const handleLogout = async () => {
    try {
      await client.logout();
      alert('You have been logged out.');
      router.replace('/login'); // Navigate to login screen
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Gambar Profil */}
      <Image
        source={{ uri: user?.picture }}
        style={styles.profileImage}
      />

      {/* Nama Pengguna */}
      <Text style={styles.userName}>{user?.given_name} {user?.family_name}</Text>

      {/* Email Pengguna */}
      <Text style={styles.userEmail}>{user?.email}</Text>

      {/* Placeholder untuk informasi tambahan */}
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.additionalInfoTitle}>Additional Info</Text>
        <Text style={styles.additionalInfoText}>This is a placeholder for extra information about the user.</Text>
      </View>

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
    padding: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 24,
  },
  additionalInfoContainer: {
    width: '100%',
    backgroundColor: Colors.CARD,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  additionalInfoText: {
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE
  },
});
