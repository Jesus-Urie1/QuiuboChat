import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView} from 'react-native';
import { auth } from "../config/firebase";
import { doc, setDoc, collection, onSnapshot, orderBy, query,addDoc,updateDoc } from '@firebase/firestore';
import { database } from "../config/firebase";

export default function NewChat({navigation}) {
    const [code, setcode] = useState("");

    const imagenPrincipal = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png";
    const cadenaAleatoria = longitud => {
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < longitud; i++) {
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        return aleatoria;
        
    };
    const chatcode = cadenaAleatoria(6);
    const CreateChat = () => {
        const documento = doc(database, chatcode, "datosChat")
        const datosChat = {
            "codeChat": chatcode,
            "nombreChat": chatcode,
            "imagenChat": imagenPrincipal,
            "owner": auth.currentUser.uid,
        }
        //creamos el chat
        setDoc(documento, datosChat)
        //registramos el usuario en el documento del chat
        const usrDoc = doc(database,`${chatcode}/datosChat/usrs/${auth.currentUser.uid}`)
        setDoc(usrDoc,{'uid': auth.currentUser.uid})
        navigation.navigate("Chat",{chatcode: chatcode})


    }

    const SelectChat = () => {
        if(code === '' ){
            Alert.alert("Error", 'Ingresa un codigo')
        } else{
        const collectionRef = collection(database, code);
        const q = query(collectionRef, orderBy('codeChat', 'desc'));
        
        onSnapshot(q, querySnapshot => {
            if(querySnapshot.docs.length === 0){
                Alert.alert("Error","Ingresa codigo valido")
            }else{
                querySnapshot.docs.map(docu => {
                    if(docu.data().codeChat === code){
                        console.log(docu.data());
                        const ref = doc(database,`${code}/datosChat/usrs/${auth.currentUser.uid}`);
                       
                        setDoc(ref,{
                            'uid':auth.currentUser.uid,
                            
                        });


                      navigation.navigate("Chat",{chatcode: code})

                      //Registramos al usr en el chat
                    }
                  })
            }
          })
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.form}>
            <KeyboardAvoidingView
                behavior= {(Platform.OS === 'ios')? "padding" : null}>
                <Text style={styles.title}>Crear nuevo Chat</Text>
                <TouchableOpacity style={styles.button} onPress={() => CreateChat()}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Crear</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Entrar a un Chat</Text>
                    <TextInput style={styles.input}
                        placeholder="Ingresa un codigo"
                        value={code}
                        onChangeText={(text) => setcode(text)}
                        />
                <TouchableOpacity style={styles.button} onPress={() => SelectChat()}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Entrar</Text>
                </TouchableOpacity>
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
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#006B76",
        alignSelf: "center",
        paddingBottom: 24,
    },
    button: {
        backgroundColor: '#006B76',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
})