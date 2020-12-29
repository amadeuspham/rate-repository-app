import { gql } from "apollo-boost";

export const REPO_INFO_FRAGMENT = gql`
  fragment repoInfo on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const REVIEWS_FRAGMENT = gql`
  fragment reviewsData on ReviewConnection {
    edges {
      node {
        id
        text
        createdAt
        rating
        repositoryId
        user {
          username
        }
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
`;