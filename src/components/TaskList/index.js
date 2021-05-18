import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons' /* Lib de icones */
import * as Animatable from 'react-native-animatable'; /* Lib de animação */


export default function TaskList({ data, deleteTask }) {
    const [checkbox, setCheckbox] = useState(false);

    return (
        <Animatable.View
            style={styles.container}
            animation="bounceIn" /* Animação de entrada */
            useNativeDriver /* Usar a própria animação do dispositivo */
        >

            {checkbox !== false &&
                <TouchableOpacity style={styles.boxButtonComplete}>
                    <Ionicons name="md-checkmark-sharp" size={30} color="green" />
                </TouchableOpacity>
            }

            <View style={styles.infoTask}>
                <Text style={styles.tituloTask}>{data.task}</Text>
                <Text style={styles.dateTask}>{data.hour}</Text>
            </View>



            {checkbox !== false &&
                <TouchableOpacity
                    style={styles.boxButtonTrash}
                    onPress={ () => deleteTask(data)}>
                    <Ionicons name="md-trash-sharp" size={25} color="red" />
                </TouchableOpacity>
            }

            {checkbox !== true &&
                <TouchableOpacity
                    style={styles.boxButton}
                    onPress={() => setCheckbox(true)}>
                    <Ionicons name="md-square-sharp" size={30} color="#F3F3F3" />
                </TouchableOpacity>
            }
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
        marginBottom: 5,
        padding: 8,
        borderRadius: 5
    },
    infoTask: {
        marginTop: 10,
        padding: 5,
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
        backgroundColor: '#F3F3F3',
        marginRight: 10,
    },

    boxButtonComplete: {
        marginLeft: 5,
    },

    boxButtonTrash: {
        marginRight: 10,
    }
})