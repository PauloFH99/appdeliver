import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, CheckBox } from 'react-native-elements';
import styles from '../../style/MainStyle';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import api from '../../services/api';
import { User } from 'src/types/User';
const cep = require('cep-promise')


const specificStyle = StyleSheet.create({
  specificContainer: {
    width: '100%',
    backgroundColor: "#ff4105",
    color: "white",


  },
  input: {
    width: "100%",
    marginTop: 10,
    padding: 10
  },
  button: {
    width: 200,
    marginTop: 10,
    color: "#d57231",
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#ff4105",
    borderColor: "#ff4105",
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10
  },
  text: {

    color: 'white',
    fontSize: 30,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',

  },
  titleStyle: {
    color: '#d57231',
    fontSize: 24,
    paddingLeft: 10
  },
  SectionStyle: {
    width: "85%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  checkboxContainer: {
    width: "80%",
    flexDirection: "row",
    marginBottom: 10,

  },
  label: {
    color: 'white',
    margin: 8,
    fontSize: 14
  }
});

type Props = {
  params: {
    user: string;
  };
}


const Adress: React.FC<{ route: Props }> = ({ route }) => {

  const username = route.params;
  const [user, setUser] = useState<User>()
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [apelido, setApelido] = useState("")
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [errorCep, setErrorCep] = useState("")
  const [errorRua, setErrorRua] = useState("")
  const [errorNumero, setErrorNumero] = useState("")
  const [errorBairro, setErrorBairro] = useState("")
  const [errorCidade, setErrorCidade] = useState("")
  const [errorApelido, setErrorApelido] = useState("")
  const [isLoading, setLoading] = useState(false)



  const validar = () => {
    let error = false
    setErrorCep("")
    setErrorRua("")
    setErrorNumero("")
    setErrorBairro("")
    setErrorCidade("")
    setErrorApelido("")

    if (cep == "") {
      setErrorCep("Preencha o cep")
      error = true
    }
    if (rua == "") {
      setErrorRua("Preencha a rua")
      error = true
    }
    if (numero == "") {
      setErrorNumero("Preencha o número")
      error = true
    }
    if (bairro == "") {
      setErrorBairro("Preencha o bairro")
      error = true
    }
    if (cidade == "") {
      setErrorCidade("Preencha a cidade")
      error = true
    }
    if (apelido == "") {
      setErrorApelido("Preencha o apelido")
      error = true
    }

    return !error
  }

  const handleUpdateUser = async () => {


   // await api.post<User>('users', { name, email, password, cpf, telefone })
    navigation.navigate("Login")

  }
  function handleCad() {
    if (validar()) {
      setLoading(true)
      handleUpdateUser
    }
  }
  interface IState {
    logradouro: '',
    uf: '',
    bairro: '',
    localidade: ''
  };

  const [dados, setDados] = useState<IState>();

  function buscarCep() {
    fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`).then(res => res.json()).then(data => {
      setDados(data)
    }).catch(err => {
      Alert.alert('Cidade não encontrada!')
    });

  }


  async function getUser() {
    await api.get(`users/${username}`)
      .then(response => setUser(response.data))
    console.log(user)
  }


  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  let cepField: TextInputMask | null = null



  interface UserData {
    username: string;
    password: string;
    prevState: null
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={80}>
      {/* <BorderlessButton style={[specificStyle.text]} onPress={navigation.goBack}>
        <Feather name="arrow-left" size={30} color="white"  textAlign="center"/>
        <Text style={[specificStyle.text]}  >Voltar</Text>
      </BorderlessButton> */}
      <ScrollView style={specificStyle.specificContainer}>
        <Text style={{ color: "white", marginLeft: 10 }}>CEP *</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextInputMask

            placeholderTextColor="white"
            type={'zip-code'}
            value={cep}
            onChangeText={value => {
              setCep(value)
              setErrorCep("")
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            style={styles.maskedInput}
            ref={(ref) => cepField = ref}
          />
          <Button buttonStyle={{ backgroundColor: 'white', width: 30 }}
            icon={
              <Icon
                name="search"
                size={15}
                color="#d57231"
              />
            }
            onPress={buscarCep}
          />
        </View>

        <Input
          label="Rua *"
          labelStyle={{ color: 'white' }}
          style={specificStyle.input}
          placeholder="Digite a rua"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          onChangeText={value => {
            setRua(value)
            setErrorRua("")
          }}
          errorMessage={errorRua}
          errorStyle={{ color: '#7B0707' }}
        />

        <Input
          label="N° *"
          labelStyle={{ color: 'white' }}
          style={specificStyle.input}
          placeholder="Digite o número"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          onChangeText={value => {
            setNumero(value)
            setErrorNumero("")
          }}
          errorMessage={errorNumero}
          errorStyle={{ color: '#7B0707' }}
        />
        <Input
          label="Bairro *"
          labelStyle={{ color: 'white' }}
          style={specificStyle.input}
          placeholder="Digite o bairro"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          onChangeText={value => {
            setBairro(value)
            setErrorBairro("")
          }}
          errorMessage={errorBairro}
          errorStyle={{ color: '#7B0707' }}
        />
        <Input
          label="Cidade *"
          labelStyle={{ color: 'white' }}
          style={specificStyle.input}
          placeholder="Digite a cidade"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          onChangeText={value => {
            setCidade(value)
            setErrorCidade("")
          }}
          defaultValue={dados?.localidade}
          errorMessage={errorCidade}
          errorStyle={{ color: '#7B0707' }}
        />

        <Input
          label="Apelido *"
          labelStyle={{ color: 'white' }}
          style={specificStyle.input}
          placeholder="Digite o apelido"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          onChangeText={value => {
            setApelido(value)
            setErrorApelido("")
          }}
          errorMessage={errorApelido}
          errorStyle={{ color: '#7B0707' }}
        />

        {isLoading &&
          <Text>Carregando...</Text>
        }
        {!isLoading &&
          <Button
            icon={
              <Icon
                name="plus"
                size={15}
                color="#d57231"
              />
            }
            title="Adicionar"
            titleStyle={specificStyle.titleStyle}
            buttonStyle={{ backgroundColor: 'white', width: '100%' }}
            onPress={handleCad}
          />
        }

      </ScrollView>
    </KeyboardAvoidingView >

  );
}


export default Adress;
