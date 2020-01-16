import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MapView, { Marker, Callout } from 'react-native-maps'

export default function Main() {
    const [ currentRegion, setCurrentRegion ] = useState(null)

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

    return (
        <>
            { !currentRegion ? (
                <View />
            ) : (
                <MapView 
                    style={styles.map}  
                    initialRegion={currentRegion}
                >
                    <Marker coordinate={{ latitude: -7.503922, longitude: -63.026543 }}>
                        <Image 
                            style={styles.avatar} 
                            source={{ uri: 'https://avatars0.githubusercontent.com/u/55867831?s=460&v=4' }}
                        />

                        <Callout style={styles.callout}>
                            <Text style={styles.devName}>William Porto</Text>
                            <Text style={styles.devBio}>Chemistry student at UFAM. Ìn love with Node.js, ReactJS and React Native</Text>
                            <Text style={styles.devTechs}>Node.js, React JS, React Native</Text>
                        </Callout>
                    </Marker>
                </MapView>
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
    }
})