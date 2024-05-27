import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },

    link: {
      marginTop: 20,
      color: 'blue',
      textDecorationLine: 'underline'
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
  },
  input: {
      height: 40,
      width: "100%",
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 15,
      marginRight: 10,
      paddingLeft: 10,
  },
  choice: {
    padding: 10,
    marginTop: 25
  },
  items: {

  },
  option: {
    marginBottom: 50
  },
  optionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700"
  }
});

export default styles;