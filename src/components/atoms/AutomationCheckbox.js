import React from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

class AutomationCheckbox extends React.Component {

    constructor(props) {
        super(props);

        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    toggleCheckbox() {
        this.props.saveSynchronizeCheckbox();
    }

    render() {

        return (
            <View style={{marginLeft: '5%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 3}}>
                    <TouchableHighlight 
                        underlayColor={colors.mainColor} 
                        onPress={() => this.toggleCheckbox()} 
                        style={{borderWidth: 2, borderColor: colors.mainColor}}>
                        <Icon
                            type='material-community'
                            name='check-bold'
                            color={this.props.synchronizeCheckbox ? colors.mainColor : colors.mainBgColor}
                            size={20}
                            />
                    </TouchableHighlight>
                    <Text style={{color: colors.mainColor, marginLeft: 10}}>
                        Synchronize with tracker data
                    </Text>
                </View>
                <View style={{margin: 5, marginLeft: '30%', flex: 1}}>
                    <Text style={{display: !this.props.synchronizeCheckbox || this.props.authorized ? 'none': 'flex', color: colors.pink, fontSize: 10}}>
                        You are not authorized to your Google Fit account
                    </Text>
                    <TouchableOpacity onPress={() => this.props.authorizeGoogleFit()} style={{backgroundColor: this.props.synchronizeCheckbox && !this.props.authorized ? colors.mainColor : colors.midgray, padding: 5}} disabled={!this.props.synchronizeCheckbox || this.props.authorized}>
                        <Text style={{color: colors.mainBgColor}}>
                            Authorize to google fit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AutomationCheckbox;
