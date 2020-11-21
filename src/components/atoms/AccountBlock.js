import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

class AccountDropDown extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange() {
        this.props.saveBlock();
    }
    
    render() {
        return (
            <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                <Icon
                    type='material-community'
                    name='chevron-down'
                    containerStyle={{margin: 3, borderRadius: 0, backgroundColor: colors.mainColor}}
                    color={colors.mainBgColor}
                    iconStyle={{transform: [{rotate: (this.props.blockRotated ? 180 : 0) + 'deg'}]}}
                    onPress={() => this.handleChange()}
                    />
                <Text style={{textAlignVertical: 'center', color: colors.mainColor}}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

export default AccountDropDown;
