import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

// Définir les types
type GeoapifyFeature = {
  properties: {
    place_id: string;
    name: string;
    address_line1: string;
  };
};

type GeoapifyResponse = {
  features: GeoapifyFeature[];
};

const API_KEY = 'e1fd35e351114de2b18a710074b7483b'; // Remplacez par votre clé API

const ActivitesEtAttractions: React.FC = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<GeoapifyFeature[]>([]);

  const searchPlaces = async () => {
    if (!location) {
      Alert.alert("Erreur", "Veuillez entrer une ville ou un pays.");
      return;
    }

    try {
      console.log(`Recherche pour la localisation: ${location}`);
      const response = await fetch(
        `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=rect:11.573106549898483,48.13898913611139,11.57704581350751,48.13666585409989&limit=20&apiKey=${API_KEY}`
      );
      const data: GeoapifyResponse = await response.json();
      console.log('Données reçues de l\'API:', data);

      if (data.features) {
        setResults(data.features);
      } else {
        Alert.alert("Erreur", "Aucun résultat trouvé.");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      Alert.alert("Erreur", "Erreur lors de la récupération des données.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rechercher une ville ou un pays</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez une ville ou un pays"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Rechercher" onPress={searchPlaces} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.properties.place_id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.properties.name}</Text>
            <Text style={styles.address}>{item.properties.address_line1}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
});

export default ActivitesEtAttractions;
