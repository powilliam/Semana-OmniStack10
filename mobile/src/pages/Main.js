import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MapView, { Marker, Callout } from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'

export default function Main({ navigation }) {
    const [ currentRegion, setCurrentRegion ] = useState(null)
    const [ techs, setTechs ] = useState('')

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

    function navigateToGithubProfile() {
        navigation.navigate('Profile', {
            github: 'powilliam'
        })
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
                    >
                        <Marker coordinate={{ latitude: -7.503922, longitude: -63.026543 }}>
                            <Image 
                                style={styles.avatar} 
                                source={{ uri: 'https://avatars0.githubusercontent.com/u/55867831?s=460&v=4' }}
                            />

                            <Callout onPress={navigateToGithubProfile} style={styles.callout}>
                                <Text style={styles.devName}>William Porto</Text>
                                <Text style={styles.devBio}>Chemistry student at UFAM. Ìn love with Node.js, ReactJS and React Native</Text>
                                <Text style={styles.devTechs}>Node.js, React JS, React Native</Text>
                            </Callout>
                        </Marker>
                    </MapView>
                    <View style={styles.searchForm}>
                        <TextInput 
                            style={styles.searchInput}
                            placeholder="Buscar devs por tecnologias"
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        <TouchableOpacity 
                            style={styles.searchButton}
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