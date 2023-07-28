import Reac, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {movieDetails, moviecastDetails} from '../api/apicalls';
import {ScrollView} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';

const getMovieDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in getMoviesDetails Function', error);
  }
};

const getMovieCastDetails = async (movieid: number) => {
  try {
    let response = await fetch(moviecastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getMovieCastDetails Function',
      error,
    );
  }
};

const MovieDetailsScreen = ({navigation, route}) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastData, setMovieCastData] = useState(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData);
    })();
  }, []);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'Movie Details'}
            action={() => navigation.goBack()}></AppHeader>
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
      showsVerticalScrollIndicator={false}>
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={''}
          action={() => navigation.goBack()}></AppHeader>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  scrollViewContainer: {
    flex: 1,
  },

  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
});

export default MovieDetailsScreen;
