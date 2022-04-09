import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'

import { Picker } from '@react-native-picker/picker'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Metrics, Colors } from '../values'

import { MyButton, MyTextInput, MyPasswordInput } from '../components'

// icons
import { MaterialIcons } from '@expo/vector-icons';

export default props => {

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [continente, setContinente] = useState('')
  const [senha, setSenha] = useState('')

  const listaContinentes = [
    'América do Norte',
    'América central',
    'América do Sul',
    'Europa',
    'Ásia',
    'África',
    'Oceania',
    'Antártida'
  ]

  async function cadastrar(){
    // consistencias
    if(nome == '' || sobrenome == '' || email == '' || continente == '' || senha == ''){
      alert('Preencha todos os campos')
      return
    }

    const usuario = {
      nome: nome,
      sobrenome: sobrenome,
      email: email.toLowerCase(),
      senha: senha,
      continente: continente
    }


    // salvar o cadastro
    try{

      const dados = await JSON.stringify(usuario)

      await AsyncStorage.setItem(email, dados)

      props.navigation.reset({
        index: 0,
        routes: [ { name: 'PerfilScreen', params: { email: email } } ]
      })


    } catch(err){
      console.log(err)
    }
  }

  return(
    <ScrollView style={ Estilo.container }> 

      <View style={ Estilo.containerIcon }>
        <MaterialIcons name="person-add" size={100} color={ Colors.white } />
      </View>

      <MyTextInput style={ Estilo.formItem} 
                   placeholder="Nome"
                   valeu={nome}
                   onChangeText={ text => setNome(text) }
      />

      <MyTextInput style={ Estilo.formItem} 
                   placeholder="Sobrenome"
                   valeu={sobrenome}
                   onChangeText={ text => setSobrenome(text) }
      />

      <MyTextInput style={ Estilo.formItem} 
                   placeholder="E-mail"
                   keyboardType="email-address"
                   valeu={email}
                   onChangeText={ text => setEmail(text) }
      />

      <View style={ [ Estilo.formItem, Estilo.containerPiker ] }> 
        <Picker style={ Estilo.piker }
                selectedValue={ continente }
                onValueChange={ (value, index) => setContinente(value) }
        > 
          <Picker.Item value="" label="Continente" />
          {
            listaContinentes.map( (value, index) => (
              <Picker.Item value={value} label={value} />
            ) )
          }

        </Picker>
      </View>

      <MyPasswordInput style={ Estilo.formItem }
                       placeholder="Senha"
                       keyboardType="numeric"
                       valeu={senha}
                        onChangeText={ text => setSenha(text) }
      />

      <MyButton style={ Estilo.formItem }
                title="Cadastrar"
                onPress={cadastrar}
      />

    </ScrollView>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base
    },
    containerIcon: {
      alignItems: 'center'
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerPiker:{
      borderWidth: 1,
      borderRadius: Metrics.radius.base,
      backgroundColor: Colors.white,
      justifyContent: 'center'
    },
    piker:{
      paddingVertical: Metrics.padding.small,
      paddingHorizontal: Metrics.padding.base,
      borderWidth: 0,
      backgroundColor: Colors.white
    }
  }
)