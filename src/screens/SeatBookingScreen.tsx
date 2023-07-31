import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';

const timeArray = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:00'];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];

  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };

    weekdays.push(tempDate);
  }

  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];

    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };

      columnArray.push(seatObject);
      start++;
    }

    if (i == 3) {
      numColumn += 2;
    }

    if (numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -= 2;
    }

    rowArray.push(columnArray);
  }

  return rowArray;
};

const SeatBookingScreen = ({navigation, route}) => {
  const [dateArray, setDateArray] = useState(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [price, setPrice] = useState(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState();

  const selectSeat = (index, subindex, num) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }

      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  console.log(JSON.stringify(twoDSeatArray, null, 2));

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden></StatusBar>
      <View>
        <ImageBackground
          source={{uri: route.params?.bgImage}}
          style={styles.imageBackground}>
          <LinearGradient
            colors={[COLORS.WhiteRGBA15, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}></AppHeader>
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((element, subindex) => {
                  return (
                    <TouchableOpacity
                      key={element.number}
                      onPress={() => {
                        selectSeat(index, subindex, element.number);
                      }}>
                      <CustomIcon
                        name="seat"
                        style={[
                          styles.seatIcon,
                          element.taken ? {color: COLORS.Grey} : {},
                          element.selected ? {color: COLORS.Orange} : {},
                        ]}></CustomIcon>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },

  imageBackground: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },

  linearGradient: {
    height: '100%',
  },

  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },

  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
    // padding: 10,
  },

  seatContainer: {
    marginVertical: SPACING.space_20,
  },

  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },

  seatIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
});

export default SeatBookingScreen;
