import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../styles/colors.json';

const RatingButton = (props) => {
    return (
        <View style={{marginTop: 20, backgroundColor: colors.mainColor}}>
            <Button
                icon={{
                    name: 'chevron-right',
                    size: 15,
                    color: 'white'
                }}
                iconRight
                buttonStyle={{backgroundColor: colors.mainColor}}
                title='To rating'
                onPress={() => props.navigate('Rating')}
                />
        </View>
    );
}

export default RatingButton;
