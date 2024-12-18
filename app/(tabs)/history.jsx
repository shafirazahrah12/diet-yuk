import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../utils/Colors';
import { supabase } from '../../utils/SupabaseConfig';

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('History')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setHistoryData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDate}>{new Date(item.date).toDateString()}</Text>
        <Text style={styles.itemCalories}>{item.calories} Calories</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : historyData.length > 0 ? (
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No history data found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.CARD,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  itemDate: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 4,
  },
  itemCalories: {
    fontSize: 16,
    color: Colors.PRIMARY,
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.ERROR,
    textAlign: 'center',
    marginTop: 20,
  },
});
