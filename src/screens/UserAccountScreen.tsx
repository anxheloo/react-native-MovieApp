import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>

      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={'My Profile'}
          action={() => navigation.goBack()}></AppHeader>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../android/app/src/main/assets/image/avatar.png')}
          style={styles.avatarImage}></Image>
        <Text style={styles.avatarText}>John Doe</Text>
      </View>

      <View style={styles.avatarContainer}>
        <SettingComponent
          icon="user"
          heading="Acount"
          subheading="Edit Profile"
          subtitle="Change Password"></SettingComponent>

        <SettingComponent
          icon="settings"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"></SettingComponent>

        <SettingComponent
          icon="dollar"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"></SettingComponent>

        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="more..."></SettingComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },

  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },

  avatarContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.space_15,
  },

  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },

  avatarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    padding: 15,
  },
});

export default UserAccountScreen;
