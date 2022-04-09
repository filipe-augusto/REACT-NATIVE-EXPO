import React from 'react'
import { TextInput, StyleSheet } from 'react-native'


export default props => {

  const { style, ...rest } = props
  
  return(
    <TextInput style={ [ Estilo.input, style ] } 
              { ...rest }>  
     
    </TextInput>
  )
}

const Estilo = StyleSheet.create(
  {
    input: {
      height: 48,
      borderWidth: 1,
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: 'white'
    }
  }
)