import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnBurgersIntoPages({ graphql, actions }) {
    // 1. Get a template for this page
    const burgerTemplate = path.resolve('./src/templates/Burger.js');
    // 2. Query all burgers
    const { data } = await graphql(`
    query {
      burgers: allSanityBurger {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
    console.log(data);
    // 3. Loop over each burger and create a page for that pizza
    data.burgers.nodes.forEach((burger) => {
        actions.createPage({
            // What is the URL for this new page??
            path: `burger/${burger.slug.current}`,
            component: burgerTemplate,
            context: {
                slug: burger.slug.current,
            },
        });
    });
}

async function turnToppingsIntoPages({ graphql, actions }) {
    console.log(`Turning the Toppings into Pages!!!`);
    // 1. Get the template
    const toppingTemplate = path.resolve('./src/pages/burgers.js');
    // 2. query all the toppings
    const { data } = await graphql(`
      query {
        toppings: allSanityTopping {
          nodes {
            name
            id
          }
        }
      }
    `);
    // 3. createPage for that topping
    data.toppings.nodes.forEach((topping) => {
        console.log(`Creating page for topping`, topping.name);
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                // TODO Regex for Topping
                toppingRegex: `/${topping.name}/i`,
            },
        });
    });
    // 4. Pass topping data to pizza.js
}

async function fetchBeersAndTurnIntoNodes({
    actions,
    createNodeId,
    createContentDigest,
}) {
    // 1. Fetch a  list of beers
    const res = await fetch('https://sampleapis.com/beers/api/ale');
    const beers = await res.json();
    // 2. Loop over each one
    for (const beer of beers) {
        // create a node for each beer
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            },
        };
        // 3. Create a node for that beer
        actions.createNode({
            ...beer,
            ...nodeMeta,
        });
    }
}

async function turnBigJoeCrewIntoPages({ graphql, actions }) {
    // 1. Query all slicemasters
    const { data } = await graphql(`
      query {
        bigjoecrew: allSanityPerson {
          totalCount
          nodes {
            name
            id
            slug {
              current
            }
          }
        }
      }
    `);
    // TODO: 2. Turn each crew member into their own page (TODO)
    // 3. Figure out how many pages there are based on how many crew members there are, and how many per page!
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    console.log(
      `There are ${data.bigjoecrew.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
    );
    // 4. Loop from 1 to n and create the pages for them
    Array.from({ length: pageCount }).forEach((_, i) => {
      console.log(`Creating page ${i}`);
      actions.createPage({
        path: `/bigjoecrew/${i + 1}`,
        component: path.resolve('./src/pages/bigjoecrew.js'),
        // This data is pass to the template when we create it
        context: {
          skip: i * pageSize,
          currentPage: i + 1,
          pageSize,
        },
      });
    });
  }

export async function sourceNodes(params) {
    // fetch a list of beers and source them into our gatsby API!
    await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
    // Create pages dynamically
    // Wait for all promises to be resolved before finishing this function
    await Promise.all([
        turnBurgersIntoPages(params),
        turnToppingsIntoPages(params),
        turnBigJoeCrewIntoPages(params),
    ]);
    // 1. Burgers
    // 2. Toppings
    // 3. BigJoeCrews
}

