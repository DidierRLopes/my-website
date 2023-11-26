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
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DidierRLopes/my-website/tree/main/',
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription: 'This is where I drop my thoughts in the form of blogposts!',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DidierRLopes/my-website/tree/main/',
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
        // {
        // googleTagManager: {
        //   containerId: 'GTM-PL77JR5L',
        // },
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
            to: '/media/videos/on-stage',
          },
          {
            position: 'left',
            label: 'Resume',
            to: '/resume/experience',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'right'
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
      footer: {
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'Twitter',
                to: 'https://twitter.com/didier_lopes',
              },
              {
                label: 'LinkedIn',
                to: 'https://www.linkedin.com/in/didier-lopes/',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/DidierRLopes',
              },
              {
                label: 'Cal.com',
                to: 'https://cal.com/didierlopes/15min',
              },
            ],
          },
          {
            title: 'Others',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Projects',
                to: '/projects',
              },
              {
                label: 'Books to read',
                to: '/books/to-read',
              },
              {
                label: 'Books already read',
                to: '/books/already-read',
              },
            ],
          },
          {
            title: 'Media',
            items: [
              {
                label: 'Videos on stage',
                to: '/videos/on-stage',
              },
              {
                label: 'Videos interviews',
                to: '/videos/interviews',
              },
              {
                label: 'Videos on webinars',
                to: '/videos/webinars-presentations',
              },
              {
                label: 'Videos on product videos',
                to: '/videos/product-videos',
              },
            ],
          },
          {
            title: 'Resume',
            items: [
              {
                label: 'Resume experience',
                to: '/resume/experience',
              },
              {
                label: 'Resume articles',
                to: '/resume/articles',
              },
              {
                label: 'Resume education',
                to: '/resume/education',
              },
              {
                label: 'Resume courses',
                to: '/resume/courses',
              },
            ],
          },
        ],
      },
    }),

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  stylesheets: [
    "src/css/custom.css"
  ]
};

module.exports = config;
