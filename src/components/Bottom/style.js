import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2B3639",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99
  },
  iconWrapper: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: "transparent",
  },
  activeIcon: {
    borderRadius: "75%" 
  },
});
