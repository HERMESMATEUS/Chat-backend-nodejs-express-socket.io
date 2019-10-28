import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Chat from './Chat';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            login: false
        };
    }

    login() {
        const { name } = this.state;
        if (name != '') this.setState({ login: true })
        else alert('Ingrese Login');
    }

    render() {

        const { name, login } = this.state;

        if (login) return < Chat name={name} />

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ padding: 20, borderRadius: 10, height: 200, backgroundColor: '#3CA7E9', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}> Login </Text>
                    <TextInput
                        style={{ color: 'white', height: 40, width: 200, marginTop: 20, borderRadius: 10, borderWidth: 0.3, borderColor: 'white' }}
                        placeholder='Ingrese usuario'
                        placeholderTextColor='grey'
                        onChangeText={(name) => this.setState({ name })}
                    />
                    <TouchableOpacity
                        onPress={() => this.login()}
                    >
                        <Text style={{ marginTop: 20, borderRadius: 10, borderWidth: 0.3, padding: 15, borderColor: 'white', fontSize: 16, color: 'white', fontWeight: 'bold' }}> Iniciar </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}
