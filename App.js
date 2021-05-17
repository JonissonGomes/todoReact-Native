import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList} from 'react-native'; 
import { Ionicons} from '@expo/vector-icons';

import TaskList from './src/components/TaskList'

export default function App(){

  /* Variaveis e funções */
  const [task, setTask] = useState([
    { key: 1, task: 'Modificar tela de atendimento', hour: '24/05/21'},
    { key: 2, task: 'Modificar banco de dados no PostgresSQL', hour: '25/12/21'},
    { key: 3, task: 'Tocar a task SGTME 1837', hour: '17/05/21'},
    { key: 4, task: 'Coda infinitamente', hour: '31/02/99'},
  ]);

  /* View */
  return(
    <SafeAreaView style={styles.box}>
      <StatusBar backgroundColor="#171d33" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.titulo}>Lembretes</Text>
      </View>

    {/* Lista */}

    <FlatList
      style={styles.lista}
      showsHorizontalScrollIndicator={false} /* Desabilita a barra de rolagem */
      data={task} /* Onde vai todos os itens da lista */
      keyExtractor={ (item) => String(item.key) } /* Chave do item */
      renderItem={ 
        ({ item }) => <TaskList data={item} />  /* Como vai ser renderizado o item */
      }
    />


    {/* Icone Adicionar */}
    <TouchableOpacity style={styles.iconAdd}>
      <Ionicons name="ios-add" size={30} color="#171d33"/>
    </TouchableOpacity>

    </SafeAreaView>
  );
}


/* Estilização */
const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#171d33'
  },

  titulo: {
    marginTop: 40,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: "#fff"
  },

  iconAdd: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    /* Alinha o botão para baixo da tela */ 
    right: 25, 
    bottom: 25,
    elevation: 2, /* Causa o efeito de sombreamento*/
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset:{
        width: 1,
        height: 3,
    }
  },

  lista: {
    marginLeft: 10,
    padding: 8,
    marginTop: 30,
    marginRight: 10,
  },


})