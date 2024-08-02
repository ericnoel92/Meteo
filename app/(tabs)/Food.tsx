import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking, ImageBackground } from 'react-native';

interface State {
  modalVisible: boolean;
  selectedUrl: string | null;
}

export default class Food extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedUrl: null,
    };
  }

  openLink = (url: string): void => {
    this.setState({ modalVisible: true, selectedUrl: url });
  };

  closeModal = (): void => {
    this.setState({ modalVisible: false, selectedUrl: null });
  };

  render() {
    return (
      <ImageBackground
        source={require('@/assets/images/Food.png')} // Remplacez par le chemin de votre image de fond
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Découvrez des restaurants rapport qualité/prix dans les villes suivantes !
          </Text>

          <View style={styles.cityContainer}>
            <Text style={styles.cityTitle}>New York</Text>
            <TouchableOpacity onPress={() => this.openLink('https://locations.dunkindonuts.com/en/ny/new-york')}>
              <Text style={styles.link}>Dunkin' Donuts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.katzsdelicatessen.com/')}>
              <Text style={styles.link}>Katz's Delicatessen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.lombardispizza.com/')}>
              <Text style={styles.link}>Lombardi's Pizza</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.mcdonalds.com/us/en-us/location/ny/new-york/10003/2019-broadway.html')}>
              <Text style={styles.link}>McDonald's</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cityContainer}>
            <Text style={styles.cityTitle}>Paris</Text>
            <TouchableOpacity onPress={() => this.openLink('https://www.cafedeflore.fr/')}>
              <Text style={styles.link}>Café de Flore</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.lasacre.com/')}>
              <Text style={styles.link}>Le Relais de l'Entrecôte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.lescocottesdeconstant.com/')}>
              <Text style={styles.link}>Les Cocottes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cityContainer}>
            <Text style={styles.cityTitle}>Boston</Text>
            <TouchableOpacity onPress={() => this.openLink('https://locations.dunkindonuts.com/en/ma/boston')}>
              <Text style={styles.link}>Dunkin' Donuts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.legalharborside.com/')}>
              <Text style={styles.link}>Legal Harborside</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openLink('https://www.mcdonalds.com/us/en-us/location/ma/boston/02116/146-146a-tremont-st.html')}>
              <Text style={styles.link}>McDonald's</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={this.closeModal}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => Linking.openURL(this.state.selectedUrl!)} style={styles.viewOnlineButton}>
                <Text style={styles.viewOnlineText}>Voir en ligne</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch' selon vos besoins
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff', // Optionnel: Changez la couleur du texte pour améliorer la lisibilité sur le fond
  },
  cityContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optionnel: Ajoutez une couleur de fond avec opacité pour une meilleure lisibilité
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Optionnel: Changez la couleur du texte pour une meilleure lisibilité
  },
  link: {
    fontSize: 16,
    color: '#000000', // Optionnel: Changez la couleur des liens pour une meilleure lisibilité
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  viewOnlineButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    elevation: 2,
  },
  viewOnlineText: {
    fontSize: 16,
    color: '#0066cc',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
});
