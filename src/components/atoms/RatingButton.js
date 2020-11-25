import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../styles/colors.json';

const RatingButton = (props) => {
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={{backgroundColor: colors.mainColor, borderRadius: 10, paddingVertical: '5%', elevation: 5}}
                titleStyle={{fontSize: 16}}
                title='TO RATING'
                onPress={() => props.navigate('Rating')}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '13%',
        marginBottom: '20%',
        backgroundColor: colors.mainColor,
        marginHorizontal: '5%',
        borderRadius: 10,
        // paddingVertical: '5%',
        elevation: 5,
    }
})

export default RatingButton;
