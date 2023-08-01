import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

const SettingComponent = props => {
  return (
    <View style={styles.container}>
      <View>
        <CustomIcon name={props.icon} style={styles.iconStyle}></CustomIcon>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subheading}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>

      <View style={styles.iconBG}>
        <CustomIcon name="arrow-right" style={styles.iconStyle}></CustomIcon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_10,
  },

  settingContainer: {
    flex: 1,
  },

  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    paddingHorizontal: SPACING.space_20,
  },

  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },

  subheading: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA15,
  },

  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA15,
  },

  iconBG: {
    justifyContent: 'center',
  },
});

export default SettingComponent;
