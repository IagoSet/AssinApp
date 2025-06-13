import { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AssinaturaSaida from '../components/assinaturas/AssinaturaSaida';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { AuthContext } from '../src/auth-contexto';

function TodasAssinaturas() {
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
      <Text style={styles.titulo}>Todas as Assinaturas</Text>
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
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
    textAlign: 'center',
    marginVertical: 12,
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
  caixa: {
    backgroundColor: '#1E3A8A', // azul escuro
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  
});

export default TodasAssinaturas;
