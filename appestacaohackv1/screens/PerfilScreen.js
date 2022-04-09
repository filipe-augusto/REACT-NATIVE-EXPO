import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Metrics, Colors, Fonts } from '../values'

import { MyButton } from '../components'

// icons
import { MaterialIcons } from '@expo/vector-icons';

export default props => {
  // console.log(Object.keys(props))
  // console.log(Object.keys(props.route.params))
  // console.log(props.route.params)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [continente, setContinente] = useState('')

  useEffect( () => {
    carregarInformacoes()
  })

  async function carregarInformacoes(){
    try{
      const cadastro = await AsyncStorage.getItem(props.route.params.email)

      // converter JSON
      const usuario = JSON.parse(cadastro)

      setNome(`${usuario.nome} ${usuario.sobrenome}`)
      setEmail(usuario.email)
      setContinente(usuario.continente)

    } catch(err) {
      console.log(err)
    }
  }

  function confirmExit(){
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Sim',
        onPress(){
          props.navigation.reset({
            index: 0,
            routes: [ {name: 'LoginScreen'} ]
          })
        }
      }, {
        text: 'Não'
      }
    ])
  }

  return(
    <View style={ Estilo.container }> 

      <Text style={ Estilo.textTitle }> 
        Seja Bem Vindo(a)
      </Text>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="perm-identity" size={24} color={ Colors.white } />
        <Text style={ Estilo.text }> 
          {nome}
        </Text>
      </View>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="mail-outline" size={24} color={ Colors.white } />
        <Text style={ Estilo.text }> 
          {email}
        </Text>
      </View>

      <View style={ Estilo.containerIconText }> 
        <MaterialIcons name="language" size={24} color={ Colors.white } />
        <Text style={ Estilo.text }> 
          {continente}
        </Text>
      </View>

      <MyButton style={ Estilo.button }
                title="Site Cel.Lep"
                onPress={ () => props.navigation.navigate('WebScreen') }
      />

      <MyButton style={ Estilo.button }
                title="Sair"
                onPress={confirmExit}
      />


    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      justifyContent: 'center',
      padding: Metrics.padding.base
    },
    textTitle: {
      fontSize: Fonts.title,
      color: Colors.white,
      marginBottom: Metrics.margin.base
    },
    containerIconText:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    text: {
      fontSize: Fonts.base,
      color: Colors.white,
      marginLeft: Metrics.margin.small
    },
    button: {
      marginBottom: Metrics.margin.base
    }
  }
)