import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, Image } from 'react-native';
import Botao from './components/Botao';
import CampoDeTexto from './components/CampoDeTexto';
import TelaDoResultado from './components/TelaDoResultado';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default () => {
  var [resultado, setResultado] = useState();
  var [valorImc, setValorImc] = useState();

  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  function calcular() {
    var alturaCorreta = altura.replace(',', '.');
    let imc = peso / (alturaCorreta * alturaCorreta);
    setValorImc(imc);
    if (alturaCorreta > 2.6) {
      setResultado('ALTURA INVALIDA!');
      return;
    }
    if (peso > 450) {
      setResultado('PESO INVALIDA!');
      return;
    }

    if (imc <= 16) {
      setResultado('Muito abaixo do peso. IMC: ' + Math.round(imc));
    } else if (imc <= 17) {
      setResultado('Moderadamente abaixo do peso. IMC: ' + Math.round(imc));
    } else if (imc <= 18.5) {
      setResultado('Abaixo do peso. IMC: ' + Math.round(imc));
    } else if (imc <= 25) {
      setResultado('Saudavel. IMC: ' + Math.round(imc));
    } else if (imc <= 30) {
      setResultado('Sobrepeso. IMC: ' + Math.round(imc));
    } else if (imc <= 35) {
      setResultado('Obesidade Grau 1°. IMC: ' + Math.round(imc));
    } else if (imc <= 40) {
      setResultado('Obesidade Grau 2°. IMC: ' + Math.round(imc));
    } else {
      setResultado('Obesidade Grau 3°. IMC: ' + Math.round(imc));
    }
  }

  return (
    <View style={Estilo.container} value>
      <View style={Estilo.containerIcon}>
        <MaterialCommunityIcons name="weight-lifter" size={100} color="#442b48" />
      </View>
      <CampoDeTexto
        style={Estilo.formItem}
        placeholder="Altura"
        valeu={altura}
        onChangeText={(text1) => setAltura(text1)}
      />
      <CampoDeTexto
        style={Estilo.formItem}
        placeholder="Peso"
        valeu={peso}
        onChangeText={(text) => setPeso(text)}
      />
      <Botao
        style={Estilo.botao}
        title="Calcular IMC"
        onPress={() => calcular(altura, peso)}
      />

      <TelaDoResultado value={resultado} />
      <View style={Estilo.containerImg}>
        <Image
          source={
            valorImc <= 18
              ? require('./imgs/a1.PNG')
              : (valorImc > 18) & (valorImc <= 25)
              ? require('./imgs/a2.PNG')
              : (valorImc > 25) & (valorImc <= 30)
              ? require('./imgs/a3.PNG')
              : (valorImc > 30) & (valorImc <= 40)
              ? require('./imgs/a4.PNG')
              : (valorImc > 40)
              ? require('./imgs/a5.PNG')
              : null
          }
          style={Estilo.img}
        />
      </View>
    </View>
  );
};

const Estilo = StyleSheet.create({
  container: {
    flexGrow: 1,
    //backgroundColor: '#50c9ce',
    
    padding: 10,
    textAlign: 'center',
  },
  botao: {
    marginBottom: 55,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  formItem: {
    marginBottom: 20,
  },
  containerImg: {
    alignItems: 'center',
  }
});
