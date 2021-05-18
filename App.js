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
  const [validate, setValidate] = useState(false);

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

  function validated() {
    setOpenModal(true)
    setValidate(true)
  }

  const deleteTask = useCallback((data) => {
    const find = task.filter(result => result.key !== data.key); /* Compara os o array antigo com o novo */
    setTask(find);
  });

  /* View */
  return (
    <SafeAreaView style={styles.box}>
      <StatusBar backgroundColor="#171d33" barStyle="light-content" />

      {/* Mensagem inicial quando não tem itens cadastrados */}
      {task.length === 0 && validate !== true &&
        <View style={styles.contentInitial}>
          <Ionicons name="clipboard-sharp" size={100} color="lightgreen" />
          <Text style={styles.welcomeTitulo}>Bem vindo</Text>
          <Text style={styles.welcomeDescricao}>Nesta plataforma você pode anotar suas rotinas, lembretes, tarefas curtas. Acompanhando sempre suas tarefas direto do seu bolso.</Text>

          <AnimatedButton
            style={styles.welcomeAdd}
            animation="bounceInUp"
            duration={2000}
            onPress={validated}
            useNativeDriver>
            <Ionicons name="ios-add" size={30} color="#171d33" />
          </AnimatedButton>

        </View>
      }


      {/* Mensagem inicial quando não tem itens cadastrados */}
      {task.length === 0 && validate !== false &&
        <View style={styles.contentInitial}>
          <Ionicons name="search-outline" size={100} color="lightgreen" />
          <Text style={styles.welcomeTitulo}>Lista vazia</Text>
          <Text style={styles.welcomeDescricao}>Vimos que sua lista está vazia, clique em adicionar tarefas para criar uma lista.</Text>

          <AnimatedButton
            style={styles.addTask}
            animation="bounceInUp"
            duration={2000}
            onPress={validated}
            useNativeDriver>
            <Text>Adicionar tarefas</Text>
          </AnimatedButton>

        </View>
      }


      <Modal animationType="slide" transparent={false} visible={openModal}>
        <SafeAreaView style={styles.box}>
          <View>
            <Text style={styles.titulo}>Criar tarefa</Text>
          </View>

          <Animatable.View
            animation="fadeInUp"
            useNativeDriver>
            <Text style={styles.stepName}>Título</Text>
            <TextInput
              style={styles.inputText}
              value={inputText}
              onChangeText={
                (texto) => setInputText(texto)
              }
            />
          </Animatable.View>

          <AnimatedButton
            style={styles.botaoFalso}
            animation="fadeInUp"
            useNativeDriver
            onPress={adicionarTask}
          >
            <Text style={styles.textoBotao}>Adicionar</Text>
          </AnimatedButton>

          <AnimatedButton
            style={styles.botaoFalso}
            animation="fadeInUp"
            useNativeDriver
            onPress={() => setOpenModal(false)}>
            <Text style={styles.textoBotao}>Voltar</Text>
          </AnimatedButton>
        </SafeAreaView>
      </Modal>

      {task.length > 0 &&
        <View>
          <View style={styles.content}>
            <Text style={styles.titulo}>Lembretes</Text>
          </View>
          <FlatList
            style={styles.lista}
            showsHorizontalScrollIndicator={false} /* Desabilita a barra de rolagem */
            data={task} /* Onde vai todos os itens da lista */
            keyExtractor={(item) => String(item.key)} /* Chave do item */
            renderItem={
              ({ item }) => <TaskList data={item} deleteTask={deleteTask} />  /* Como vai ser renderizado o item */
            }
          />

          <AnimatedButton
            style={styles.iconAdd}
            animation="bounceInUp"
            duration={2000}
            onPress={() => setOpenModal(true)}
            useNativeDriver>
            <Ionicons name="ios-add" size={30} color="#171d33" />
          </AnimatedButton>
        </View>
      }

    </SafeAreaView>
  );
}

/* Estilização */
const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#171d33'
  },

  contentInitial: {
    alignItems: 'center',
    marginTop: 180
  },

  welcomeTitulo: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold'
  },

  welcomeDescricao: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    width: 250,
    textAlign: 'justify'
  },

  welcomeAdd: {
    width: 60,
    height: 60,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },

  addTask: {
    width: 150,
    height: 40,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
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
    top: 700,
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