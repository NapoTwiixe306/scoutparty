import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const signUp = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.0.20:5000/signup', { email, password }, { timeout: 10000 });
            setLoading(false);
        } catch (error) {
            console.error('Error during sign up:', error);
            setLoading(false);
            if (error.code === 'ECONNABORTED') {
                Alert.alert('Error', 'Request timed out. Please try again.');
            } else {
                Alert.alert('Error', 'Failed to sign up. Please try again.');
            }
        }
    };

    const signIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.0.20:5000/signin', { email, password }, { timeout: 10000 });
            setLoading(false);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during sign in:', error);
            setLoading(false);
            if (error.code === 'ECONNABORTED') {
                Alert.alert('Error', 'Request timed out. Please try again.');
            } else {
                Alert.alert('Error', 'Failed to sign in. Please try again.');
            }
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            // Envoyer une requête de déconnexion au serveur
            await axios.post('http://192.168.0.20:5000/logout');
            setLoading(false);
            // Rediriger vers l'écran de connexion
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during logout:', error);
            setLoading(false);
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    value={password}
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up" onPress={signUp} />
                    <Button title="Sign In" onPress={signIn} />
                    <Button title="Sign Out" onPress={logout} />
                </View>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: "center"
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});
