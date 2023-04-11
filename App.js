import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Acesso negado à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <View>
          <Text style={styles.data}>{data}</Text>
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
  },
});

