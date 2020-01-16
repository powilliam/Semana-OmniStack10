import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MapView from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

import MarkerDev from '../components/MarkerDev'

export default function Main({ navigation }) {
    const [ currentRegion, setCurrentRegion ] = useState(null)
    const [ techs, setTechs ] = useState('')
    const [ devs, setDevs ] = useState([])
    const [ inputViewStyle, setInputViewStyle ] = useState({
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
    })

    useEffect(() => {
        async function loadStartLocation() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })
                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.08,
                })
            }
        }

        loadStartLocation()
    }, [])

    useEffect(() => {
        const KeyboardDidShow = Keyboard.addListener('keyboardDidShow', increaseInputViewStylePosition)
        const KeyboardDidhide = Keyboard.addListener('keyboardDidHide', decreaseInputViewStylePosition)

        return () => {
            KeyboardDidShow.remove()
            KeyboardDidhide.remove()
        }

    }, [])

    function increaseInputViewStylePosition() {
        setInputViewStyle({
            position: 'absolute',
            bottom: 80,
            left: 20,
            right: 20,
            flexDirection: 'row',
        })
    }

    function decreaseInputViewStylePosition() {
        setInputViewStyle(styles.searchForm)
    }

    async function searchForDevs(latitude, longitude) {
        return await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })        
    }

    async function HandleSearchForDevs() {
        const { latitude, longitude } = currentRegion
        
        const { data } = await searchForDevs(latitude, longitude)

        setDevs(data.locatedDevs)

        clearInputAfterSearchIsCompleted()
    }

    function clearInputAfterSearchIsCompleted() {
        setTechs('')
    }

    function HandleChangeCurrentPosition(region) {
        setCurrentRegion(region)
    }

    return (
        <>
            { !currentRegion ? (
                <View />
            ) : (
                <>
                    <MapView 
                        style={styles.map}  
                        initialRegion={currentRegion}
                        onRegionChangeComplete={HandleChangeCurrentPosition}
                    >
                        <MarkerDev 
                            developers={devs}
                            navigation={navigation}
                        />
                    </MapView>
                    <View
                        style={inputViewStyle}
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
                            onPress={HandleSearchForDevs}
                        >
                            <MaterialIcons name="my-location" size={20} color="#FFF"/>
                        </TouchableOpacity>
                    </View>
                </>
            ) }
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
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