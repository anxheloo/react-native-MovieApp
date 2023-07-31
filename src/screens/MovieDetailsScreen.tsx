import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {baseImagePath, movieDetails, moviecastDetails} from '../api/apicalls';
import {ScrollView} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const getMovieDetails = async (movieid: number) => {
  try {
    console.log(movieDetails(movieid));
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
      console.log(movieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
      console.log(movieCastData);
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
      <StatusBar hidden></StatusBar>

      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBg}>
          <LinearGradient
            colors={[COLORS.WhiteRGBA75, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}></AppHeader>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.imageBg}>
          <Image
            source={{uri: baseImagePath('w342', movieData?.poster_path)}}
            style={styles.cardImage}></Image>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon}></CustomIcon>
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>

        <View style={styles.genreContainer}>
          {movieData?.genres.map(element => {
            return (
              <View style={styles.genreBox} key={element.id}>
                <Text style={styles.genreText}>{element.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon}></CustomIcon>
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>

        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast"></CategoryHeader>

        <FlatList
          data={movieCastData}
          keyExtractor={element => element.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <CastCard
              shouldMarginatedAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subTitle={item.character}></CastCard>
          )}></FlatList>

        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push('SeatBooking', {
                bgImage: baseImagePath('w780', movieData.backdrop_path),
                PosterImage: baseImagePath('original', movieData.poster_path),
              });
            }}>
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
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
  imageBg: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },

  linearGradient: {
    height: '100%',
  },

  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },

  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },

  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },

  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },

  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },

  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },

  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    alignSelf: 'center',
  },

  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },

  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },

  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },

  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },

  containerGap24: {
    gap: SPACING.space_24,
  },

  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },

  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

export default MovieDetailsScreen;
