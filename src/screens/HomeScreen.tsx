import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in getNowPlayingMoviesList', error);
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in getUpcomingMoviesList', error);
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in getPopularMoviesList', error);
  }
};

const HomeScreen = ({navigation}) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    React.useState(undefined);
  const [popularMoviesList, setPopularMoviesList] = React.useState(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = React.useState(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      let tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);

      let tempUpcomingMovies = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcomingMovies.results);
    })();
  }, []);

  // console.log(nowPlayingMovies, popularMoviesList, upcomingMoviesList);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  //Loading COmponent
  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden></StatusBar>

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction}></InputHeader>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={'large'}
            color={COLORS.Orange}></ActivityIndicator>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden></StatusBar>

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction}></InputHeader>
      </View>

      <CategoryHeader title={'Now Playing'}></CategoryHeader>
      <FlatList
        horizontal
        decelerationRate={0}
        data={nowPlayingMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.6 + SPACING.space_36}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.6 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.navigate('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width * 0.6}
              isFirst={index == 0 ? true : false}
              isLast={index == nowPlayingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}></FlatList>
      <CategoryHeader title={'Popular'}></CategoryHeader>
      <FlatList
        horizontal
        data={popularMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.navigate('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}></FlatList>
      <CategoryHeader title={'Upcoming'}></CategoryHeader>
      <FlatList
        horizontal
        data={upcomingMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.navigate('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}></FlatList>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },

  // scrollViewContainer: {
  //   flex: 1,
  // },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },

  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
