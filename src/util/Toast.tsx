import { ToastAndroid } from "react-native";

const showToast = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
};

const showToastWithGravity = (text: string, gravity: number) => {
    ToastAndroid.showWithGravity(
        text,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
    );
};


export default showToast;