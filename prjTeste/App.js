import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import './App.css';

const somar = (num1, num2) => {
  return (
    <Text>Resultado de {num1} + {num2} = {num1 + num2}</Text>
  );
}

const Componente = param => {

  const [genero, setGenero] = useState(true);

  return (
    <View style={{ margin: 15, padding: 15, borderWidth: 5, borderColor: '#e72222', backgroundColor: '#ffffbb', width: '50%' }}>

      <Text style={{ fontFamily: 'Comic Sans MS', fontSize: 25 }}>Componente Child</Text>

      <Text>Oi meu nome é {param.nome}, idade {param.idade}!</Text>

      <Text>Eu sou {genero ? 'homem' : 'mulher'}</Text>

      <Button onPress={() => { setGenero(!genero); }} title={genero ? 'Quero ser Mulher' : 'Quero ser Homem'} />

      <TextInput style={{ margin: 5, padding: 5, backgroundColor: '#ff5555' }} placeholder='Digite algo' />

      <Text>{somar(2, 2)}</Text>
    </View>
  );

};

const Componente2 = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', width: '50%' }}>
      <Text style={{ fontSize: 35 }}>Componente Parent</Text>
      <Componente nome="A" idade="21" />
      <Componente nome="B" idade="15" />
      <Componente nome="C" />
      <Componente nome="D" idade="5" />
      <Componente nome="E" />
      <Componente idade="24" />
    </View>
  );

};

export default Componente2;