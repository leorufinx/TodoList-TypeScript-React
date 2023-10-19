import React from 'react';
import { Text, TextInput, View } from 'react-native';

const somar = (num1, num2) => {
  return (
    <Text>Resultado de {num1} + {num2} = {num1 + num2}</Text>
  );
}

const Componente = param => {

  return (
    <View style={{margin: 15, padding: 15, borderWidth: 5, borderColor: '#e72222', backgroundColor: '#ffffbb', width: '50%' }}>
      <Text>Oi meu nome é {param.nome}, idade {param.idade}!</Text>
      <TextInput placeholder='Input' />
      <Text>{somar(2, 2)}</Text>
    </View>
  );

};

const Componente2 = () => {

  return (
    <View style={{ backgroundColor: '#bbbbcc', width: '50%' }}>
      <Text>Componente Maior</Text>
      <Componente nome="A" idade="21" />
      <Componente nome="B" idade="15" />
      <Componente nome="C" />
      <Componente nome="D" idade="5" />
      <Componente nome="E" />
      <Componente idade="24" />
      <Componente />
      <Componente />
      <Componente />
    </View>
  );

};

export default Componente2;