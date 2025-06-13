import { View, Text } from 'react-native';
import AssinaturaSumario from './AssinaturaSumario';
import AssinaturaLista from './AssinaturaLista';

function AssinaturaSaida({assinaturas, periodo}){
    return (
        <View>
           <AssinaturaSumario assinaturas={assinaturas} periodo={periodo}/>
           <AssinaturaLista assinaturas={assinaturas} />
        </View>
    );
}

export default AssinaturaSaida;
