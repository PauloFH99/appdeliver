import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    maskedInput: {

      flexGrow: 1,
      height: 40,
      fontSize: 18,
      borderBottomColor: "#999",
      borderBottomWidth: 1,
      borderStyle: "solid",
      alignSelf: "flex-start",
      color:'white'
      
    },
    containerMask: {
      flex:1,
      flexDirection:'row',
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
     
    },
    errorMessage: {
      alignSelf: "flex-start",
      marginLeft: 15,
      color: "#f00",
      fontSize: 14
    }
  });

export default styles