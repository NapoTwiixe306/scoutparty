import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
