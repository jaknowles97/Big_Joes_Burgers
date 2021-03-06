import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import topping from '../../../sanity/schemas/topping';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countBurgersInToppings(burgers) {
  // Return the burgers with counts
  const counts = burgers
    .map((burger) => burger.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        console.log('Existing Topping', existingTopping.name);
        //  if it is, increment by 1
        existingTopping.count += 1;
      } else {
        console.log('New Topping', topping.name);
        // otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  // Get a list of all the Burgers with their toppings
  const { toppings, burgers } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      burgers: allSanityBurger {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // Count how many burgers are in each topping
  const toppingsWithCounts = countBurgersInToppings(burgers.nodes);
  console.log(toppingsWithCounts);
  // Loop over the list of toppings and display the topping and the count of burgerss in that topping
  // Link it up.. ...  . . .
  return (
    <ToppingsStyles>
        <Link to="/burgers">
            <span className="name">All</span>
            <span className="count">{burgers.nodes.length}</span>
        </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
