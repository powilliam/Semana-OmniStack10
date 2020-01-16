import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { Marker, Callout } from 'react-native-maps'

export default function MarkerDev({ developers, navigation }) {
    return (
        <>
            { developers.map(dev => (
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
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </Callout>
                </Marker>
            )) }
        </>
    )
}

const styles = StyleSheet.create({
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
})