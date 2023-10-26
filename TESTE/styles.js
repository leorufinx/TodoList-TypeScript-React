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
    main: '#333333',
    mainHover: '#555555',
    bg: '#111111',
    h1: '#FFFFFF',
    h2: '#999999',
    shadow: '#222222',
    tooltip: '#444444',
    inputHover: '#333333',
};

export const css = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightTheme.bg,
    },
    h1: {
        color: lightTheme.h1,
        fontFamily: fontTitle,
        fontSize: 38,
        textAlign: 'center',
    },
    h2: {
        color: lightTheme.h2,
        fontFamily: fontText,
        fontSize: 16,
        textAlign: 'justify',
    },
    btn: {
        borderRadius: 30,
        backgroundColor: lightTheme.main,
        color: lightTheme.bg,
        fontFamily: fontTitle, 
        fontSize: 20,
        padding: 10,
        margin: 10,
        zIndex: 2,
    },
});

export { lightTheme, darkTheme };