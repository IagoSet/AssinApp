import { View, Text, TextInput, StyleSheet, Pressable, Button, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../src/auth-contexto';
import { addDoc, collection, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';

function GerenciarAssinaturas({ route, navigation }) {
  const assinaturasId = route.params?.assinaturasId;
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState(0); // número
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const { uid } = useContext(AuthContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  // Função para formatar e armazenar o valor numérico
  const handleChangeValor = (text) => {
    // Remove tudo que não for número
    const onlyNumbers = text.replace(/[^\d]/g, '');
    // Divide por 100 para considerar centavos
    const number = onlyNumbers ? parseFloat(onlyNumbers) / 100 : 0;
    setValor(number);
  };

  // Valor formatado para exibir no input
  const valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  async function addAssinaturas() {
    try {
      await addDoc(collection(db, uid), {
        descricao,
        categoria,
        valor,  // valor como número
        data,
      });
      Alert.alert('Sucesso', 'Assinatura cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.log('Erro ao cadastrar assinatura:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao cadastrar a assinatura.');
    }
  }

  async function alterarAssinaturas() {
    try {
      const assinaturasRef = doc(db, uid, assinaturasId);
      await updateDoc(assinaturasRef, {
        descricao,
        categoria,
        valor,
        data,
      });
      Alert.alert('Sucesso', 'Assinatura atualizada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar assinatura:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a assinatura.');
    }
  }

  async function removerAssinaturas() {
    try {
      const assinaturasRef = doc(db, uid, assinaturasId);
      await deleteDoc(assinaturasRef);
      Alert.alert('Sucesso', 'Assinatura removida com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao remover assinatura:', error);
      Alert.alert('Erro', 'Não foi possível remover a assinatura.');
    }
  }

  useEffect(() => {
    async function buscarAssinaturas() {
      const docRef = doc(db, uid, assinaturasId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const dataDoc = snapshot.data();
        setDescricao(dataDoc.descricao);
        setCategoria(dataDoc.categoria || '');
        // Valor já vem como número, guardamos diretamente
        setValor(dataDoc.valor || 0);
        // data pode vir como Timestamp, converte para Date
        setData(dataDoc.data?.toDate ? dataDoc.data.toDate() : new Date());
      } else {
        console.log('Nenhum documento encontrado!');
      }
    }

    if (assinaturasId) {
      buscarAssinaturas();
    }
  }, [assinaturasId]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {assinaturasId ? 'Editar Assinatura' : 'Nova Assinatura'}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          placeholder="Ex: Spotify, Netflix"
          placeholderTextColor="#94A3B8"
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={categoria}
          placeholder="Ex: Streaming, Música, Jogos"
          placeholderTextColor="#94A3B8"
          onChangeText={setCategoria}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Assinatura</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={12}
          value={valorFormatado}
          placeholder="R$ 0,00"
          placeholderTextColor="#94A3B8"
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Assinatura</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text style={styles.dateText}>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker value={data} mode="date" display="default" onChange={onChange} />
        )}
      </View>

      <View style={styles.botoesContainer}>
        {assinaturasId ? (
          <>
            <View style={styles.botao}>
              <Button title="Alterar" color="#3B82F6" onPress={alterarAssinaturas} />
            </View>
            <View style={styles.botao}>
              <Button title="Remover" color="#EF4444" onPress={removerAssinaturas} />
            </View>
          </>
        ) : (
          <Button title="Cadastrar" color="#10B981" onPress={addAssinaturas} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    color: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#334155',
  },
  dateText: {
    color: '#F1F5F9',
  },
  botoesContainer: {
    marginTop: 24,
  },
  botao: {
    marginBottom: 12,
  },
});

export default GerenciarAssinaturas;
