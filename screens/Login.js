import React, { useState, useContext } from "react";
import { StyleSheet,Text,View,TextInput,SafeAreaView,ImageBackground,TouchableOpacity,Alert,KeyboardAvoidingView} from "react-native";
import AuthContext from "../hooks/authContext";
const backImage = require("../assets/backImage.png");

export default function Login({ navigation }) {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext);

    const onHandleLogin = () => {
        if (email !== "" && password !== ""){
            login(navigation,email,password)
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={backImage} style={styles.backImage}/>
                <View style={styles.whiteSheet}/>
                    <SafeAreaView style={styles.form}>
                        <KeyboardAvoidingView
                            behavior= {(Platform.OS === 'ios')? "padding" : null}>
                        <Text style={styles.title}>Rakuh Chat</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa Contraseña"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType="password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>No tienes cuenta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style={{color: '#006B76', fontWeight: '600', fontSize: 14}}>Registrate</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#006B76",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '85%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    button: {
        backgroundColor: '#006B76',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});
    