import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; /* Lib de animação */


import TaskList from './src/components/TaskList'

/* Criando componente animado */
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {

  /* Variaveis e funções */
  const [task, setTask] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [inputText, setInputText] = useState('');


  function adicionarTask() {
    if (inputText === '') {
      return;
    }

    const data = {
      key: inputText,
      task: inputText
    }

    setTask([...task, data]); /* Adiciona o item ao array */
    setOpenModal(false)
    setInputText('');
  }

  const deleteTask = useCallback((data) => {
    const find = task.filter(result => result.key !== data.key); /* Compara os o array antigo com o novo */
    setTask(find);
  });

  /* View */
  return (
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
        keyExtractor={(item) => String(item.key)} /* Chave do item */
        renderItem={
          ({ item }) => <TaskList data={item} deleteTask={deleteTask} />  /* Como vai ser renderizado o item */
        }
      />

      <Modal animationType="slide" transparent={false} visible={openModal}>
        <SafeAreaView style={styles.box}>
          <View>
            <Text style={styles.titulo}>Criar tarefa</Text>
          </View>

          {/* Input */}
          <Animatable.View animation="fadeInUp" useNativeDriver>
            <Text style={styles.stepName}>Título</Text>
            <TextInput
              style={styles.inputText}
              value={inputText}
              onChangeText={
                (texto) => setInputText(texto)
              }
            />
          </Animatable.View>

          {/* Botão de adicionar */}
          <TouchableOpacity style={styles.botaoFalso} onPress={adicionarTask}>
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>

          {/* Botão de voltar */}
          <TouchableOpacity style={styles.botaoFalso} onPress={() => setOpenModal(false)}>
            <Text style={styles.textoBotao}>Voltar</Text>
          </TouchableOpacity>


        </SafeAreaView>
      </Modal>

      {/* Icone Adicionar */}
      <AnimatedButton
        style={styles.iconAdd}
        animation="bounceInUp"
        duration={2000}
        onPress={() => setOpenModal(true)}
        useNativeDriver>
        <Ionicons name="ios-add" size={30} color="#171d33" />
      </AnimatedButton>

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
    shadowOffset: {
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

  stepName: {
    marginTop: 40,
    marginBottom: 4,
    fontSize: 14,
    color: '#fff',
    marginLeft: 100,
    marginRight: 120
  },

  inputText: {
    backgroundColor: '#fff',
    width: 220,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    marginRight: 100,
    marginLeft: 100,
    marginBottom: 40,
  },

  botaoFalso: {
    width: 150,
    marginLeft: 140,
    marginRight: 140,
    marginBottom: 10,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5
  },

  textoBotao: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#171d33'
  }


})