// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Didier Lopes',
  tagline: 'Building an open source legacy one commit at a time.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://didierlopes.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DidierRLopes', // Usually your GitHub org/user name.
  projectName: 'my-website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: 'content',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/DidierRLopes/my-website/tree/main/',
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription:
            'This is where I drop my thoughts in the form of blogposts!',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/DidierRLopes/my-website/tree/main/',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Didier Lopes.`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/goku.png',
      navbar: {
        title: 'Didier Rodrigues Lopes',
        logo: {
          alt: 'Goku NFT',
          src: 'img/goku.png',
          href: '/',
          target: '_self',
        },
        items: [
          {
            position: 'left',
            to: '/blog',
            label: 'Blog',
          },
          {
            position: 'left',
            label: 'Projects',
            to: '/projects',
          },
          {
            position: 'left',
            label: 'Books',
            to: '/books/to-read',
          },
          {
            position: 'left',
            label: 'Media',
            to: '/media/news-mentions',
          },
          {
            position: 'left',
            label: 'Resume',
            to: '/resume/experience',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      algolia: {
        appId: 'CTGM87XQE8',
        apiKey: '2b554638ed8ab85e38243a8386111965',
        indexName: 'didierlopes',
        contextualSearch: true,
        searchParameters: {},
        searchPagePath: 'search',
      },
      footer: {
        links: [
          {
            title: 'Socials',
            items: [
              {
                label: 'Twitter',
                to: 'https://twitter.com/didier_lopes',
                className: 'footer__socials',
              },
              {
                label: 'LinkedIn',
                to: 'https://www.linkedin.com/in/didier-lopes/',
                className: 'footer__socials',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/DidierRLopes',
                className: 'footer__socials',
              },
            ],
          },
          {
            title: 'Others',
            items: [
              {
                label: 'Blog',
                to: '/blog',
                className: 'footer__others',
              },
              {
                label: 'Projects',
                to: '/projects',
                className: 'footer__others',
              },
              {
                label: 'Books to read',
                to: '/books/to-read',
                className: 'footer__others',
              },
              {
                label: 'Books already read',
                to: '/books/already-read',
                className: 'footer__others',
              },
            ],
          },
          {
            title: 'Media',
            items: [
              {
                label: 'Videos on stage',
                to: '/media/on-stage',
                className: 'footer__others',
              },
              {
                label: 'Videos interviews',
                to: '/media/interviews',
                className: 'footer__others',
              },
              {
                label: 'Videos on webinars',
                to: '/media/webinars',
                className: 'footer__others',
              },
              {
                label: 'Videos on product videos',
                to: '/media/product-videos',
                className: 'footer__others',
              },
            ],
          },
          {
            title: 'Resume',
            items: [
              {
                label: 'Resume experience',
                to: '/resume/experience',
                className: 'footer__others',
              },
              {
                label: 'Resume articles',
                to: '/resume/articles',
                className: 'footer__others',
              },
              {
                label: 'Resume education',
                to: '/resume/education',
                className: 'footer__others',
              },
              {
                label: 'Resume courses',
                to: '/resume/courses',
                className: 'footer__others',
              },
            ],
          },
        ],
      },
      scripts: [
        {
          src: 'https://scripts.simpleanalyticscdn.com/latest.js',
          async: true,
          defer: true,
        },
        {
          src: 'https://www.googletagmanager.com/gtm.js?id=GTM-PL77JR5L',
          async: true,
        },
      ],
      themeConfig: {
        // ... other theme configurations
        headTags: [
          {
            tagName: 'noscript',
            innerHTML:
              '<img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" />',
          },
        ],
      },
    }),

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-T39XQ0VWEB',
        anonymizeIP: true,
      },
    ],
    // [
    //   'docusaurus-plugin-simple-analytics',
    //   {
    //     domain: 'didierlopes.com'
    //   }
    // ],
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  stylesheets: ['src/css/custom.css'],
};

module.exports = config;
