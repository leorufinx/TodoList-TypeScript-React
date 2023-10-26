import { StyleSheet } from 'react-native';

const fontTitle = "RobotoSlab-Bold";
const fontText = "Roboto";

const lightTheme = {
    main: '#7D78B3',
    mainHover: '#B2ABFF',
    bg: '#ffffcc',
    h1: '#000000',
    h2: '#666666',
    shadow: '#B3AC89',
    tooltip: '#6B6799',
    inputHover: '#ffffbb',
};

const darkTheme = {
    main: '#D4BE47',
    mainHover: '#f1da5b',
    bg: '#000033',
    h1: '#F2F2F2',
    h2: '#9B88F6',
    shadow: '#000066',
    tooltip: '#7aa6d6',
    inputHover: '#000044',
};

export const css = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkTheme.bg,
        width: "100%",
        height: "100%",
    },
    h1: {
        color: darkTheme.h1,
        fontFamily: fontTitle,
        fontSize: 38,
        textAlign: 'center',
    },
    h2: {
        color: darkTheme.h2,
        fontFamily: fontText,
        fontSize: 16,
        textAlign: 'justify',
    },
    btn: {
        borderRadius: 30,
        backgroundColor: darkTheme.main,
        color: darkTheme.bg,
        fontFamily: fontTitle,
        fontSize: 20,
        padding: 10,
        margin: 10,
        zIndex: 2,
    },
});

export { lightTheme, darkTheme };