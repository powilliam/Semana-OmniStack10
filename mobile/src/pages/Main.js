import React, { useState, useEffect } from 'react'
import { StyleSheet, View  } from 'react-native'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import MapView from 'react-native-maps'

import api from '../services/api'
import { subscribeToNewDev } from '../services/websocket'

import MarkerDev from '../components/MarkerDev'
import SearchTech from '../components/SearchTech'

import darkMapStyle from '../config/Maps.json'

export default function Main({ navigation }) {
    const [ currentRegion, setCurrentRegion ] = useState(null)
    const [ devs, setDevs ] = useState([])

    useEffect(() => {
        subscribeToNewDev(dev => setDevs([...devs, dev]))
    }, [devs])

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

    async function searchForDevs(latitude, longitude, techs) {
        return await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })        
    }

    async function HandleSearchForDevs(techs) {
        const { latitude, longitude } = currentRegion

        const { data } = await searchForDevs(latitude, longitude, techs)

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
                        customMapStyle={darkMapStyle}
                    >
                        <MarkerDev 
                            developers={devs}
                            navigation={navigation}
                        />
                    </MapView>
                    <SearchTech 
                        onSubmit={HandleSearchForDevs}
                        location={currentRegion}
                    />
                </>
            ) }
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})