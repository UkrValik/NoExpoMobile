import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors.json';

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    loadingText: {
        color: colors.mainColor,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export const Loading = () => {
    return(
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color={colors.mainColor}/>
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}

export default Loading;
