import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {TextInput, Button} from 'react-native-paper';
// or any pure javascript modules available in npm
// import { Button } from 'react-native-paper';

export default class App extends React.Component {
   state = {
    peso: 0,
    altura: 0,
    imc: 0,
    diagnostico: 'Indeterminado',
    legenda: 'Seu IMC',
    cor: '#bdc3c6',
  };
  
  calcularIMC = () => {
    const res = this.state.peso / (this.state.altura * this.state.altura);
    this.setState({imc: Math.ceil(res)});

    if(res < 18.5){
      this.setState({diagnostico: 'Magreza', cor: '#e74c3c'})
    }else if(res >= 18.5 && res < 25){
      this.setState({diagnostico: 'Normal', cor: '#2ecc71'})
    }else if(res >= 25 && res < 30){
      this.setState({diagnostico: 'Sobrepeso', cor: '#f1c40f'})
    }else if(res >= 30 && res < 40){
      this.setState({diagnostico: 'Obesidade', cor: '#e67e22'})
    }else{
      this.setState({diagnostico: 'Obesidade grave', cor: '#e74c3c'})
    }
  }
render() {
    return (
      <View style={styles.app}>
        <Text style={styles.legenda}>{this.state.legenda}</Text>
        
        <View style={[styles.painel,{backgroundColor: this.state.cor}]}>
          <Text style={styles.resultado}>{this.state.imc}</Text>
          <Text style={styles.diagnostico}>{this.state.diagnostico}</Text>
        </View>
        
        <View>
          <TextInput label='Peso' style={styles.peso} 
          onChangeText={valor => {
            this.setState({peso: valor.replace(',','.')})
          }}
          />
          <TextInput label='Altura' style={styles.altura} 
          onChangeText = {valor =>{
            this.setState({altura: valor.replace(',','.')})
          }}
          />
          <Button mode='contained' onPress={this.calcularIMC}>
            Calcular
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    padding: 10,
  },
  painel: {
    alignSelf: 'center',
    borderRadius: 7,
    width: 150,
    marginVertical: 10,
    padding: 8,
  },
  legenda: {
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
  resultado: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
  },
  peso: {
    marginVertical: 10
  },
  altura: {
    marginVertical: 10
  },
});
