import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Button, Text, ScrollView, Image, ImageBackground } from 'react-native'; // Importez Image et ImageBackground depuis react-native

interface State {
    city: string;
    weatherData: any | null;
    forecastData: any[] | null;
    errorMessage: string;
    showForecast: boolean;
}

export default class Meteo extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            city: '',
            weatherData: null,
            forecastData: null,
            errorMessage: '',
            showForecast: false
        };
    }

    searchWeather = async () => {
        try {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=249b3f7dd25be43130b503adf5db1c4b`);
            const weatherData = await weatherResponse.json();

            if (weatherData.cod !== 200) {
                throw new Error('Ville non trouvée');
            }

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=249b3f7dd25be43130b503adf5db1c4b`);
            const forecastData = await forecastResponse.json();

            if (forecastData.cod !== "200") {
                throw new Error('Prévisions météo non disponibles');
            }

            this.setState({ weatherData, forecastData: forecastData.list, errorMessage: '' });

        } catch (error) {
            console.error('Erreur lors de la récupération des données météorologiques:', error);
            if ((error as Error).message === 'Ville non trouvée') {
                this.setState({ errorMessage: 'Ville non trouvée', weatherData: null, forecastData: null });
            } else if ((error as Error).message === 'Prévisions météo non disponibles') {
                this.setState({ errorMessage: 'Prévisions météo non disponibles', weatherData: null, forecastData: null });
            } else {
                this.setState({ errorMessage: 'Erreur lors de la récupération des données', weatherData: null, forecastData: null });
            }
        }
    }

    toggleForecast = () => {
        this.setState(prevState => ({
            showForecast: !prevState.showForecast
        }));
    }

    getWeatherImage = (description: string) => {
        if (description.toLowerCase().includes('sunny')) {
            return require('@/assets/images/sunny.png');
        } else if (description.toLowerCase().includes('overcast clouds')) {
            return require('@/assets/images/cloudy.png');
        } else if (description.toLowerCase().includes('clear sky')) {
            return require('@/assets/images/clear-sky.png');
        } else if (description.toLowerCase().includes('scattered clouds')) {
            return require('@/assets/images/scattered-clouds.png');
        } else if (description.toLowerCase().includes('light rain')) {
            return require('@/assets/images/light-rain.png');
        } else if (description.toLowerCase().includes('moderate rain')) {
            return require('@/assets/images/moderate-rain.png');
        } else if (description.toLowerCase().includes('broken clouds')) {
            return require('@/assets/images/broken-clouds.png');
        } else if (description.toLowerCase().includes('light intensity drizzle')) {
            return require('@/assets/images/light-intensity-drizzle.png');
        } else if (description.toLowerCase().includes('few clouds')) {
            return require('@/assets/images/Few-clouds.png'); // Ajoutez l'image pour "few clouds"
        } else {
          //  return require('@/assets/images/default.png'); // Image par défaut si la condition n'est pas gérée
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('@/assets/images/METEO.png')} // Changer le chemin et le nom de l'image selon votre projet
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ city: text })}
                        value={this.state.city}
                        placeholder="Entrez le nom de la ville"
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Rechercher" onPress={this.searchWeather} />
                    </View>
                    {this.state.errorMessage ? (
                        <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                    ) : null}
                    {this.state.weatherData && (
                        <View style={styles.weatherInfoContainer}>
                            <Text style={styles.weatherInfoTitle}>Météo actuelle à {this.state.city} :</Text>
                            <Text style={styles.weatherInfoText}>Température: {this.state.weatherData.main.temp} °C</Text>
                            <Text style={styles.weatherInfoText}>Humidité: {this.state.weatherData.main.humidity} %</Text>
                            <Text style={styles.weatherInfoText}>Conditions: {this.state.weatherData.weather[0].description}</Text>
                            <Image // Utilisation correcte de l'élément Image de react-native
                                source={this.getWeatherImage(this.state.weatherData.weather[0].description)}
                                style={styles.weatherImage}
                                resizeMode="contain" // Ajuster le mode de redimensionnement ici
                            />
                        </View>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button title={this.state.showForecast ? "Cacher les prévisions" : "Prévisions de la semaine"} onPress={this.toggleForecast} />
                    </View>
                    {this.state.showForecast && this.state.forecastData && (
                        <ScrollView style={styles.forecastContainer}>
                            <Text style={styles.weatherInfoTitle}>Prévisions pour la semaine :</Text>
                            {this.state.forecastData.map((forecast: any, index: number) => (
                                <View key={index} style={styles.forecastItem}>
                                    <Text style={styles.forecastItemText}>Date et heure: {forecast.dt_txt}</Text>
                                    <Text style={styles.forecastItemText}>Température: {forecast.main.temp} °C</Text>
                                    <Text style={styles.forecastItemText}>Humidité: {forecast.main.humidity} %</Text>
                                    <Text style={styles.forecastItemText}>Conditions: {forecast.weather[0].description}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        width: '100%',
    },
    buttonContainer: {
        marginBottom: 10,
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
    },
    weatherInfoContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    weatherInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    weatherInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    weatherImage: {
        width: 150, // Ajustez la largeur selon vos besoins
        height: 150, // Ajustez la hauteur selon vos besoins
        resizeMode: 'contain', // Assurez-vous d'utiliser 'contain' pour garder l'image entière visible
        marginBottom: 10,
    },
    forecastContainer: {
        width: '100%',
        marginBottom: 20,
    },
    forecastItem: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    forecastItemText: {
        fontSize: 16,
        marginBottom: 5,
    },
});
