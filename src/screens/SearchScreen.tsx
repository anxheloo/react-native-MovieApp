import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {searchMovies, baseImagePath} from '../api/apicalls';
import SubMovieCard from '../components/SubMovieCard';
import InputHeader from '../components/InputHeader';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation, props}) => {
  const [searchList, setSearchList] = React.useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>

      <View>
        <FlatList
          data={searchList}
          keyExtractor={item => item.id}
          bounces={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction}></InputHeader>
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.navigate('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },

  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },

  centerContainer: {
    alignItems: 'center',
  },
});

export default SearchScreen;
