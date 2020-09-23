import React from 'react';
import { graphql } from 'gatsby';
import BurgerList from '../components/BurgerList';
import ToppingsFilter from '../components/ToppingsFilter';


const BurgersPage = ({ data }) => {
    const burgers = data.burgers.nodes;
    return (
        <>
            <ToppingsFilter />
            <BurgerList burgers={burgers} />
        </>
    )
}


export const query = graphql`
  query BurgerQuery {
    burgers: allSanityBurger {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;


export default BurgersPage;