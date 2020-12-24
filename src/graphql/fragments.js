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
