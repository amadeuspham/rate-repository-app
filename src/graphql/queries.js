import { gql } from 'apollo-boost';

import { REPO_INFO_FRAGMENT } from './fragments';

export const REPOSITORIES = gql`
  query getRepositories {
    repositories {
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
  query getAuthorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;