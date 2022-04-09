import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default props=>{

return(
<View style={Estilo.display}>
<Text style={Estilo.displayText} >
{props.value}
</Text>
</View>
)
}


const Estilo = StyleSheet.create({

display:{
  flexGrow: 1,
 // backgroundColor: '#50c9ce'
 backgroundColor: 'white'
},
displayText:{
 marginTop:8, 
fontSize:22,
color: '#442b48',
}
})