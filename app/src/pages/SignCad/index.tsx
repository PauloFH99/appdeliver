import React, { useState, } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Text, TouchableOpacity, OpaqueColorValue } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, CheckBox } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../../style/MainStyle';
import { useNavigation } from "@react-navigation/native";
import api from '../../services/api';
import { User } from '../../types/User';



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


const SignCad: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSelected, setSelected] = useState(false)
  const [isSelectedTermo, setSelectedTermo] = useState(false)
  const [cpf, setCpf] = useState("495.334")
  const [telefone, setTelefone] = useState("18997")
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConfirm, setHidePassConfirm] = useState(true);
  const [errorEmail, setErrorEmail] = useState("")
  const [errorName, setErrorName] = useState("")
  const [errorCpf, setErrorCpf] = useState("")
  const [errorTelefone, setErrorTelefone] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
  const [isLoading, setLoading] = useState(false)

  let cpfField: TextInputMask | null = null
  let telefoneField: TextInputMask | null = null

  const validar = () => {
    let error = false
    setErrorName("")
    setErrorEmail("")
    setErrorCpf("")
    setErrorTelefone("")
    setErrorPassword("")

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email == "") {
      setErrorEmail("Preencha o email")
      error = true
    } else if (!re.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
    // if (!cpfField.isValid()) {
    //   setErrorCpf("Preencha seu CPF corretamente")
    //   error = true
    // }
    if (telefone == null) {
      setErrorTelefone("Preencha seu telefone corretamente")
      error = true
    }
    if (name == "") {
      setErrorName("Preencha o nome")
      error = true
    }
    if (password == "") {
      setErrorPassword("Preencha a senha")
      error = true
    }
    if (confirmPassword == "") {
      setErrorConfirmPassword("Preencha a senha")
      error = true
    } else if (password != confirmPassword) {
      setErrorPassword("As senhas não conferem!")
      setErrorConfirmPassword("As senhas não conferem!")
      error = true
    }
    return !error
  }

  const validarTermos = () => {
    let error = false
    if (isSelectedTermo == false) {
      Alert.alert('Termos não aceitos!');
      error = true
    }
    return !error
  }

  const handleCreateUser = async () => {
    const data = new FormData()

    data.append('name', name)
    data.append('email', email)
    data.append('password', password)
    data.append('cpf', cpf)
    data.append('telefone', telefone) 
  
    
    await api.post<User>('users', {name,email,password,cpf,telefone})

    navigation.navigate('Endereços',{
      email
    });
  }

  function handleCad() {
    if (validar() && validarTermos()) {
      setLoading(true)
      handleCreateUser()
    }
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
      {/* <BorderlessButton style={[specificStyle.text]} onPress={navigation.goBack}>
        <Feather name="arrow-left" size={30} color="white"  textAlign="center"/>
        <Text style={[specificStyle.text]}  >Voltar</Text>
      </BorderlessButton> */}
      <ScrollView style={specificStyle.specificContainer}>
        <Text style={{ color: 'white', paddingBottom: 30, marginTop: 20 }} >Cadastro</Text>
        <Input
          label="Nome *"
          labelStyle={{ color: 'white' }}
          style={specificStyle.input}
          placeholder="Digite o nome"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
          onChangeText={value => {
            setName(value)
            setErrorName("")
          }}
          value={"Paulo"}
          errorMessage={errorName}
          errorStyle={{ color: '#7B0707' }}
        />
        <Input
          label="E-mail *"
          labelStyle={{ color: 'white' }}
          placeholder="Digite o e-mail"
          placeholderTextColor="white"
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
          onChangeText={value => {
            setEmail(value)
            setErrorEmail("")
          }}
          keyboardType="email-address"
          errorMessage={errorEmail}
          errorStyle={{ color: '#7B0707' }}
          style={specificStyle.input}
          value={"paulo@gmail.com"}
        />
        <Text style={{ color: "white", marginLeft: 10 }}>CPF *</Text>
        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Digite o CPF"
            placeholderTextColor="white"
            type={'cpf'}
            value={cpf}
            onChangeText={value => {
              setCpf(value)
              setErrorCpf("")
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            style={styles.maskedInput}
            ref={(ref) => cpfField = ref}

          />
        </View>
        <Text style={styles.errorMessage}>{errorCpf}</Text>
        <Text style={{ color: "white", marginLeft: 10 }}>Telefone *</Text>
        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Digite o telefone"
            placeholderTextColor="white"
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            value={telefone}
            onChangeText={value => {
              setTelefone(value)
              setErrorTelefone("")
            }
            }
            keyboardType="phone-pad"
            returnKeyType="done"
            style={styles.maskedInput}
            ref={(ref) => telefoneField = ref}
          />
        </View>
        <View style={specificStyle.SectionStyle}>
          <Input
            label="Senha *"
            labelStyle={{ color: 'white' }}
            placeholder="Digite a senha"
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
        <View style={specificStyle.SectionStyle}>
          <Input
            label="Repetir Senha *"
            labelStyle={{ color: 'white' }}
            placeholder="Digite a senha"
            placeholderTextColor="white"
            leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
            onChangeText={value => {
              setConfirmPassword(value)
              setErrorConfirmPassword("")
            }}
            secureTextEntry={hidePassConfirm ? true : false}
            errorMessage={errorConfirmPassword}
            errorStyle={{ color: '#7B0707' }}
            style={specificStyle.input}

          />
          <Icon
            name={hidePassConfirm ? 'eye-slash' : 'eye'}
            size={24}
            color="white"
            onPress={() => setHidePassConfirm(!hidePassConfirm)}
          />
        </View>
        <View style={specificStyle.checkboxContainer}>
          <CheckBox
            checkedIcon="check"
            uncheckedIcon="square-o"
            checkedColor="white"
            uncheckedColor="white"
            checked={isSelected}
            onPress={() => setSelected(!isSelected)}
          />
          <Text style={specificStyle.label}>Gostaria de receber e-mail comunicando novidades e promoções</Text>
        </View>
        <View style={specificStyle.checkboxContainer}>
          <CheckBox
            checkedIcon="check"
            uncheckedIcon="square-o"
            checkedColor="white"
            uncheckedColor="white"
            checked={isSelectedTermo}
            onPress={() => setSelectedTermo(!isSelectedTermo)}
          />
          <Text style={[specificStyle.label, { textDecorationLine: 'underline' }]}
            onPress={() => navigation.navigate("Políticas de  Privacidade")}>
            Li e aceito os termos de uso e as políticas de privacidade
           </Text>
        </View>
        {isLoading &&
          <Text>Carregando...</Text>
        }
        {!isLoading &&
          <Button
            icon={
              <Icon
                name="check"
                size={15}
                color="#d57231"
              />
            }
            title=" Cadastrar"
            titleStyle={specificStyle.titleStyle}
            buttonStyle={{ backgroundColor: 'white', width: '100%' }}
            onPress={handleCad}
          />
        }

      </ScrollView>
    </KeyboardAvoidingView >

  );
}


export default SignCad;
