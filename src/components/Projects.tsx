import React from 'react';

const projects = [
  {
    title: 'OpenBB Terminal',
    link: 'https://github.com/OpenBB-finance/OpenBBTerminal',
    image: '/projects/openbb.webp',
    desc: 'Investment Research for Everyone, Anywhere.',
    language: 'Python',
    article: 'https://openbb.co/blog/gme-didnt-take-me-to-the-moon-but-gamestonk-terminal-did',
  },
  {
    title: 'My Website',
    link: 'https://github.com/DidierRLopes/my-website',
    image: '/projects/my_website.webp',
    desc: 'This very same personal website.',
    language: 'JavaScript',
    article: '',
  },
  {
    title: 'Step Detection using Machine Learning',
    link: 'https://github.com/DidierRLopes/step-detection-ML',
    image: '/projects/stepdetection_ml.webp',
    desc: 'Step Detection using SVM on NURVV trackers',
    language: 'Python',
    article: '/blog/how-i-wrote-a-machine-learning-paper-in-1-week-that-got-accepted-to-icmla',
  },
  {
    title: 'Univariate Time-Series Forecast',
    link: 'https://github.com/DidierRLopes/UnivariateTimeSeriesForecast',
    image: '/projects/univariate_timeseries_forecast.webp',
    desc: 'PhD Thesis: "Data Science in the Modeling and Forecasting of Financial Timeseries: from Classic methodologies to Deep Learning"',
    language: 'Python',
    article: '/blog/an-unusual-journey-learning-about-nns-for-a-phd-thesis',
  },
  {
    title: 'Meme Filter',
    link: 'https://github.com/DidierRLopes/meme-filter',
    image: '/projects/memes_filter.webp',
    desc: 'Multiplayer customizable snapchat kind of filter',
    language: 'Python',
    article: '/blog/customizable-meme-filter',
  },
  {
    title: 'Reddit Giveaway NFT Bot',
    link: 'https://github.com/DidierRLopes/GiveawayNFTbot',
    image: '/projects/giveaway_nft.webp',
    desc: 'Bot that automatically signs up to NFT giveaways on Reddit',
    language: 'Python',
    article: '/blog/how-i-created-a-bot-in-python-to-participate-in-nft-giveaways',
  },
  {
    title: 'Discord Memes',
    link: 'https://github.com/DidierRLopes/discord-memes',
    image: '/projects/discord_memes.webp',
    desc: 'Discord bot that allows to send memes with text populated',
    language: 'Python',
    article: '/blog/how-i-created-the-best-discord-meme-bot',
  },
  {
    title: 'Momentum Football Bets',
    link: 'https://github.com/DidierRLopes/momentum-football-bets',
    image: '/projects/football_momentum.webp',
    desc: 'Football bets prediction based on momentum from Honer family',
    language: 'Python',
    article: '/blog/momentum-football-bets',
  },
  {
    title: 'World Cup 2022 Sweepstake Slack bot',
    link: 'https://github.com/DidierRLopes/worldcup2022-sweepstake-slackbot',
    image: '/projects/worldcupsweepstakeslack.webp',
    desc: 'Slack channel daily update about World Cup 2022 sweepstake results',
    language: 'Python',
    article: '/blog/sweepstake-world-cup-2022-for-your-startup-team',
  },
  {
    title: 'Time-Series Cross-Validation',
    link: 'https://github.com/DidierRLopes/timeseries-cv',
    image: '/projects/timeseries_cv.webp',
    desc: 'Time-Series Cross-Validation Module',
    language: 'Python',
    article: '/blog/time-series-crossvalidation-for-nn',
  },
  {
    title: 'Personal Website',
    link: 'https://github.com/DidierRLopes/personal-website',
    image: '/projects/personal_website.webp',
    desc: 'Another personal website that I started in javascript',
    language: 'JavaScript',
    article: '',
  },
  {
    title: 'Twitter Thread to LinkedIn Carousel',
    link: 'https://github.com/DidierRLopes/thread-to-carousel',
    image: '/projects/twittercarousel.webp',
    desc: 'Convert Twitter thread into LinkedIn carousel',
    language: 'Python',
    article: '/blog/how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds',
  },
  {
    title: 'Unofficial CNN Fear and Greed Index',
    link: 'https://github.com/DidierRLopes/fear-greed-index',
    image: '/projects/feargreed.webp',
    desc: 'Python CNN Fear and Greed Index wrapper',
    language: 'Python',
    article: '',
  },
  {
    title: 'Neistpoint Stock Management Database',
    link: 'https://github.com/DidierRLopes/NeistpointCLI',
    image: '/projects/neistpoint_cli.webp',
    desc: 'Allow the clothing brand NeistPoint to manage their cloths stocks',
    language: 'Python',
    article: '/blog/neistpoint-project',
  },
  {
    title: 'Household Bills',
    link: 'https://github.com/DidierRLopes/HouseholdBills',
    image: '/projects/household_bills.webp',
    desc: 'Tracks bills between me and my brother when we lived together',
    language: 'Java',
    article: '/blog/household-bills-program',
  },
  {
    title: 'Job Analysis',
    link: 'https://github.com/DidierRLopes/JobAnalysis',
    image: '/projects/job_analysis.webp',
    desc: 'Extracts statistics from my old 9-5 job',
    language: 'Python',
    article: '',
  },
  {
    title: 'Minion Recipes Program',
    link: 'https://github.com/DidierRLopes/RecipesProgram',
    image: '/projects/recipes_program.webp',
    desc: 'Tracks favourite recipes of my mom',
    language: 'Java',
    article: '/blog/minion-recipes-program',
  },
  {
    title: 'London Visits',
    link: 'https://github.com/DidierRLopes/LondonVisit',
    image: '/projects/london_visit.webp',
    desc: 'K-means algorithm to decide what to visit in London based on days',
    language: 'Python',
    article: '/blog/k-means-clustering-to-visit-a-new-city',
  },
  {
    title: 'Sort Movies',
    link: 'https://github.com/DidierRLopes/SortMoviesPerRating',
    image: '/projects/rank_movies.webp',
    desc: 'Sort movies according to their IMDB rating',
    language: 'Python',
    article: '/blog/@dro-lopes/ranking-99-mind-f-ck-movies',
  },
  {
    title: 'Similar Stocks',
    link: 'https://github.com/DidierRLopes/similarstocks',
    image: '/projects/similar_stocks.webp',
    desc: 'Similar stocks based on their description through NLP models',
    language: 'Python',
    article: '',
  },
];

export default function Projects() {
  return (
    <div className="mx-auto mt-8">
      {projects.map((project) => (
        <div className='flex my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]'>
          <div className='w-[300px] flex justify-center items-center'>
            <img
              src={project.image}
              alt={project.title}
              className="w-[200px] object-cover"
            />
          </div>
          <div className='flex flex-col justify-between flex-grow items-start'>
            <div>
              <div className="title md:text-lg font-bold">
                {project.title}
              </div>
              <div className="subtitle text-sm flex mt-2 leading-tight max-w-[400px]">
                {project.desc}
              </div>
            </div>
            <div className="flex mt-4 mb-2 items-start">
              <a
                target="_blank"
                rel="noreferrer"
                href={project.link}
                className="mr-4 !no-underline"
              >
                <button
                  className="flex rounded-xl p-2 whitespace-nowrap text-sm bg-[#2e8555] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#2e8555] hover:no-underline"
                  type="button"
                >
                  Source code
                </button>
              </a>
              {project.article && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={project.article}
                >
                  <button
                    className="flex rounded-xl p-2 whitespace-nowrap text-sm"
                    type="button"
                  >
                    Read more
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
