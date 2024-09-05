import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const API_URL = 'http://192.168.1.27:3000'; // Assurez-vous que l'API est accessible

const ConnexionPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');
  const [showResetForm, setShowResetForm] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [resetToken, setResetToken] = useState<string | null>(null);

  // Fonction pour afficher/masquer le formulaire de réinitialisation
  const toggleResetForm = () => {
    setShowResetForm(prevState => !prevState);
    setResetEmail('');
    setNewPassword('');
    setResetToken(null);
  };

  // Fonction pour gérer la connexion
  const handleSubmit = async () => {
    if (email && motDePasse) {
      try {
        console.log('Tentative de connexion avec:', { email, motDePasse });

        const response = await fetch(`${API_URL}/connexion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, mot_de_passe: motDePasse }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Réponse de l\'API:', data);
          Alert.alert('Connexion réussie', 'Vous êtes maintenant connecté.');
          setEmail('');
          setMotDePasse('');
          // navigation.navigate('Home'); // Naviguer vers la page d'accueil ou une autre page après la connexion
        } else {
          const errorData = await response.json();
          console.error('Erreur lors de la connexion:', response.status, errorData);
          Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };

  // Fonction pour gérer la demande de réinitialisation du mot de passe
  const handleResetRequest = async () => {
    if (resetEmail) {
      try {
        const response = await fetch(`${API_URL}/motdepasse/oublié`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: resetEmail }),
        });

        if (response.ok) {
          Alert.alert('Succès', 'Un email de réinitialisation a été envoyé.');
          setResetEmail('');
        } else {
          const errorData = await response.json();
          Alert.alert('Erreur', errorData.error || 'Une erreur est survenue.');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la demande de réinitialisation.');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez entrer votre email');
    }
  };

  // Fonction pour gérer la réinitialisation du mot de passe
  const handlePasswordReset = async () => {
    if (newPassword && resetToken) {
      try {
        const response = await fetch(`${API_URL}/motdepasse/reinitialiser/${resetToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mot_de_passe: newPassword }),
        });

        if (response.ok) {
          Alert.alert('Succès', 'Mot de passe réinitialisé avec succès.');
          setNewPassword('');
          setResetToken(null);
          setShowResetForm(false);
        } else {
          const errorData = await response.json();
          Alert.alert('Erreur', errorData.error || 'Une erreur est survenue.');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la réinitialisation du mot de passe.');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez entrer un nouveau mot de passe');
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

      <Button
        title={showResetForm ? "Annuler" : "Mot de passe oublié ?"}
        onPress={toggleResetForm}
      />

      {showResetForm && (
        <View style={styles.resetContainer}>
          <Text style={styles.title}>Réinitialisation du Mot de Passe</Text>
          {!resetToken ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email pour réinitialisation"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
              />
              <Button title="Envoyer Email de Réinitialisation" onPress={handleResetRequest} />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nouveau Mot de Passe"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <Button title="Réinitialiser Mot de Passe" onPress={handlePasswordReset} />
            </>
          )}
        </View>
      )}
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
  resetContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default ConnexionPage;
