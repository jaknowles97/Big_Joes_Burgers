import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Big Joe's Burgers`,
        siteUrl: 'https://gatsby.pizza',
        description: 'Burgers made right!',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        {
            // this is the name of the plugin you are adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '7ye8n6xs',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
};
