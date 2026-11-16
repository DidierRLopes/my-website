// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('node:path');
const fs = require('node:fs');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Didier Lopes',
  tagline: 'Building an open source legacy one commit at a time.',
  customFields: {
    // Used for the meta, Open Graph and X descriptions of the main pages.
    description:
      'Didier Lopes builds applied AI for financial markets and founded OpenBB. Writing on AI agents, markets, open source and building companies.',
  },
  favicon: 'img/favicon.ico',
  // generated-static holds build-time thumbnails (scripts/generate-thumbnails.mjs).
  staticDirectories: ['static', 'generated-static'],

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
          // No docs sidebar: Books and Resume pages navigate with tabs at the top
          // (src/components/General/SectionTabs.tsx).
          sidebarPath: false,
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
            limit: 2000,
            copyright: `Copyright © ${new Date().getFullYear()} Didier Lopes.`,
            // createFeedItems: async (params) => {
            //   const { blogPosts, defaultCreateFeedItems, ...rest } = params;
            //   return defaultCreateFeedItems({
            //     // keep only the 10 most recent blog posts in the feed
            //     blogPosts: blogPosts, //.filter((item, index) => index < 10),
            //     ...rest,
            //   });
            // },
          },
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/pixel.css'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Default social card for pages that do not set their own.
      image: 'img/avatar-power-up.jpg',
      navbar: {
        title: 'Didier Lopes',
        logo: {
          alt: 'Didier Lopes logo',
          src: 'img/goku_pixel.png',
          href: '/',
          target: '_self',
        },
        items: [
          {
            type: 'html',
            position: 'left',
            value: '<div class="navbar__items--left-wrapper">',
          },
          {
            position: 'left',
            label: 'Books',
            to: '/books/to-read',
            activeBasePath: 'books',
          },
          {
            position: 'left',
            label: 'Media',
            to: '/media',
            activeBasePath: 'media',
          },
          {
            position: 'left',
            label: 'Resume',
            to: '/resume/experience',
            activeBasePath: 'resume',
          },
          {
            type: 'html',
            position: 'left',
            value: '</div>',
          },
          {
            position: 'left',
            label: 'Blog',
            to: '/blog',
            className: 'navbar__center-item',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash'],
      },
      // One mode: the pixel theme is drawn for its navy ground (src/css/pixel.css).
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
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
        style: 'dark',
      },
      scripts: [
        {
          src: 'https://scripts.simpleanalyticscdn.com/latest.js',
          async: true,
          defer: true,
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

  clientModules: [require.resolve('./src/js/navbar-active-links.js')],

  plugins: [
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-PL77JR5L',
      },
    ],
    async function blogLlmsPlugin(context) {
      return {
        name: 'blog-llms-plugin',
        loadContent: async () => {
          const { siteDir } = context;
          const blogDir = path.join(siteDir, 'blog');
          const blogContent = [];

          // recursive function to get all blog files
          const getBlogFiles = async (dir) => {
            const entries = await fs.promises.readdir(dir, {
              withFileTypes: true,
            });

            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory()) {
                await getBlogFiles(fullPath);
              } else if (
                entry.name.endsWith('.mdx') ||
                entry.name.endsWith('.md')
              ) {
                try {
                  const content = await fs.promises.readFile(fullPath, 'utf8');
                  blogContent.push({
                    path: path.relative(blogDir, fullPath),
                    content,
                  });
                } catch (err) {
                  console.error(`Error processing file ${fullPath}:`, err);
                }
              }
            }
          };

          await getBlogFiles(blogDir);
          return { blogContent };
        },
        postBuild: async ({ content, outDir }) => {
          if (!content || typeof content !== 'object' || !('blogContent' in content)) {
            throw new Error('Invalid content format');
          }
          const { blogContent } = content;
          if (!Array.isArray(blogContent)) {
            throw new Error('blogContent must be an array');
          }
          const { siteDir } = context;
          const staticDir = path.join(siteDir, 'static', 'blog');

          try {
            // Create directory in static folder
            await fs.promises.mkdir(staticDir, { recursive: true });

            // Generate llms.txt with blog post list
            const blogList = blogContent.map(({ path }) => {
              // Keep the original filename as title, just remove the extension
              const title = path.replace(/\.mdx?$/, '');
              // Use absolute URL with the site's base URL
              const url = `${context.siteConfig.url}/blog/${path.replace(/\.mdx?$/, '')}`;
              return `- [${title}](${url})`;
            });

            const llmsTxt = `# Blog Posts\n\n${blogList.join('\n')}`;
            await fs.promises.writeFile(
              path.join(staticDir, 'llms.txt'),
              llmsTxt
            );

            // Also write to build output directory
            const buildBlogDir = path.join(outDir, 'blog');
            await fs.promises.mkdir(buildBlogDir, { recursive: true });
            await fs.promises.writeFile(
              path.join(buildBlogDir, 'llms.txt'),
              llmsTxt
            );

            // Generate llms-full.txt with full content
            const fullContent = blogContent
              .map(({ content }) => content)
              .join('\n\n---\n\n');

            await fs.promises.writeFile(
              path.join(staticDir, 'llms-full.txt'),
              fullContent
            );

            // Also write to build output directory
            await fs.promises.writeFile(
              path.join(buildBlogDir, 'llms-full.txt'),
              fullContent
            );

            console.log('Successfully generated llms.txt and llms-full.txt files');
          } catch (err) {
            console.error('Error generating llms files:', err);
          }
        },
      };
    },
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

  markdown: {
    mermaid: true,
    mdx1Compat: {
      admonitions: true,
    },
  },
};

module.exports = config;
