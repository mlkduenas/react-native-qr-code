import React from 'react'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import BotaoFlutuante from '../components/BotaoFlutuante'
import themes from '../themes'

export default function Home({navigation}){
    return (
        <View style={{backgroundColor: themes.colors.brand.verdeClaro}}>  
            <Text style={styles.texto}>SCANdinavia</Text>
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
        //position: 'absolute',
        margin: 50,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
  });
