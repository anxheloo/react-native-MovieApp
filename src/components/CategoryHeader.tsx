import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, SPACING, COLORS} from '../theme/theme';

const CategoryHeader = props => {
  return <Text style={styles.text}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_24,
  },
});

export default CategoryHeader;
