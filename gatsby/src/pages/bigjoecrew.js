import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BigJoeCrewGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const BigJoeCrewStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;


const BigJoeCrew = ({ data }) => {
    const bigjoecrew = data.bigjoecrew.nodes;
    return (
        <>
            <p>{process.env.GATSBY_PAGE_SIZE}</p>
            <p>{process.env.SANITY_TOKEN}</p>
            <BigJoeCrewGrid>
                {bigjoecrew.map((person) => (
                    <BigJoeCrewStyles>
                        <Link to={`/bigjoecrew/${person.slug.current}`}>
                            <h2>
                                <span className="mark">{person.name}</span>
                            </h2>
                        </Link>
                        <Img fluid={person.image.asset.fluid} />
                        <p className="description">{person.description}</p>
                    </BigJoeCrewStyles>
                ))}
            </BigJoeCrewGrid>
        </>
    );
}

export const query = graphql`
  query {
    bigjoecrew: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;


export default BigJoeCrew;