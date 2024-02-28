import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

export default function App() {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const calcularIMC = () => {
    const pesoValor = parseFloat(peso.replace(',', '.'));
    const alturaValor = parseFloat(altura.replace(',', '.'));

    if (!isNaN(pesoValor) && !isNaN(alturaValor) && alturaValor > 0) {
      const imc = pesoValor / Math.pow(alturaValor, 2);
      setResultado(imc.toFixed(2));
      determinarMensagem(imc);
    } else {
      setResultado(null);
      setMensagem(null);
    }
  };

  const determinarMensagem = (imc: number) => {
    if (imc < 18.5) {
      setMensagem('Abaixo do Peso');
    } else if (imc >= 18.5 && imc < 24.9) {
      setMensagem('Peso Normal');
    } else if (imc >= 25 && imc < 29.9) {
      setMensagem('Sobrepeso');
    } else {
      setMensagem('Obesidade');
    }

    showAlert(imc.toFixed(2));
  };

  const showAlert = (imcResult: string) => {
    Alert.alert(
      'Resultado IMC',
      `Resultado do cálculo de IMC: ${imcResult}\n\n${mensagem}`,
      [
        { text: 'Calcular', onPress: () => console.log('Calcular') }
      ],
      { cancelable: false }
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Calculo de IMC"
          options={{
            title: 'Calculo de IMC',
            headerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', fontFamily: 'sans-serif' },
          }}
        >
          {() => (
            <ImageBackground
              source={require('./fundo/fundo.png')}
              style={styles.background}
            >
              <View style={styles.container}>
                <Text style={styles.label}>Peso (kg):</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  returnKeyType='done'
                  value={peso}
                  onChangeText={(text) => setPeso(text)}
                />

                <Text style={styles.label}>Altura (m):</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  returnKeyType='done'
                  value={altura}
                  onChangeText={(text) => setAltura(text)}
                />

                <Button title="Calcular" onPress={calcularIMC} color="#FFFFFF" />

                {resultado !== null && (
                  <Text style={styles.resultText}>
                    Resultado do cálculo de IMC: {resultado}
                  </Text>
                )}

                {mensagem !== null && (
                  <Text style={styles.resultText}>
                    Classificação: {mensagem}
                  </Text>
                )}
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    marginBottom: 8,
    color: 'black',
    padding: 20,
    borderRadius: 20,
  },
  input: {
    height: 40,

    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 14,
  },
  resultText: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adicione cor de fundo aqui
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    padding: 8,
    borderRadius: 8,
  },

  button: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adicione cor de fundo aqui

  }
});
