import { gql } from 'apollo-boost';

import { REPO_INFO_FRAGMENT, REVIEWS_FRAGMENT } from './fragments';

export const REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
         ...repoInfo
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${REPO_INFO_FRAGMENT}
`;

export const AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        ...reviewsData
      }
    }
  }
  ${REVIEWS_FRAGMENT}
`;

export const SINGLE_REPOSITORY = gql`
  query singleRepository($id: ID!) {
    repository(id: $id) {
      ...repoInfo
    }
  }
  ${REPO_INFO_FRAGMENT}
`;

export const REPOSITORY_REVIEWS = gql`
  query repositoryReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...repoInfo
      reviews(first: $first, after: $after) {
        ...reviewsData
      }
    }
  }
  ${REPO_INFO_FRAGMENT}
  ${REVIEWS_FRAGMENT}
`;