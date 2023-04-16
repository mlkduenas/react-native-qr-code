import React from 'react'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import BotaoFlutuante from '../components/BotaoFlutuante'
import themes from '../themes'

export default function Home({navigation}){
    return (
        <View style={styles.container}>
          <View style={styles.logo_fundo}>   
            <Text style={styles.texto}>SCAN<Text style={styles.subtexto}>dinavia</Text></Text>
            </View>
            <Image
              source={require('../../assets/viking128px.png')}
              style={styles.button}
            />
            <BotaoFlutuante onPress={()=> navigation.navigate("Scanner")}
                            icon="qrcode-scan" size={100} style={styles.button}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themes.colors.brand.roxoClaro,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo_fundo: {
      backgroundColor: themes.colors.brand.roxoEscuro,
      padding: 10,
      borderRadius: 16
    },
      data: {
      fontSize: 20,
      marginVertical: 10,
      alignSelf: 'center'
    },
      texto: {
      //color: '#b7444e',
      color: '#e2e6e7',
      fontSize: 30,
      fontWeight: 800,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    subtexto: {
      color: themes.colors.brand.roxoClaro,
      fontSize: 30,
      fontWeight: 800,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    button: {
        //position: 'absolute',
        margin: 50,
        //borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
  });
