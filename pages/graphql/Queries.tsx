import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query {
    articleList(pagination: { page: 1, size: 5 }) {
      data {
        summary
        id
        title
        content
      }
    }
  }
`;
