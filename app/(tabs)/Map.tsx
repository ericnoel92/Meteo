import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Linking, ImageSourcePropType } from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.title}>
          Découvrez les cartes de New York et de Boston !
        </Text>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/Carte-de-new-york.png'), 'https://www.bing.com/maps?q=Carte+de+new+york+2024+url&FORM=HDRSC7&cp=40.711049%7E-74.006573&lvl=9.4')}>
            <Text style={styles.link}>Carte de New York</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/métro-de-new-york.png'), 'https://www.cnewyork.net/bons-plans/transports/transports-carte-metro-new-york/')}>
            <Text style={styles.link}>Métro de New York</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/Carte-de-boston.png'), 'https://www.bing.com/maps?q=carte+de+boston+2024+avec+url&FORM=HDRSC7&cp=42.348946%7E-71.064442&lvl=11.0')}>
            <Text style={styles.link}>Carte de Boston</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openImage(require('@/assets/images/boston-metro.png'), 'https://www.mbta.com/schedules/subway')}>
            <Text style={styles.link}>Métro de Boston</Text>
          </TouchableOpacity>
          
          {/* Exemple avec une URL externe pour une autre carte */}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  linksContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'gey',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  link: {
    fontSize: 18,
    color: 'red',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  viewOnlineButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    elevation: 2,
  },
  viewOnlineText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});
