import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet,  Dimensions, ScrollView } from 'react-native';
import colors from '../../assets/colors/colors.js';
import FastImage from 'react-native-fast-image';
import { scale, moderateScale, verticalScale} from '../utils/scaling';

const imageWidth = Math.floor(moderateScale(Dimensions.get('window').width));
const imageHeight = Math.floor(imageWidth/3);

const DetailScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  let item = route.params.item;
  let imageURL = item.artworkUrl100;
  let imageBaseUrl =  imageURL.substring(0, imageURL.lastIndexOf("/") + 1);
  let imageFinalUrl = imageBaseUrl + imageWidth + 'x' + imageWidth + '.jpg';
  console.log('imageFinalUrl ===> ', imageFinalUrl);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.fastImage}
        source={{
          uri: imageFinalUrl,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={() => { setLoading(true)} }
        onLoadEnd={() => { setLoading(false)} }
        >
        <ActivityIndicator
          animating={loading}
          size="large"
          color= {colors.white}
          style={styles.activityIndicator}
        />
      </FastImage>
      <ScrollView>
      <View style={styles.textContainerView}>
        <Text style={styles.textName} numberOfLines={1}>Artist Name: {item.artistName}</Text>
        <Text style={styles.textGenreName} numberOfLines={1}>Genre Name: {item.primaryGenreName}</Text>
        <Text style={styles.textGenreName} numberOfLines={1}>Collection Price: {item.collectionPrice}</Text>
        <Text style={styles.textGenreName} numberOfLines={1}>Country: {item.country}</Text>
        <Text style={styles.textGenreName} numberOfLines={1}>Currency: {item.currency}</Text>
        <Text style={styles.textName}>Description: {item.description}</Text>
      </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  listItem: {
    margin: scale(5),
    padding: scale(5),
    backgroundColor: colors.listItem,
    width: "100%",
    flex: 1,
    alignSelf: "center",
    justifyContent: 'center',
    flexDirection: "row",
    borderRadius: 10
  },
  fastImage: {
    width: '100%',
    height: verticalScale(200),
    backgroundColor: 'black'
  },
  textContainerView: {
    flex: 1,
    margin: scale(10),
  },
  textName: {
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: 'OpenSans-Bold',
  },
  textGenreName: {
    color: colors.white,
    fontSize: moderateScale(14),
    fontFamily: 'OpenSans-Regular',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(80)
 }
});