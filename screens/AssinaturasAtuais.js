import { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebaseConnection';
import { AuthContext } from '../src/auth-contexto';

function AssinaturasRecentes() {
  const { uid } = useContext(AuthContext);
  const [assinaturas, setAssinaturas] = useState([]);

  function filtrarUltimos7Dias(lista) {
    const hoje = Date.now();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
    const limite = seteDiasAtras.getTime();

    return lista.filter((item) => {
      const data = item.data instanceof Date ? item.data.getTime() : null;
      return data && data >= limite && data <= hoje;
    });
  }

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = onSnapshot(collection(db, uid), (snapshot) => {
      const listaAssinaturas = snapshot.docs.map((doc) => {
        const dataFirestore = doc.data().data;
        return {
          id: doc.id,
          descricao: doc.data().descricao,
          valor: doc.data().valor,
          data: dataFirestore?.toDate?.() || new Date(),
        };
      });

      const ultimos7Dias = filtrarUltimos7Dias(listaAssinaturas).sort(
        (a, b) => b.data - a.data
      );

      setAssinaturas(ultimos7Dias);
    });

    return () => unsubscribe();
  }, [uid]);

  function renderItem({ item }) {
    const valorNum = Number(item.valor);
    const valorFormatado = !isNaN(valorNum) ? valorNum.toFixed(2) : '0.00';

    return (
      <View style={styles.card}>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.valor}>R$ {valorFormatado}</Text>
        <Text style={styles.data}>{item.data.toLocaleDateString('pt-BR')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Assinaturas Recentes</Text>
      {assinaturas.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma assinatura nos últimos 7 dias.</Text>
      ) : (
        <FlatList
          data={assinaturas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

export default AssinaturasRecentes;

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
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  descricao: {
    fontSize: 18,
    color: '#F9FAFB',
    fontWeight: '600',
  },
  valor: {
    fontSize: 16,
    color: '#F87171',
    fontWeight: 'bold',
    marginTop: 4,
  },
  data: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 6,
  },
  vazio: {
    marginTop: 40,
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 16,
  },
});
