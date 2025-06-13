import { View, Text, StyleSheet } from 'react-native';

function AssinaturaSumario({assinaturas, periodo}){
    const somaAssinatura = assinaturas.reduce((total, assinaturas) => {
        return total + assinaturas.valor;
    }, 0);


    return (
        <View style={styles.topo}>
            <Text style={styles.textoBrancoNegrito}>{periodo}</Text>
            <Text style={styles.textoBrancoNegrito}>R$ {somaAssinatura.toFixed(2)}</Text>
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
  }
})

