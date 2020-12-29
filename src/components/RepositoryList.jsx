import React, {useState} from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 20
  },
  sortingButton: {
    marginBottom: 20
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingButton = ({setOrderBy, setOrderDirection}) => {
  const setNewSorting = (value) => {
    const [newOrderBy, newOrderDirection] = value.split('/');
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
  };

  const emptyPlaceholder = {};

  return (
    <RNPickerSelect
      placeholder={emptyPlaceholder}
      onValueChange={(value) => {
        setNewSorting(value);
      }}
      items={[
        { label: 'Latest repositories', value: 'CREATED_AT/DESC' },
        { label: 'Highest rated repositories', value: 'RATING_AVERAGE/DESC' },
        { label: 'Lowest rated repositories', value: 'RATING_AVERAGE/ASC' },
      ]}
    />
  );
};

const RepoListHeader = ({setOrderBy, setOrderDirection, searchKeyword, setSearchKeyword}) => {
  return (
    <View style={styles.header}>
      <View style={styles.sortingButton}>
        <SortingButton setOrderBy={setOrderBy} setOrderDirection={setOrderDirection}/>
      </View>
      <Searchbar
        placeholder="Search repo name or owner name"
        onChangeText={(newKeyword) => setSearchKeyword(newKeyword)}
        value={searchKeyword}
      />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {orderBy, orderDirection, setOrderBy, searchKeyword, setOrderDirection, setSearchKeyword } = this.props;
  
    return (
      <RepoListHeader 
        orderBy={orderBy} 
        orderDirection={orderDirection} 
        searchKeyword={searchKeyword}
        setOrderBy={setOrderBy} 
        setOrderDirection={setOrderDirection}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, setOrderBy, setOrderDirection, onEndReach } = this.props;

    const renderRepo = (repo) => (
      <RepositoryItem repoInfo={repo.item} />
    );

    return (
    <View>
      <SortingButton setOrderBy={setOrderBy} setOrderDirection={setOrderDirection}/>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderRepo}
        keyExtractor={repo => repo.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [ debouncedKeyword ] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories({
    orderBy, 
    orderDirection, 
    searchKeyword: debouncedKeyword,
    first: 8
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      orderBy={orderBy} 
      orderDirection={orderDirection} 
      setOrderBy={setOrderBy} 
      setOrderDirection={setOrderDirection}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;