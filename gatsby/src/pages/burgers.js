import React from 'react';
import { graphql } from 'gatsby';
import BurgerList from '../components/BurgerList';
import ToppingsFilter from '../components/ToppingsFilter';


const BurgersPage = ({ data, pageContext}) => {
    const burgers = data.burgers.nodes;
    return (
        <>
            <ToppingsFilter activeTopping={pageContext.topping}/>
            <BurgerList burgers={burgers} />
        </>
    )
}


export const query = graphql`
  query BurgerQuery($toppingRegex: String) {
    burgers: allSanityBurger(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
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
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
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