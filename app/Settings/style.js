import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  profileContainer: {
    padding: 10,
    marginBottom: 15
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textAvatar: {
    textAlign: "center",
    fontSize: 18,
    width: "65%"
  },
  rightInfos: {
    gap: 7
  },
  infosText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
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
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 50
},
optionText: {
  color: "white",
  fontSize: 18,
  fontWeight: "700"
}
});

export default styles;
