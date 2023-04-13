import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import BotaoFlutuante from '../components/BotaoFlutuante'

export default function Home({navigation}){
    return (
        <View>
            <Text style={styles.texto}>Menu Principal</Text>
            <BotaoFlutuante onPress={()=> navigation.navigate("Scanner")}
                            icon="qrcode-scan" size={100} style={styles.button}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
      data: {
      fontSize: 20,
      marginVertical: 10,
      alignSelf: 'center'
    },
      texto: {
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    button: {
        position: 'absolute',
        margin: 50,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
  });
