import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as WebBrowser from 'expo-web-browser';
import {
  useHistory
} from "react-router-native";

const styles = StyleSheet.create({
  container: {
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
  button: {
    height: 40,
    margin: 10,
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});

const RepoIntro = ({id, fullName, description, language, ownerAvatarUrl}) => {
  const RepoHeader = ({id, fullName, description, ownerAvatarUrl}) => {
    return (
      <View style={styles.repoHeader}>
        <Image style={styles.avatar} source={{uri: ownerAvatarUrl}}/>
        <RepoIntroText id={id} fullName={fullName} description={description}/>
      </View>
    );
  };

  const RepoIntroText = ({id, fullName, description}) => {
    return (
      <View style={styles.retroText}>
        <Text fontWeight={'bold'} fontSize={'subheading'} testID={`${id}_fullName`}>{fullName}</Text>
        <Text color={'textSecondary'} fontSize={'subheading'} testID={`${id}_description`}>{description}</Text>
      </View>
    );
  };

  const RepoLanguageRow = ({id, language}) => {
    return (
      <View style={styles.repoHeader}>
        <View styles={styles.avatar}/>
        <RepoLanguage id={id} language={language}/>
      </View>
    );
  };

  const RepoLanguage = ({id, language}) => {
    return (
      <View style={styles.languageTag}>
        <Text style={styles.languageText} testID={`${id}_language`}>{language}</Text>
      </View>
    );
  };

  return (
    <View>
      <RepoHeader id={id} fullName={fullName} description={description} ownerAvatarUrl={ownerAvatarUrl}/>
      <RepoLanguageRow id={id} language={language}/>
    </View>
  );
};

const RepoStatistics = ({id, stars, forks, reviews, ratings}) => {
  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
  };

  const StatsBlock = ({id, name, number}) => {
    return (
      <View style={styles.statsBlock}>
        <Text color={'textSecondary'} testID={`${id}_${name}`}>{kFormatter(number)}</Text>
        <Text fontWeight={'bold'}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.statisticsBar}>
      <StatsBlock id={id} name={'Stars'} number={stars}/>
      <StatsBlock id={id} name={'Forks'} number={forks}/>
      <StatsBlock id={id} name={'Reviews'} number={reviews}/>
      <StatsBlock id={id} name={'Ratings'} number={ratings}/>
    </View>
  );
};

const RepositoryItem = ({repoInfo, singleView}) => {
  let history = useHistory();

  const {id, fullName, description, language, ownerAvatarUrl, stargazersCount, forksCount, reviewCount, ratingAverage, url} = repoInfo;

  const onItemClicked = (id) => {
    history.push(`/repositories/${id}`);
  };

  const onButtonClicked = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <TouchableOpacity onPress={() => onItemClicked(id)}>
      <View style={styles.container}>
        <RepoIntro 
          id={id} 
          fullName={fullName} 
          description={description} 
          language={language} 
          ownerAvatarUrl={ownerAvatarUrl}
        />
        <RepoStatistics 
          id={id}
          stars={stargazersCount} 
          forks={forksCount} 
          reviews={reviewCount} 
          ratings={ratingAverage}
        />
        {singleView && <TouchableOpacity onPress={() => onButtonClicked(url)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </View>
        </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
};

export default RepositoryItem;