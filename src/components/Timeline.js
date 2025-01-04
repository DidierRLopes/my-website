import React from 'react';

const journeyData = [
  {
    year: 2024,
    icon: "🗽",
    description: <>Moved with family again to be closer to customers in NYC.</>
  },
  {
    year: 2023,
    icon: "🇺🇸",
    description: <>Moved with family to the Bay area, to be closer to tech founders and investors.</>
  },
  {
    year: 2022,
    icon: "🦋",
    description: <>Announced OpenBB to the world and rebranded the terminal - [<a href="https://openbb.co/blog/gme-didnt-take-me-to-the-moon-but-gamestonk-terminal-did" target="_blank" rel="noreferrer">announcement</a>].</>
  },
  {
    year: 2021,
    icon: "📈",
    description: <>We raised $8.9M in a seed round to democratize investment research.</>
  },
  {
    year: 2021,
    icon: "🦍",
    description: <>Gamestonk Terminal was open source and went viral on <a href="https://www.reddit.com/r/Superstonk/comments/mx2cjh/move_over_bloomberg_terminal_here_comes_gamestonk/" target="_blank" rel="noreferrer">Reddit</a> and <a href="https://news.ycombinator.com/item?id=26258773" target="_blank" rel="noreferrer">HackerNews</a>.</>
  },
  {
    year: 2020,
    icon: "🦠",
    description: <>During Xmas my flight got cancelled. So started building a financial terminal.</>
  },
  {
    year: 2020,
    icon: "😤",
    description: <>Performing own investment research and frustrated by how time-consuming it was.</>
  },
  {
    year: 2020,
    icon: "🏃",
    description: <>Joined startup NURVV and worked as Sensor Fusion Engineer [<a href="https://ieeexplore.ieee.org/document/9680024" target="_blank" rel="noreferrer">paper</a>].</>
  },
  {
    year: 2019,
    icon: "🎓",
    description: <>Wrote code behind my math teacher's thesis on <a href="https://github.com/DidierRLopes/UnivariateTimeSeriesForecast" target="_blank" rel="noreferrer">Forecasting of Financial timeseries</a>.</>
  },
  {
    year: 2018,
    icon: "🚗",
    description: <>Excited about AI and self-driving cars, worked as Software Engineer at u-blox.</>
  },
  {
    year: 2017,
    icon: "🇬🇧",
    description: <>Moved to London for a MSc. in Control Systems at Imperial College London [<a href="https://ieeexplore.ieee.org/document/8796226" target="_blank" rel="noreferrer">paper</a>].</>
  },
  {
    year: 2016,
    icon: "🇳🇱",
    description: <>Did a semester in TU Delft and learned about self-driving cars.</>
  },
  {
    year: 2013,
    icon: "📚",
    description: <>BSc. in Electrical and Computer Engineering at FCT-UNL.</>
  },
  {
    year: 2003,
    icon: "🇵🇹",
    description: <>Moved to Portugal when I was 8yo.</>
  },
  {
    year: 1995,
    icon: "🇨🇭",
    description: <>I was born in Switzerland, but both my parents are Portuguese emigrants.</>
  }
];

const Timeline = () => {
  return (
    <ul className="mt-4 text-left pr-2">
      {journeyData.map((item) => (
        <React.Fragment key={item.year}>
          <p>
            <strong>{item.year}</strong> {item.icon} {item.description}
          </p>
          <br />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Timeline;