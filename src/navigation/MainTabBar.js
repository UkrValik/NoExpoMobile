import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import colors from '../styles/colors.json';
import icomoonConfig from '../styles/selection.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const MainTabBar = ({ state, descriptors, navigation }) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#FFF',
                borderTopWidth: 2,
                borderColor: colors.midgray,
            }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });
          
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
          
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableWithoutFeedback
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                marginVertical: 2,
                            }}>
                            {options.tabBarIcon({focused: isFocused, size: 24})}
                            {
                                typeof options.tabBarLabel === 'function' ? options.tabBarLabel() :
                                <Text
                                    style={{
                                        color: isFocused ? colors.pink : colors.mainColor,
                                        fontSize: 11,
                                    }}>
                                    {label}
                                </Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
}

export default MainTabBar;
