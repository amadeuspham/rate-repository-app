import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Image } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
    padding: 10
  },
  repoHeader: {
    display: 'flex',
    flexDirection: 'row'
  },
  retroText: {
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  avatar: {
    width: 40,
    height: 40
  },
  languageTag: {
    marginLeft: 50,
    padding: 5,
    marginVertical: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 4
  },
  languageText: {
    color: 'white'
  },
  statisticsBar : {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statsBlock: {
    display: 'flex',
    alignItems: 'center'
  },
});

const RepoIntro = ({fullName, description, language, ownerAvatarUrl}) => {
  const RepoHeader = ({fullName, description, ownerAvatarUrl}) => {
    return (
      <View style={styles.repoHeader}>
        <Image style={styles.avatar} source={{uri: ownerAvatarUrl}}/>
        <RepoIntroText fullName={fullName} description={description}/>
      </View>
    );
  };

  const RepoIntroText = ({fullName, description}) => {
    return (
      <View style={styles.retroText}>
        <Text fontWeight={'bold'} fontSize={'subheading'}>{fullName}</Text>
        <Text color={'textSecondary'} fontSize={'subheading'}>{description}</Text>
      </View>
    );
  };

  const RepoLanguageRow = ({language}) => {
    return (
      <View style={styles.repoHeader}>
        <View styles={styles.avatar}/>
        <RepoLanguage language={language}/>
      </View>
    );
  };

  const RepoLanguage = ({language}) => {
    return (
      <View style={styles.languageTag}>
        <Text style={styles.languageText}>{language}</Text>
      </View>
    );
  };

  return (
    <View>
      <RepoHeader fullName={fullName} description={description} ownerAvatarUrl={ownerAvatarUrl}/>
      <RepoLanguageRow language={language}/>
    </View>
  );
};

const RepoStatistics = ({stars, forks, reviews, ratings}) => {
  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
  };

  const StatsBlock = ({name, number}) => {
    return (
      <View style={styles.statsBlock}>
        <Text color={'textSecondary'}>{kFormatter(number)}</Text>
        <Text fontWeight={'bold'}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.statisticsBar}>
      <StatsBlock name={'Stars'} number={stars}/>
      <StatsBlock name={'Forks'} number={forks}/>
      <StatsBlock name={'Reviews'} number={reviews}/>
      <StatsBlock name={'Ratings'} number={ratings}/>
    </View>
  );
};

const RepositoryItem = ({repoInfo}) => {
  return (
    <View style={styles.container}>
      <RepoIntro fullName={repoInfo.item.fullName} description={repoInfo.item.description} language={repoInfo.item.language} ownerAvatarUrl={repoInfo.item.ownerAvatarUrl}/>
      <RepoStatistics 
        stars={repoInfo.item.stargazersCount} 
        forks={repoInfo.item.forksCount} 
        reviews={repoInfo.item.reviewCount} 
        ratings={repoInfo.item.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;