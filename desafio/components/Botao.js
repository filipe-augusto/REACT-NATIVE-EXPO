import React from 'react'
import {TouchableHighlight, Text, StyleSheet, Dimensions} from 'react-native'

export default props=>{

const {style, ...rest } = props
const styleButton =  [Estilo.button]


return(
  <TouchableHighlight  {...rest} >
<Text  style={styleButton} >
{props.title}
</Text>
  </TouchableHighlight>
)
}


const Estilo = StyleSheet.create({
  button:{
    fontSize:32,
    backgroundColor:'#442b48',
   //  backgroundColor:'#98b06f',
    //
    textAlign: 'center',
    borderWidth: 1,
    borderColor:'white',
    padding:5,
    color:'white'
  }
})