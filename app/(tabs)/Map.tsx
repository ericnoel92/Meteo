import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ImageSourcePropType } from 'react-native';

interface State {
  modalVisible: boolean;
  selectedImage: ImageSourcePropType | null;
}

export default class Map extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedImage: null,
    };
  }

  openImage = (image: ImageSourcePropType): void => {
    this.setState({ modalVisible: true, selectedImage: image });
  };

  closeImage = (): void => {
    this.setState({ modalVisible: false, selectedImage: null });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Vous cherchez une carte de New York et de son métro ?
          Vous pouvez les télécharger et les utiliser sans wifi.
        </Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/Carte-de-new-york.png'))}>
            <Text style={styles.link}>Carte de New York</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/métro-de-new-york.png'))}>
            <Text style={styles.link}>Métro de New York</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/Carte-de-boston.png'))}>
            <Text style={styles.link}>Carte de Boston</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/boston-metro.png'))}>
            <Text style={styles.link}>Métro de Boston</Text>
          </TouchableOpacity>
          {/* Ajoutez d'autres TouchableOpacity pour d'autres cartes */}
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
            <TouchableOpacity onPress={this.closeImage} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    width: '100%',
    backgroundColor: '#f0f0f0', // Couleur de fond pour simuler weatherInfoContainer
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  linksContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff', // Fond des liens
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});
