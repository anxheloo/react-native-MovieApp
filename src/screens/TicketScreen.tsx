import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import {baseImagePath} from '../api/apicalls';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route}) => {
  const [ticketData, setTicketData] = useState(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');

        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, [route.params]);

  // if (ticketData !== route.params && route.params != undefined) {
  //   setTicketData(route.params);
  // }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden></StatusBar>

        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}></AppHeader>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={'large'}
            color={COLORS.Orange}></ActivityIndicator>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>

      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Tickets'}
          action={() => navigation.goBack()}></AppHeader>
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon}></CustomIcon>
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>

          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray.slice(0, 4).map((item, index, arr) => {
                  return item + (index == arr.length - 1 ? '' : ', ');
                })}
              </Text>
            </View>
          </View>

          <Image
            source={require('../../android/app/src/main/assets/image/barcode.png')}
            style={styles.barcodeImage}></Image>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },

  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
    // marginBottom: SPACING.space_20 * 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  ticketBGImage: {
    // flex: 1,
    alignSelf: 'center',
    width: 250,
    aspectRatio: 250 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    // position: 'absolute',
    // top: 0,
  },

  linearGradient: {
    height: '70%',
    // justifyContent: 'flex-start',
  },

  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 2,
    width: 250,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },

  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 250,
    alignItems: 'center',
    paddingBottom: SPACING.space_28,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },

  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },

  dateTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },

  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },

  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: 10,
  },

  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },

  subtitleContainer: {
    alignItems: 'center',
  },

  subheading: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },

  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
    // posti
  },

  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
});

export default TicketScreen;
