import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import styles from '../../style/MainStyle';
import { useNavigation } from '@react-navigation/native';


const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#ff4105",
    color: 'white',


  },
  button: {
    width: 250,
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,

  },
  checkBox: {
    width: 200,
    marginTop: 10,
    backgroundColor: "#ff4105",
    borderColor: "#ff4105",
    fontSize: 30,
    elevation: 0,

  },
  text: {
    width: 200,
    color: 'white',
    fontSize: 30,
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: "center",
  },
  titleStyle: {
    color: '#d57231',
    fontSize: 24,
    paddingLeft: 10
  },
  SectionStyle: {
    width: "70%",
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
});

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSelected, setSelected] = useState(false)

  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const validar = () => {
    let error = false

    setErrorEmail("")
    setErrorPassword("")

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email == "") {
      setErrorEmail("Preencha o email")
      error = true
    } else if (!re.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
    if (password == "") {
      setErrorPassword("Preencha a senha")
      error = true
    }


    return !error
  }




  function handleSign() {
    if (validar()) {
      signIn();
    }

  }
  function handleCad() {
    //  SignCad();
  }


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
      <ScrollView style={specificStyle.specificContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text h3 style={{ color: 'white', padding: 15, }}>Bem Vindo</Text>       
        </View>

        <View style={specificStyle.SectionStyle}>
          <Input
            label="E-mail *"
            labelStyle={{ color: 'white' }}
            placeholder="E-mail"
            placeholderTextColor="white"
            leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
            onChangeText={value => {
              setEmail(value)
              setErrorEmail("")
            }}
            errorMessage={errorEmail}
            errorStyle={{ color: '#7B0707' }}
            keyboardType="email-address"
          />
        </View>
        <View style={specificStyle.SectionStyle}>
          <Input
            label="Senha *"
            labelStyle={{ color: 'white' }}
            placeholder="Sua senha"
            placeholderTextColor="white"
            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
            onChangeText={value => {
              setPassword(value)
              setErrorPassword("")
            }}
            errorMessage={errorPassword}
            errorStyle={{ color: '#7B0707' }}
            secureTextEntry={hidePass ? true : false}
          />
          <Icon
            name={hidePass ? 'eye-slash' : 'eye'}
            size={24}
            color="white"
            onPress={() => setHidePass(!hidePass)}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            icon={
              <Icon
                name="check"
                size={15}
                color="#d57231"
              />
            }
            title="Entrar"
            titleStyle={specificStyle.titleStyle}
            buttonStyle={specificStyle.button}
            onPress={handleSign}
          />
        </View>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CheckBox
            title="Permanecer conectado"
            textStyle={{ color: 'white' }}
            checkedIcon="check"
            uncheckedIcon="square-o"
            checkedColor="white"
            uncheckedColor="white"
            checked={isSelected}
            containerStyle={specificStyle.checkBox}
            onPress={() => setSelected(!isSelected)}
          />
          <Text style={{ color: 'white', textDecorationLine: 'underline', padding: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            Esqueci minha senha?
        </Text>
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            icon={
              <Icon
                name="user"
                size={15}
                color="#d57231"
              />
            }
            title=" Cadastre-se"
            titleStyle={specificStyle.titleStyle}
            buttonStyle={specificStyle.button}
            onPress={() => navigation.navigate("Cadastro")}
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default SignIn;
