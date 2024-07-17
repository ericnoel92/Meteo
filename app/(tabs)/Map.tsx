import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Linking, ImageBackground, ImageSourcePropType } from 'react-native';

interface State {
  modalVisible: boolean;
  selectedImage: ImageSourcePropType | null;
  selectedUrl: string | null;
}

export default class Map extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedImage: null,
      selectedUrl: null,
    };
  }

  openImage = (image: ImageSourcePropType, url: string): void => {
    this.setState({ modalVisible: true, selectedImage: image, selectedUrl: url });
  };

  closeImage = (): void => {
    this.setState({ modalVisible: false, selectedImage: null, selectedUrl: null });
  };

  render() {
    return (
      <ImageBackground
        source={require('@/assets/images/New-york-et-boston.png')} // Remplacez par le chemin de votre image de fond
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Découvrez les cartes des villes suivantes !
          </Text>

          <View style={styles.cityContainer}>
            <Text style={styles.cityTitle}>New York</Text>
            <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/Carte-de-new-york.png'), 'https://www.bing.com/maps?q=Carte+de+new+york+2024+url&FORM=HDRSC7&cp=40.711049%7E-74.006573&lvl=9.4')}>
              <Text style={styles.link}>Carte de New York</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/métro-de-new-york.png'), 'https://www.cnewyork.net/bons-plans/transports/transports-carte-metro-new-york/')}>
              <Text style={styles.link}>Métro de New York</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cityContainer}>
            <Text style={styles.cityTitle}>Boston</Text>
            <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/Carte-de-boston.png'), 'https://www.bing.com/maps?q=carte+de+boston+2024+avec+url&FORM=HDRSC7&cp=42.348946%7E-71.064442&lvl=11.0')}>
              <Text style={styles.link}>Carte de Boston</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/boston-metro.png'), 'https://www.mbta.com/schedules/subway')}>
              <Text style={styles.link}>Métro de Boston</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openImage({ uri: 'https://www.bing.com/maps?q=carte+de+boston+2024+avec+url&FORM=HDRSC7&cp=42.348946%7E-71.064442&lvl=11.0' }, 'https://www.mbta.com/fares/charliecard')}>
              <Text style={styles.link}>Info Charlie Card</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={this.closeImage}
          >
            <View style={styles.modalContainer}>
              {this.state.selectedImage && (
                <Image source={this.state.selectedImage} style={styles.image} />
              )}
              {this.state.selectedUrl !== null && (
                <TouchableOpacity onPress={() => Linking.openURL(this.state.selectedUrl!)} style={styles.viewOnlineButton}>
                  <Text style={styles.viewOnlineText}>Voir en ligne</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={this.closeImage} style={styles.closeButton}>
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
  image: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
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
