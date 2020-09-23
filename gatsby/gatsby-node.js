import path from 'path';

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

export async function createPages(params) {
  // Create pages dynamically
  // 1. Burgers
  await turnBurgersIntoPages(params);
  // 2. Toppings
  // 3. BigJoeCrew
}
