import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BurgerGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const BurgerStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the pizzaStyles div, but from the  PizzaGridStyles grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;


function SingleBurger({ burger }) {
  return (
    <div>
      <Link to={`/burger/${burger.slug.current}`}>
        <h2>
          <span className="mark">{burger.name}</span>
        </h2>
        <p>{burger.toppings.map((topping) => topping.name).join(', ')}</p>
      </Link>
    </div>
  );
}

export default function BurgerList({ burgers }) {
  return (
    <div>
      {burgers.map((burger) => (
        <SingleBurger key={burger.id} burger={burger} />
      ))}
    </div>
  );
}
