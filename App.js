import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Linking, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    (async () => {
      const { granted } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(granted);
    })();
  }, []);

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      // const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button title={children} onPress={handlePress} />;
  };

  const handleBarCodeScanned = ({ type, data }) => {
    (async () => {
      const porra = await Linking.canOpenURL(data);
      setSupported(porra);})()
      
    setScanned(true);
    setData(data);
  };

  if (hasPermission === null) {
    return <Text style={styles.texto}>Solicitando permissão para usar a câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.texto}>Acesso negado à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <View>
          <Text style={styles.data}>{data}</Text>
          {supported ? (
            <OpenURLButton url={data}>Abrir Link no navegador</OpenURLButton>
          ) : (
            <></>
          )
          }
          <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />
        </View>
      ) : (
        <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      )}
    </View>
  );
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
  }
});

