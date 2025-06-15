import { View, Text, StyleSheet } from 'react-native';

function AssinaturaSumario({ assinaturas = [], periodo }) {
  const somaAssinatura = assinaturas.reduce((total, assinatura) => {
    const valorNumerico = typeof assinatura.valor === 'number'
      ? assinatura.valor
      : parseFloat(
          String(assinatura.valor).replace(/[^\d]/g, '')
        ) / 100 || 0;

    return total + valorNumerico;
  }, 0);

  return (
    <View style={styles.topo}>
      <Text style={styles.textoBrancoNegrito}>{periodo}</Text>
      <Text style={styles.textoBrancoNegrito}>
        R$ {somaAssinatura.toFixed(2)}
      </Text>
    </View>
  );
}

export default AssinaturaSumario;

const styles = StyleSheet.create({
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'darkgray',
  },
  textoBrancoNegrito: {
    color: 'white',
    fontWeight: 'bold',
  },
});

