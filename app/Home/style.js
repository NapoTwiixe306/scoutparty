import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
    },
    hotparty: {
        padding: 15,
        height: 167,
        width: 391,
        backgroundColor: 'rgba(255, 255, 255, 0.63)',
        borderRadius: 15,
        justifyContent: 'flex-start',
        marginBottom: 20,
        gap: 15
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        width: "90%",
        fontSize: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    input: {
        height: 40,
        width: "80%",
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 10,
        paddingLeft: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
      },
      modalText: {
        fontSize: 20,
        marginBottom: 20,
        color: 'white',
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      radioButtonUnselected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 10,
      },
      radioButtonSelected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'blue',
        marginRight: 10,
      },
      radioText: {
        fontSize: 18,
        color: 'white',
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
});
  
export default styles;