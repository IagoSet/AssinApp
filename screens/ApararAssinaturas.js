import { useEffect, useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { AuthContext } from '../src/auth-contexto';

function ApararAssinaturas() {
  const { uid } = useContext(AuthContext);
  const [assinaturas, setAssinaturas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = onSnapshot(collection(db, uid), snapshot => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        descricao: doc.data().descricao,
        valor: doc.data().valor,
        data: doc.data().data?.toDate?.() || new Date(),
      }));
      setAssinaturas(lista);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, [uid]);

  function confirmarApagar(id) {
    Alert.alert(
      'Confirmação',
      'Deseja realmente apagar essa assinatura?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar', 
          style: 'destructive', 
          onPress: () => apagarAssinatura(id) 
        },
      ],
      { cancelable: true }
    );
  }

  async function apagarAssinatura(id) {
    try {
      await deleteDoc(doc(db, uid, id));
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar a assinatura.');
    }
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando assinaturas...</Text>
      </View>
    );
  }

  if (assinaturas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textoVazio}>Nenhuma assinatura encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assinaturas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.assinaturaItem}>
            <View>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.valor}>R$ {Number(item.valor).toFixed(2)}</Text>
            </View>
            <Pressable 
              style={styles.botaoApagar} 
              onPress={() => confirmarApagar(item.id)}
            >
              <Text style={styles.textoBotaoApagar}>remover</Text>
            </Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
  },
  assinaturaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 8,
  },
  descricao: {
    fontSize: 16,
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  botaoApagar: {
    backgroundColor: '#DC2626', 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotaoApagar: {
    color: 'white',
    fontWeight: 'bold',
  },
  separador: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CBD5E1',
  },
  textoVazio: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ApararAssinaturas;
