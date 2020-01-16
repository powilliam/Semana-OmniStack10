import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MapView, { Marker, Callout } from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

export default function Main({ navigation }) {
    const [ currentRegion, setCurrentRegion ] = useState(null)
    const [ techs, setTechs ] = useState('')
    const [ devs, setDevs ] = useState([])

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

    async function searchForDevs() {
        const { latitude, longitude } = currentRegion

        const { data } = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(data.locatedDevs)
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
                        { devs.map(dev => (
                            <Marker
                                key={dev._id}
                                coordinate={{ 
                                    latitude: dev.location.coordinates[1], 
                                    longitude: dev.location.coordinates[0]
                                }}
                            >
                                <Image 
                                    style={styles.avatar} 
                                    source={{ uri: dev.avatar }}
                                />

                                <Callout onPress={() => {
                                    navigation.navigate('Profile', {
                                        github: dev.github
                                    })
                                }} style={styles.callout}>
                                    <Text style={styles.devName}>{dev.github}</Text>
                                    <Text style={styles.devBio}>{dev.bio}</Text>
                                    <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                                </Callout>
                            </Marker>
                        )) }
                    </MapView>
                    <View style={styles.searchForm}>
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
                            onPress={searchForDevs}
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
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
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