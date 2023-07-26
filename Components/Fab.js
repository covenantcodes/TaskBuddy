import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

const Fab = ({onPress}) =>{
    return (
        <TouchableOpacity 
        style={styles.fabContainer}
        onPress={onPress}
        >
            <MaterialCommunityIcons
                name="plus"
                size={34}
                color="white"
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    fabContainer: {
       backgroundColor: '#256afe',
       padding: 20,
       width: 100,
       height: 100,
       borderRadius: 50,
       alignItems: "center",
       justifyContent: "center"
    }
})

export default Fab;