import React from 'react';

const journeyData = [
  {
    year: 2024,
    icon: "🗽",
    description: <>Something </>
  },
  {
    year: 2023,
    icon: "🇺🇸",
    description: <>Something else</>
  },
  
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