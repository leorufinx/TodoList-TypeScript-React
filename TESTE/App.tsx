import React from 'react';
import { View, Text, TouchableOpacity, Alert, } from 'react-native';
import { css, lightTheme, darkTheme } from './styles';

const MeuComponente: React.FC = () => {

  function toggleTheme() {
    Alert.alert(
      'Título do Alerta',
      'Este é o conteúdo do alerta. Você pode adicionar mais texto aqui.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
        },
        {
          text: 'OK',
          onPress: () => console.log('OK pressionado'),
        },
      ]
    );
  }

  return (
    <View style={css.container}>
      <Text style={css.h1}>Olá, Mundo!</Text>
      <Text style={css.h2}>Esse texto é para teste e está em h2 conforme arquivo de estilos</Text>
      <TouchableOpacity activeOpacity={0.6} onPress={toggleTheme}>
        <Text style={css.btn}>Botão</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MeuComponente;
