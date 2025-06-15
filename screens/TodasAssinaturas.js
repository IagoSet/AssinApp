import { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import AssinaturaSaida from '../components/assinaturas/AssinaturaSaida';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { AuthContext } from '../src/auth-contexto';
import { useNavigation } from '@react-navigation/native'; // IMPORTAR

function TodasAssinaturas() {
  const { uid } = useContext(AuthContext);
  const [assinaturas, setAssinaturas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigation = useNavigation(); // HOOK PARA NAVEGAÇÃO

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

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Carregando assinaturas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.titulo}>Todas as Assinaturas</Text>
        <Pressable
          style={styles.botaoAparar}
          onPress={() => navigation.navigate('ApararAssinaturas')}
        >
          <Text style={styles.textoBotao}>Remover Assinaturas</Text>
        </Pressable>
      </View>

      <AssinaturaSaida assinaturas={assinaturas} periodo={'Total'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
  },
  topBar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
  },
  botaoAparar: {
    backgroundColor: '#2563EB', // azul
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 10,  
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  loadingText: {
    marginTop: 10,
    color: '#CBD5E1',
  },
});

export default TodasAssinaturas;
