import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import colors from '../../assets/colors/colors.js';
import songsData from '../../assets/data/songsData';
import FastImage from 'react-native-fast-image';
import { scale, moderateScale, verticalScale} from '../utils/scaling';
import Feather from 'react-native-vector-icons/Feather';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: songsData.results,
        }
    }

    shouldComponentUpdate() {
        return false
    }

    renderItem = ( data ) => {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.props.navigation.navigate('Detail', { item: data.item })}
            >
                <View style={styles.listItem}>
                    <FastImage
                        style={styles.fastImage}
                        source={{
                            uri: data.item.artworkUrl100,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={styles.textContainerView}>
                        <Text style={styles.textName}>Artist Name: {data.item.artistName}</Text>
                        <Text style={styles.textGenreName} numberOfLines={1}>Genre Name: {data.item.primaryGenreName}</Text>
                    </View>
                    <View style = {{marginHorizontal: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <Feather name="play-circle" color={colors.white} size={30} />
                    </View>
                </View>
                
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.background} />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }

};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    listItem: {
        margin: scale(5),
        padding:scale(5),
        backgroundColor: colors.listItem,
        width: "95%",
        flex: 1,
        alignSelf: "center",
        justifyContent: 'center',
        flexDirection: "row",
        borderRadius: 40
    },
    fastImage: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
    },
    textContainerView: {
        flex: 1,
        marginLeft: scale(10),
        justifyContent: 'center'
    },
    textName: {
        fontSize: moderateScale(14),
        color: colors.white,
        fontFamily: 'OpenSans-Bold',
    },
    textGenreName: {
        fontSize: moderateScale(14),
        color: colors.white,
        fontFamily: 'OpenSans-Regular',
    }
});