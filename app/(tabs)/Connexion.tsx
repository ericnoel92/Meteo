import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConnexionPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.56:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }
      const data = await response.json();
      Alert.alert('Connexion réussie', 'Vous êtes maintenant connecté.');
      setEmail(''); // Réinitialisation du champ email
      setMotDePasse(''); // Réinitialisation du champ mot de passe
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleSubmit} disabled={!email || !motDePasse} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ConnexionPage;
