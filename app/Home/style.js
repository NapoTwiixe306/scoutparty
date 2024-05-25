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
});
  
export default styles;