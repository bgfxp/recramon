import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../scripts/appContext';

const TelaPrevisao = () => {
    const { cidade } = useContext(AppContext);
    const [tempo, setTempo] = useState(null);
    const [erro, setErro] = useState(null);

    const obterPrevisaoDoTempo = async () => {
        try {
            const resposta = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=bddbeed6a893cf7d820e74ae7f9cb95e&units=metric`);
            const dados = await resposta.json();
            if (resposta.ok) {
                setTempo(dados);
            } else {
                setErro(dados.message);j
            }
        } catch (err) {
            setErro('Erro ao obter dados da API');
        }
    };

    useEffect(() => {
        obterPrevisaoDoTempo(); 
    }, []); 

    return (
        <View style={styles.container}>
            {tempo ? (
                <View style={styles.tempoView}>
                    <Text style={styles.texto}>Cidade: {tempo.name}</Text>
                    <Text style={styles.texto}>Temperatura: {tempo.main.temp}°C</Text>
                    <Text style={styles.texto}>Velocidade do Vento: {tempo.wind.speed} m/s</Text>
                    <Text style={styles.texto}>Umidade: {tempo.main.humidity}%</Text>
                    <Text style={styles.texto}>Clima: {tempo.weather[0].description}</Text>
                </View>
            ) : erro ? (
                <Text style={styles.textoErro}>{erro}</Text>
            ) : (
                <Text style={styles.texto}>Carregando...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 50,
    },
    tempoView: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 18,
        marginVertical: 5,
    },
    textoErro: {
        fontSize: 18,
        color: 'red',
    },
});

export default TelaPrevisao;
