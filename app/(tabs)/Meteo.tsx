import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Button, Text, ScrollView } from 'react-native';

interface State {
    city: string;
    weatherData: any | null;
    forecastData: any[] | null;
    errorMessage: string;
    showForecast: boolean; // Ajouter un état pour suivre si les prévisions de la semaine doivent être affichées
}

export default class Index extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            city: '',
            weatherData: null,
            forecastData: null,
            errorMessage: '',
            showForecast: false // Initialiser l'état à false
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

            this.setState({ weatherData, forecastData: forecastData.list, errorMessage: '' });

            if (forecastData.cod !== "200") {
                throw new Error('Prévisions météo non disponibles');
            }

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
            showForecast: !prevState.showForecast // Inverser l'état lorsque le bouton est cliqué
        }));
    }

    render() {
        return (
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
                    <View>
                        <Text>Météo actuelle à {this.state.city} :</Text>
                        <Text>Température: {this.state.weatherData.main.temp} °C</Text>
                        <Text>Humidité: {this.state.weatherData.main.humidity} %</Text>
                        <Text>Conditions: {this.state.weatherData.weather[0].description}</Text>
                    </View>
                )}
                {/* Afficher le bouton pour afficher/cacher les prévisions de la semaine */}
                <View style={styles.buttonContainer}>
                    <Button title={this.state.showForecast ? "Cacher les prévisions" : "Prévisions de la semaine"} onPress={this.toggleForecast} />
                </View>
                {/* Afficher les prévisions de la semaine si l'état showForecast est vrai */}
                {this.state.showForecast && this.state.forecastData && (
                    <ScrollView>
                        <Text>Prévisions pour la semaine :</Text>
                        {this.state.forecastData.map((forecast: any, index: number) => (
                            <View key={index}>
                                <Text>Date et heure: {forecast.dt_txt}</Text>
                                <Text>Température: {forecast.main.temp} °C</Text>
                                <Text>Humidité: {forecast.main.humidity} %</Text>
                                <Text>Conditions: {forecast.weather[0].description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 10,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});

