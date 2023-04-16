import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Linking, Alert, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import BotaoFlutuante from '../components/BotaoFlutuante';
import themes from '../themes'


export default function Scanner({navigation}) {
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

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			// allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
		});

		console.log(result.assets[0].uri);
		console.log(typeof(result.assets[0].uri))

		if (!result.canceled) {
			let cu = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri)
			const porra = await Linking.canOpenURL(cu[0].data);
			setSupported(porra);
			setScanned(true);
			setData(cu[0].data);
		}
	};

	const OpenURLButton = ({url, children}) => {
		const handlePress = useCallback(async () => {
		// const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
		}, [url]);

		//return <Button title={children} onPress={handlePress} />;

		return <Pressable url={data} onPress={handlePress}
				style={({pressed}) => [
					{
			  			backgroundColor: pressed ? themes.colors.brand.vermelhoClaro : themes.colors.brand.vermelhoEscuro,
					},
						styles.botao,
		  		]}
				><Text style={styles.btnTexto}>ABRIR LINK NO NAVEGADOR</Text></Pressable>
	};

	const handleBarCodeScanned = ({ type, data }) => {
		(async () => {
			console.log(data)	
			const porra = await Linking.canOpenURL(data);
			setSupported(porra);
		})()
		
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
				<View style={styles.fundourl}>
					<Text style={styles.data}>{data}</Text>
				</View>
			{supported ? (
				<OpenURLButton url={data}>Abrir Link no navegador</OpenURLButton>
			) : (
				<></>
			)
			}

			<Pressable onPress={() => setScanned(false)}
				style={({pressed}) => [
					{
					  backgroundColor: pressed ? themes.colors.brand.vermelhoClaro : themes.colors.brand.vermelhoEscuro,
					},
					styles.botao,
				  ]}
			
			>
                <Text style={styles.btnTexto}>ESCANEAR NOVAMENTE</Text>
            </Pressable>
			</View>
		) : (
			<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject}>
				<BotaoFlutuante onPress={pickImage} icon="file-find-outline" size={50}></BotaoFlutuante>
			</BarCodeScanner>
		)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: themes.colors.brand.roxoClaro,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fundourl: {
		backgroundColor: themes.colors.brand.roxoEscuro,
		borderRadius: 10,
		borderWidth: 1
	},
	data: {
		fontSize: 20,
		color: '#e2e6e7',
		marginVertical: 10,
		alignSelf: 'center'
	},
	texto: {
		fontSize: 30,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	botao: {
		//backgroundColor: themes.colors.brand.vermelhoEscuro,
		marginTop: 15,
		padding: 15,
		borderRadius: 8,
		borderWidth: 1
	},
	btnTexto: {
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontWeight: 600
	}
});

