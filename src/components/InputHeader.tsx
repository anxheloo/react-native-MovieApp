import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const InputHeader = props => {
  const [searchtext, setSearchText] = React.useState('');

  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChange={text => {
          setSearchText(text);
        }}
        value={searchtext}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}></TextInput>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => {
          props.searchFunction(searchtext);
        }}>
        <CustomIcon
          name="search"
          size={FONTSIZE.size_20}
          color={COLORS.Orange}></CustomIcon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    // alignItems: 'center',
  },

  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },

  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});

export default InputHeader;
