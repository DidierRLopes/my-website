import React from 'react';

const booksAlreadyRead = [
  {
    title: 'Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!',
    author: 'Robert T. Kiyosaki',
    image: 'https://m.media-amazon.com/images/I/81PuKheA8xL.jpg',
  },
  {
    title: 'The Lean Startup: How Constant Innovation Creates Radically Successful Businesses',
    author: 'Eric Ries',
    image: 'https://m.media-amazon.com/images/I/81RCff1NpnL.jpg',
  },
  {
    title: 'The (Mis)Behaviour of Markets: A Fractal View of Risk, Ruin and Reward',
    author: 'Benoit B. Mandelbrot',
    image: 'https://m.media-amazon.com/images/I/81zRpVdvbQL.jpg',
  },
  {
    title: 'Build: An Unorthodox Guide to Making Things Worth Making',
    author: 'Tony Fadell',
    image: 'https://m.media-amazon.com/images/I/41YNH+7IyiL.jpg',
  },
  {
    title: 'Getting Things Done: The Art of Stress-Free Productivity',
    author: 'David Allen',
    image: 'https://m.media-amazon.com/images/I/51KNBNziJXL.jpg',
  },
  {
    title: 'The Design of Everyday Things',
    author: 'Donald Norman',
    image: 'https://m.media-amazon.com/images/I/51-yJS95QML.jpg',
  },
  {
    title: "What Got You Here Won't Get You There: How successful people become even more successful",
    author: 'Marshall Goldsmith',
    image: 'https://m.media-amazon.com/images/I/8149MPAvefL.jpg',
  },
  {
    title: 'The 15 Commitments of Conscious Leadership: A New Paradigm for Sustainable Success',
    author: 'Jim Dethmer',
    image: 'https://m.media-amazon.com/images/I/51P4fhyMkiL.jpg',
  },
  {
    title: 'A Random Walk Down Wall Street: The Time-Tested Strategy for Successful Investing',
    author: 'Burton G. Malkiel',
    image: 'https://m.media-amazon.com/images/I/51r8SHx7vSL.jpg',
  },
  {
    title: 'How to Win Friends & Influence People',
    author: 'Dale Carnegle',
    image: 'https://m.media-amazon.com/images/I/71xnkJc3-yL.jpg',
  },
  {
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    image: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
  },
  {
    title: 'The Almanack of Naval Ravikant: A Guide to Wealth and Happiness',
    author: 'Eric Jorgenson, Tim Feriss',
    image: 'https://m.media-amazon.com/images/I/713ygCSExlL.jpg',
  },
  {
    title: 'Zero to One: Notes on Start Ups, or How to Build the Future',
    author: 'Peter Thiel, Blake Masters',
    image: 'https://m.media-amazon.com/images/I/71uAI28kJuL.jpg',
  },
  {
    title: 'High Growth Handbook: Scaling Startups from 10 to 10,000 People',
    author: 'Elad Gil',
    image: 'https://m.media-amazon.com/images/I/51wn9eThjtL.jpg',
  },
  {
    title: 'Measure What Matters: The Simple Idea that Drives 10x Growth',
    author: 'John Doerr',
    image: 'https://m.media-amazon.com/images/I/714cV+wnoVL.jpg',
  },
  {
    title: 'The Presentation Secrets of Steve Jobs: How to Be Insanely Great in Front of Any Audience',
    author: 'Carmine Gallo',
    image: 'https://m.media-amazon.com/images/I/61bI31oIcUL.jpg',
  },
  {
    title: 'Homo Deus: A Brief History of Tomorrow',
    author: 'Yuval Noah Harari',
    image: 'https://m.media-amazon.com/images/I/71FX96Ae-PL.jpg',
  },
  {
    title: '21 Lessons for the 21st Century',
    author: 'Yuval Noah Harari',
    image: 'https://m.media-amazon.com/images/I/51JuPdz4L-L.jpg',
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    image: 'https://m.media-amazon.com/images/I/716E6dQ4BXL.jpg',
  },
  {
    title: 'Moonwalking with Einstein: The Art and Science of Remembering Everything',
    author: 'Joshua Foer',
    image: 'https://m.media-amazon.com/images/I/912auzYCaJL.jpg',
  },
  {
    title: 'The Sales Acceleration Formula: Using Data, Technology, and Inbound Selling to Go from $0 to $100 Million',
    author: 'Mark Roberge',
    image: 'https://m.media-amazon.com/images/I/51XqxRrTWwL.jpg',
  },
  {
    title: 'Hooked: How to Build Habit-Forming Products',
    author: 'Nir Eyal',
    image: 'https://m.media-amazon.com/images/I/613CCuI3jAL.jpg',
  },
  {
    title: 'The Great CEO Within: The Tactical Guide to Company Building',
    author: 'Matt Mochary',
    image: 'https://m.media-amazon.com/images/P/B07ZLGQZYC.01._SCLZZZZZZZ_SX500_.jpg',
  },
  {
    title: 'Who: The A Method for Hiring',
    author: 'Geoff Smart',
    image: 'https://m.media-amazon.com/images/I/81CHGn0otuL.jpg',
  },
  {
    title: 'The Lean Startup: The Million Copy Bestseller Driving Entrepreneurs to Success',
    author: 'Eric Ries',
    image: 'https://m.media-amazon.com/images/P/B005PR422K.01._SCLZZZZZZZ_SX500_.jpg',
  },
  {
    title: 'Disciplined Entrepreneurship: 24 Steps to a Successful Startup',
    author: 'Bill Aulet',
    image: 'https://m.media-amazon.com/images/I/41jCiw96BJL.jpg',
  },
  {
    title: 'Blitzscaling: The Lightning-Fast Path to Building Massively Valuable Companies',
    author: 'Reid Hoffman',
    image: 'https://m.media-amazon.com/images/I/71PVpxYp08L.jpg',
  },
  {
    title: 'The Mom Test: How to Talk to Customers & Learn If Your Business Is a Good Idea When Everyone Is Lying to You',
    author: 'Rob Fitzpatrick',
    image: 'https://m.media-amazon.com/images/I/61ixLoT4lyL.jpg',
  },
  {
    title: 'The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness',
    author: 'Morgan Housel',
    image: 'https://m.media-amazon.com/images/I/71J3+5lrCDL.jpg',
  },
  {
    title: 'Never Split the Difference: Negotiating as if Your Life Depended on It',
    author: 'Chris Voss',
    image: 'https://m.media-amazon.com/images/I/71b+W6NDruS.jpg',
  },
  {
    title: 'Inspired: How to Create Tech Products Customers Love',
    author: 'Marty Cagan',
    image: 'https://m.media-amazon.com/images/I/71cv-b7-DzL.jpg',
  },
  {
    title: 'The Courage to Be Disliked: The Japanese Phenomenon That Shows You How to Change Your Life and Achieve Real Happiness',
    author: 'Ichiro Kishimi, Fumitake Koga',
    image: 'https://m.media-amazon.com/images/I/81NPuoFXtjL.jpg',
  },
  {
    title: 'To Sell Is Human: The Surprising Truth About Moving Others',
    author: 'Daniel H. Pink',
    image: 'https://m.media-amazon.com/images/I/718nhCMkc-L.jpg',
  },
  {
    title: 'No Red Lights: Reflections on Life, 50 Years in Venture Capital, and Never Driving Alone',
    author: 'Alan J. Patricof',
    image: 'https://m.media-amazon.com/images/I/71rWw43H1rL.jpg',
  },
  {
    title: 'Crossing the Chasm, 3rd Edition: Marketing and Selling Disruptive Products to Mainstream Customer',
    author: 'Geoffrey A. Moore',
    image: 'https://m.media-amazon.com/images/I/81jRhPA6SQL.jpg',
  },
  {
    title: 'Principles: Life and Work',
    author: 'Ray Dalio',
    image: 'https://m.media-amazon.com/images/I/61aug2ORFVL.jpg',
  },
  {
    title: 'Refactoring UI',
    author: 'Adam Wathan, Steve Schoger',
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1544555766l/43190966._SX318_.jpg',
  },
];

export default function BooksAlreadyRead() {
  const booksAlreadyReadShuffled = booksAlreadyRead
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <div>
      <div className="mx-auto mt-8 md:grid md:grid-cols-2">
        {booksAlreadyReadShuffled.map((book) => (
          <div className='flex my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]'>
            <div className='w-[100px] flex justify-center items-center'>
              <img
                src={book.image}
                alt={book.title}
                style={{ width: '100px', objectFit: 'cover' }}
              />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <div className="font-bold md:text-lg" style={{ maxWidth: '200px', wordWrap: 'break-word', lineHeight: '1' }}>
                {book.title}
              </div>
              <div className="text-xs mt-2">
                {book.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};