import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons' /* Lib de icones */
import * as Animatable from 'react-native-animatable'; /* Lib de animação */


export default function TaskList({ data }) {
    return(
        <Animatable.View 
        style={styles.container}
        animation="bounceIn" /* Animação de entrada */
        useNativeDriver /* Usar a própria animação do dispositivo */
        >

            <View style={styles.infoTask}>
                <Text style={ styles.tituloTask}>{data.task}</Text>
                <Text style={ styles.dateTask}>{data.hour}</Text>
            </View>
            
            <TouchableOpacity style={styles.boxButton}>
                <Ionicons name="md-checkmark-sharp" size={30} color="green"/>
            </TouchableOpacity>
        </Animatable.View>
    );
}

/* Estilização */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    infoTask: {
        marginLeft: 5,
        padding: 8
    },
    tituloTask: {
        fontSize: 14,
        color: 'darkblue'
    },
    dateTask: {
        fontSize: 12,
        color: 'gray'
    },
    boxButton: {
        backgroundColor: '#F2F2F2',
        marginRight: 10,
    }
})