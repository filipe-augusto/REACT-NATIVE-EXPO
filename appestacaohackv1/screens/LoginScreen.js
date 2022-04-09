import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { MyButton, MyTextInput, MyPasswordInput } from '../components'

import { Colors, Metrics } from '../values'

export default props => {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin(){
    
    // consitencias
    if(email == ''){
      alert('Preencha o E-mail')
      return
    } else if(senha == ''){
      alert('Preencha a senha')
      return
    }

    try {
      // recuperar o cadastro do usuário
      const cadastro = await AsyncStorage.getItem(email.toLowerCase())

      // converte JSON
      const usuario = JSON.parse(cadastro)
      if(usuario == null){
        alert('Usuário não localizado')       

      } else if(senha == usuario.senha){
        // console.log(Object.keys(props))

        // navegar para a tela de perfil
        props.navigation.reset(
          {
            index: 0,
            routes: [ { name: 'PerfilScreen', params: { email: email } } ]
          }
        )

      } else {
        alert('Usuário ou senha inválido!')
      }
      
    } catch(err){
      console.log(err)
    }


  }

  return(
    <View style={ Estilo.container }> 

      <View style={ Estilo.containerLogin }> 
      
        <View style={ Estilo.containerLogoCellep }> 

          <Image source={ require('../assets/logo_cellep.png') } />
        
        </View>

        <MyTextInput 
            placeholder='E-mail'
            keyboardType="email-address"
            style={ Estilo.formItem }
            value={email}
            onChangeText={ text => setEmail(text) }
        />

        <MyPasswordInput 
            placeholder='Senha'
            keyboardType='numeric'
            style={ Estilo.formItem }
            value={senha}
            onChangeText={ text => setSenha(text) }
        />

        <MyButton title="Entrar" 
                  style={ Estilo.formItem }
                  onPress={fazerLogin}
        />

        <View style={ Estilo.containerCadastro }> 
          <Text style={ Estilo.cadastroText }> 
            Não tem cadastro?
          </Text>
          <TouchableOpacity onPress={ () => props.navigation.navigate('CadastroScreen') }> 
            <Text style={ Estilo.cadastroButtonText }> 
              Clique aqui
            </Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={ Estilo.containerLogoEH }> 
        <Image source={ require('../assets/logo_estacao_hack.png') }
               style={ Estilo.logoEH }
        />
      </View>


    </View>
  )
}

const Estilo = StyleSheet.create(
  {
    container: {
      flexGrow: 1,
      backgroundColor: Colors.background,
      padding: Metrics.padding.base
    },
    containerLogoCellep: {
      alignItems: 'center',
      marginBottom: Metrics.margin.base
    },
    formItem: {
      marginBottom: Metrics.margin.base
    },
    containerCadastro: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    cadastroText: {
      color: Colors.white
    },
    cadastroButtonText:{
      color: Colors.primary,
      fontWeight: 'bold',
      paddingLeft: Metrics.padding.small
    },
    logoEH: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
    },
    containerLogoEH: {
      alignItems: 'flex-end'
    },
    containerLogin:{
      flexGrow: 1,
      justifyContent: 'center'
    }
  }
)