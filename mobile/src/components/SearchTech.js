import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { connect, disconnect } from '../services/websocket'

export default function SearchTech({ onSubmit }) {
    const [ techs, setTechs ] = useState('')

    function setupWebsocket() {
        connect()
    }

    async function HandleSubmition() {
        setupWebsocket()

        await onSubmit(techs)
        setTechs('')
    }

    return (
        <View
            style={styles.searchForm}
        >
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por tecnologias"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            <TouchableOpacity 
                style={styles.searchButton}
                onPress={HandleSubmition}
            >
                <MaterialIcons name="my-location" size={20} color="#FFF"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchForm: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})