import { View, Text, FlatList } from 'react-native';
import AssinaturaItem from './AssinaturaItem';


function AssinaturaLista({assinaturas}){
    return (
        <FlatList data={assinaturas} renderItem={(
            ({item}) => <AssinaturaItem item={item} />
        )} 
        keyExtractor={(item) => item.id} />

    
    );
}

export default AssinaturaLista;

