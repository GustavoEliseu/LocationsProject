import { Button, ButtonProps, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const FAB = (props: ButtonProps) => {
    return (
        <Pressable style={styles.container}
            onPress={props.onPress}>
            <Icon name={"add"} size={24} color={"#fff"} />
        </Pressable>
    );
};

export default FAB;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 28,
        width: 56,
        height: 56,
        bottom: 20,
        right: 20,
        backgroundColor: "#26653A",
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});