import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const repositoriesData = repositories.edges.map(edge => edge.node);
      const { getByTestId } = render(<RepositoryListContainer repositories={repositoriesData} />);
      
      const kFormatter = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
      };

      repositoriesData.forEach(repoData => {
        const [formattedStars, formattedForks, formattedReviews, formattedRatings] = [repoData.stargazersCount, repoData.forksCount, repoData.reviewCount, repoData.ratingAverage ].map(kFormatter);
        expect(getByTestId(`${repoData.id}_fullName`)).toHaveTextContent(repoData.fullName);
        expect(getByTestId(`${repoData.id}_description`)).toHaveTextContent(repoData.description);
        expect(getByTestId(`${repoData.id}_language`)).toHaveTextContent(repoData.language);
        expect(getByTestId(`${repoData.id}_Stars`)).toHaveTextContent(formattedStars);
        expect(getByTestId(`${repoData.id}_Forks`)).toHaveTextContent(formattedForks);
        expect(getByTestId(`${repoData.id}_Reviews`)).toHaveTextContent(formattedReviews);
        expect(getByTestId(`${repoData.id}_Ratings`)).toHaveTextContent(formattedRatings);
      });
    });
  });
});