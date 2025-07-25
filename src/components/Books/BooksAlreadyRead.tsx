import React from "react";
import BooksList from "../General/BooksList";

const data = [
	{
		title:
			"Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
		author: "Robert T. Kiyosaki",
		image:
			"/books/rich-dad-poor-dad-what-the-rich-teach-their-kids-about-money-that-the-poor-and-middle-class-do-not.jpeg",
	},
	{
		title:
			"The Lean Startup: How Constant Innovation Creates Radically Successful Businesses",
		author: "Eric Ries",
		image:
			"/books/the-lean-startup-how-constant-innovation-creates-radically-successful-businesses.jpeg",
	},
	{
		title:
			"The (Mis)Behaviour of Markets: A Fractal View of Risk, Ruin and Reward",
		author: "Benoit B. Mandelbrot",
		image:
			"/books/the-mis-behaviour-of-markets-a-fractal-view-of-risk-ruin-and-reward.jpeg",
	},
	{
		title: "Build: An Unorthodox Guide to Making Things Worth Making",
		author: "Tony Fadell",
		image:
			"/books/build-an-unorthodox-guide-to-making-things-worth-making.jpeg",
	},
	{
		title: "Getting Things Done: The Art of Stress-Free Productivity",
		author: "David Allen",
		image: "/books/getting-things-done-the-art-of-stress-free-productivity.jpg",
	},
	{
		title: "The Design of Everyday Things",
		author: "Donald Norman",
		image: "/books/the-design-of-everyday-things.jpeg",
	},
	{
		title:
			"What Got You Here Won't Get You There: How successful people become even more successful",
		author: "Marshall Goldsmith",
		image:
			"/books/what-got-you-here-won-t-get-you-there-how-successful-people-become-even-more-successful.jpeg",
	},
	{
		title:
			"The 15 Commitments of Conscious Leadership: A New Paradigm for Sustainable Success",
		author: "Jim Dethmer",
		image:
			"/books/the-15-commitments-of-conscious-leadership-a-new-paradigm-for-sustainable-success.jpeg",
	},
	{
		title:
			"A Random Walk Down Wall Street: The Time-Tested Strategy for Successful Investing",
		author: "Burton G. Malkiel",
		image:
			"/books/a-random-walk-down-wall-street-the-time-tested-strategy-for-successful-investing.jpeg",
	},
	{
		title: "How to Win Friends & Influence People",
		author: "Dale Carnegle",
		image: "/books/how-to-win-friends-influence-people.jpeg",
	},
	{
		title:
			"Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
		author: "James Clear",
		image:
			"/books/atomic-habits-an-easy-proven-way-to-build-good-habits-break-bad-ones.jpeg",
	},
	{
		title: "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
		author: "Eric Jorgenson, Tim Feriss",
		image:
			"/books/the-almanack-of-naval-ravikant-a-guide-to-wealth-and-happiness.jpeg",
	},
	{
		title: "Zero to One: Notes on Start Ups, or How to Build the Future",
		author: "Peter Thiel, Blake Masters",
		image:
			"/books/zero-to-one-notes-on-start-ups-or-how-to-build-the-future.jpeg",
	},
	{
		title: "High Growth Handbook: Scaling Startups from 10 to 10,000 People",
		author: "Elad Gil",
		image:
			"/books/high-growth-handbook-scaling-startups-from-10-to-10000-people.jpeg",
	},
	{
		title: "Measure What Matters: The Simple Idea that Drives 10x Growth",
		author: "John Doerr",
		image:
			"/books/measure-what-matters-the-simple-idea-that-drives-10x-growth.jpeg",
	},
	{
		title:
			"The Presentation Secrets of Steve Jobs: How to Be Insanely Great in Front of Any Audience",
		author: "Carmine Gallo",
		image:
			"/books/the-presentation-secrets-of-steve-jobs-how-to-be-insanely-great-in-front-of-any-audience.jpeg",
	},
	{
		title: "Homo Deus: A Brief History of Tomorrow",
		author: "Yuval Noah Harari",
		image: "/books/homo-deus-a-brief-history-of-tomorrow.jpeg",
	},
	{
		title: "21 Lessons for the 21st Century",
		author: "Yuval Noah Harari",
		image: "/books/21-lessons-for-the-21st-century.jpeg",
	},
	{
		title: "Sapiens: A Brief History of Humankind",
		author: "Yuval Noah Harari",
		image: "/books/sapiens-a-brief-history-of-humankind.jpeg",
	},
	{
		title:
			"Moonwalking with Einstein: The Art and Science of Remembering Everything",
		author: "Joshua Foer",
		image:
			"/books/moonwalking-with-einstein-the-art-and-science-of-remembering-everything.jpeg",
	},
	{
		title:
			"The Sales Acceleration Formula: Using Data, Technology, and Inbound Selling to Go from $0 to $100 Million",
		author: "Mark Roberge",
		image:
			"/books/the-sales-acceleration-formula-using-data-technology-and-inbound-selling-to-go-from-0-to-100-million.jpeg",
	},
	{
		title: "Hooked: How to Build Habit-Forming Products",
		author: "Nir Eyal",
		image: "/books/hooked-how-to-build-habit-forming-products.jpeg",
	},
	{
		title: "The Great CEO Within: The Tactical Guide to Company Building",
		author: "Matt Mochary",
		image:
			"/books/the-great-ceo-within-the-tactical-guide-to-company-building.jpeg",
	},
	{
		title: "Who: The A Method for Hiring",
		author: "Geoff Smart",
		image: "/books/who-the-a-method-for-hiring.jpeg",
	},
	{
		title: "Disciplined Entrepreneurship: 24 Steps to a Successful Startup",
		author: "Bill Aulet",
		image:
			"/books/disciplined-entrepreneurship-24-steps-to-a-successful-startup.jpeg",
	},
	{
		title:
			"Blitzscaling: The Lightning-Fast Path to Building Massively Valuable Companies",
		author: "Reid Hoffman",
		image:
			"/books/blitzscaling-the-lightning-fast-path-to-building-massively-valuable-companies.jpeg",
	},
	{
		title:
			"The Mom Test: How to Talk to Customers & Learn If Your Business Is a Good Idea When Everyone Is Lying to You",
		author: "Rob Fitzpatrick",
		image:
			"/books/the-mom-test-how-to-talk-to-customers-learn-if-your-business-is-a-good-idea-when-everyone-is-lying-to-you.jpeg",
	},
	{
		title:
			"The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
		author: "Morgan Housel",
		image:
			"/books/the-psychology-of-money-timeless-lessons-on-wealth-greed-and-happiness.jpeg",
	},
	{
		title:
			"Never Split the Difference: Negotiating as if Your Life Depended on It",
		author: "Chris Voss",
		image:
			"/books/never-split-the-difference-negotiating-as-if-your-life-depended-on-it.jpeg",
	},
	{
		title: "Inspired: How to Create Tech Products Customers Love",
		author: "Marty Cagan",
		image: "/books/inspired-how-to-create-tech-products-customers-love.jpeg",
	},
	{
		title:
			"The Courage to Be Disliked: The Japanese Phenomenon That Shows You How to Change Your Life and Achieve Real Happiness",
		author: "Ichiro Kishimi, Fumitake Koga",
		image:
			"/books/the-courage-to-be-disliked-the-japanese-phenomenon-that-shows-you-how-to-change-your-life-and-achieve-real-happiness.jpg",
	},
	{
		title: "To Sell Is Human: The Surprising Truth About Moving Others",
		author: "Daniel H. Pink",
		image:
			"/books/to-sell-is-human-the-surprising-truth-about-moving-others.jpeg",
	},
	{
		title:
			"No Red Lights: Reflections on Life, 50 Years in Venture Capital, and Never Driving Alone",
		author: "Alan J. Patricof",
		image:
			"/books/no-red-lights-reflections-on-life-50-years-in-venture-capital-and-never-driving-alone.jpeg",
	},
	{
		title:
			"Crossing the Chasm, 3rd Edition: Marketing and Selling Disruptive Products to Mainstream Customer",
		author: "Geoffrey A. Moore",
		image:
			"/books/crossing-the-chasm-3rd-edition-marketing-and-selling-disruptive-products-to-mainstream-customer.jpeg",
	},
	{
		title: "Principles: Life and Work",
		author: "Ray Dalio",
		image: "/books/principles-life-and-work.jpeg",
	},
	{
		title: "Refactoring UI",
		author: "Adam Wathan, Steve Schoger",
		image: "/books/refactoring-ui.jpg",
	},
	{
		title: "The intelligent investor: The Definitive Book on Value Investing",
		author: "Benjamin Graham",
		image:
			"/books/the-intelligent-investor-the-definitive-book-on-value-investing.jpeg",
	},
	{
		title: "Elon Musk",
		author: "Walter Isaacson",
		image: "/books/elon-musk.jpg",
	},
	{
		title: "Think Again: The Power of Knowing What You Don't Know",
		author: "Adam Grant",
		image: "/books/think-again-the-power-of-knowing-what-you-don-t-know.jpg",
	},
	{
		title: "Thinking, Fast and Slow",
		author: "Daniel Kahneman",
		image: "/books/thinking-fast-and-slow.jpg",
	},
	{
		title:
			"Blue Ocean Strategy, Expanded Edition: How to Create Uncontested Market Space and Make the Competition Irrelevant",
		author: "W. Chan Kim, Renée Mauborgne",
		image:
			"/books/blue-ocean-strategy-expanded-edition-how-to-create-uncontested-market-space-and-make-the-competition-irrelevant.jpeg",
	},
	{
		title:
			"The Hard Thing About Hard Things: Building a Business When There Are No Easy Answers",
		author: "Ben Horowitz",
		image:
			"/books/the-hard-thing-about-hard-things-building-a-business-when-there-are-no-easy-answers.jpeg",
	},
	{
		title:
			"From Project to Profit: How to Build a Business Around Your Open Source Project",
		author: "Heather Meeker",
		image:
			"/books/from-project-to-profit-how-to-build-a-business-around-your-open-source-project.jpg",
	},
	{
		title: "The Challenger Sale: Taking Control of the Customer Conversation",
		author: "Matthew Dixon, Brent Adamson",
		image:
			"/books/the-challenger-sale-taking-control-of-the-customer-conversation.jpeg",
	},
	{
		title:
			"Obviously Awesome: How to Nail Product Positioning so Customers Get It, Buy It, Love It",
		author: "April Dunford",
		image:
			"/books/obviously-awesome-how-to-nail-product-positioning-so-customers-get-it-buy-it-love-it.jpeg",
	},
	{
		title: "High Output Management",
		author: "Andrew S. Grove",
		image: "/books/high-output-management.jpg",
	},
	{
		title:
			"Buy Back Your Time: Get Unstuck, Reclaim Your Freedom, and Build Your Empire",
		author: "Dan Martell",
		image:
			"/books/buy-back-your-time-get-unstuck-reclaim-your-freedom-and-build-your-empire.jpg",
	},
	{
		title:
			"$100M Offers: How to Make Offers So Good People Feel Stupid Saying No",
		author: "Alex Hormozi",
		image:
			"/books/100m-offers-how-to-make-offers-so-good-people-feel-stupid-saying-no.jpeg",
	},
	{
		title:
			"Sell the Way You Buy: A Modern Approach To Sales That Actually Works (Even On You!)",
		author: "David Priemer",
		image:
			"/books/sell-the-way-you-buy-a-modern-approach-to-sales-that-actually-works-even-on-you.jpeg",
	},
	{
		title: "Empowered: Ordinary People, Extraordinary Products",
		author: "Marty Cagan",
		image: "/books/empowered-ordinary-people-extraordinary-products.jpeg",
	},
	{
		title:
			"Behind the Cloud: The Untold Story of How Salesforce.com Went from Idea to Billion-Dollar Company-and Revolutionized an Industry",
		author: "Marc Benioff, Carlye Adler",
		image:
			"/books/behind-the-cloud-the-untold-story-of-how-salesforce-com-went-from-idea-to-billion-dollar-company-and-revolutionized-an-industry.jpg",
	},
	{
		title:
			"Amp It Up: Leading for Hypergrowth by Raising Expectations, Increasing Urgency, and Elevating Intensity",
		author: "Frank Slootman",
		image:
			"/books/amp-it-up-leading-for-hypergrowth-by-raising-expectations-increasing-urgency-and-elevating-intensity.jpg",
	},
	{
		title:
			"The Ride of a Lifetime: Lessons Learned from 15 Years as CEO of the Walt Disney Company",
		author: "Robert Iger",
		image:
			"/books/the-ride-of-a-lifetime-lessons-learned-from-15-years-as-ceo-of-the-walt-disney-company.jpeg",
	},
	{
		title: "The Amazon Way: Amazon's 14 Leadership Principles",
		author: "John Rossman",
		image: "/books/the-amazon-way-amazon-s-14-leadership-principles.jpeg",
	},
	{
		title:
			"When Coffee and Kale Compete: Become great at making products people will buy",
		author: "Alan Klement",
		image:
			"/books/when-coffee-and-kale-compete-become-great-at-making-products-people-will-buy.jpeg",
	},
	{
		title:
			"Predictable Revenue: Turn Your Business Into a Sales Machine with the $100 Million Best Practices of Salesforce.com",
		author: "Aaron Ross, Marylou Tyler",
		image:
			"/books/predictable-revenue-turn-your-business-into-a-sales-machine-with-the-100-million-best-practices-of-salesforce-com.jpeg",
	},
	{
		title:
			"Competing Against Luck: The Story of Innovation and Customer Choice",
		author: "Clayton M. Christensen, Karen Dillon, Taddy Hall, David S. Duncan",
		image:
			"/books/competing-against-luck-the-story-of-innovation-and-customer-choice.jpeg",
	},
	{
		title:
			"The Innovator's Dilemma: The Revolutionary Book That Will Change the Way You Do Business",
		author: "Clayton M. Christensen",
		image:
			"/books/the-innovator-s-dilemma-the-revolutionary-book-that-will-change-the-way-you-do-business.jpg",
	},
	{
		title: "No Rules Rules: Netflix and the Culture of Reinvention",
		author: "Reed Hastings, Erin Meyer",
		image: "/books/no-rules-rules-netflix-and-the-culture-of-reinvention.jpeg",
	},
	{
		title:
			"User Story Mapping: Discover the Whole Story, Build the Right Product",
		author: "Jeff Patton",
		image:
			"/books/user-story-mapping-discover-the-whole-story-build-the-right-product.jpeg",
	},
	{
		title: "Traction: Get a Grip on Your Business",
		author: "Gino Wickman",
		image: "/books/traction-get-a-grip-on-your-business.jpeg",
	},
	{
		title:
			"The Real Madrid Way: How Values Created the Most Successful Sports Team on the Planet",
		author: "Steven G. Mandis",
		image:
			"/books/the-real-madrid-way-how-values-created-the-most-successful-sports-team-on-the-planet.jpg",
	},
	{
		title: "Start with Why: How Great Leaders Inspire Everyone to Take Action",
		author: "Simon Sinek",
		image:
			"/books/start-with-why-how-great-leaders-inspire-everyone-to-take-action.jpeg",
	},
	{
		title: "The Art of Learning: An Inner Journey to Optimal Performance",
		author: "Josh Waitzkin",
		image:
			"/books/the-art-of-learning-an-inner-journey-to-optimal-performance.jpg",
	},
	{
		title: "The Third Wave: An Entrepreneur's Vision of the Future",
		author: "Steve Case",
		image: "/books/the-third-wave-an-entrepreneur-s-vision-of-the-future.jpg",
	},
	{
		title: "Never Enough: From Barista to Billionaire",
		author: "Andrew Wilkinson",
		image: "/books/never-enough-from-barista-to-billionaire.jpg",
	},
	{
		title: "Sales Pitch: How to Craft a Story to Stand Out and Win",
		author: "April Dunford",
		image: "/books/sales-pitch-how-to-craft-a-story-to-stand-out-and-win.jpg",
	},
	{
		title: "The Black Swan: The Impact of the Highly Improbable",
		author: "Nassim Nicholas Taleb",
		image: "/books/the-black-swan-the-impact-of-the-highly-improbable.jpg",
	},
	{
		title: "Skin in the Game: Hidden Asymmetries in Daily Life",
		author: "Nassim Nicholas Taleb",
		image: "/books/skin-in-the-game-hidden-asymmetries-in-daily-life.jpg",
	},
	{
		title: "Rework",
		author: "Jason Fried, David Heinemeier Hansson",
		image: "/books/rework.jpeg",
	},
	{
		title: "Liar's Poker: Rising through the Wreckage on Wall Street",
		author: "Michael Lewis",
		image: "/books/liars-poker-rising-through-the-wreckage-on-wall-street.jpg",
	},
	{
		title: "The Beginning of Infinity: Explanations That Transform the World",
		author: "David Deutsch",
		image:
			"/books/the-beginning-of-infinity-explanations-that-transform-the-world.jpeg",
	},
	{
		title: "Thinking in Systems",
		author: "Donella H. Meadows",
		image: "/books/thinking-in-systems.jpg",
	},
	{
		title: "What It Takes: Lessons in the Pursuit of Excellence",
		author: "Stephen A. Schwarzman",
		image: "/books/what-it-takes-lessons-in-the-pursuit-of-excellence.jpg",
	},
	{
		title: "The Nvidia Way: Jensen Huang and the Making of a Tech Giant",
		author: "Tae Kim",
		image:
			"/books/the-nvidia-way-jensen-huang-and-the-making-of-a-tech-giant.jpg",
	},
	{
		title: "Founder vs Investor: The Honest Truth About Venture Capital from Startup to IPO",
		author: "Elizabeth Zalman, Jerry Neumann",
		image: "/books/founder-vs-investor-the-honest-truth-about-venture-capital-from-startup-to-ipo.jpg",
	},
	{
		title:
			"Working Backwards: Insights, Stories, and Secrets from Inside Amazon",
		author: "Colin Bryar, Bill Carr",
		image:
			"/books/working-backwards-insights-stories-and-secrets-from-inside-amazon.jpg",
	},
	{
		title: "Influence: The Psychology of Persuasion",
		author: "Robert B. Cialdini",
		image: "/books/influence-the-psychology-of-persuasion.jpeg",
	},
	{
		title: "AI Engineering: Building Applications with Foundation Models",
		author: "Chip Huyen",
		image: "/books/ai-engineering-building-applications-with-foundation-models.jpg",
	},
	{
		title: "This is Marketing: You Can't Be Seen Until You Learn to See",
		author: "Seth Godin",
		image: "/books/this-is-marketing-you-can-t-be-seen-until-you-learn-to-see.jpg",
	},
	{
		title: "The Book of Why: The New Science of Cause and Effect",
		author: "Judea Pearl, Dana Mackenzie",
		image: "/books/the-book-of-why-the-new-science-of-cause-and-effect.jpg",
	}
];

export default function BooksAlreadyRead() {
	return (
		<>
			<p>
				Most of the books I have read or listened to. 
				<br />
				Here's a thread with the ones I read in <a href="https://x.com/didier_lopes/status/1615510616025993217" target="_blank" rel="noopener noreferrer">2023</a>, in <a href="https://x.com/didier_lopes/status/1742748040220328189" target="_blank" rel="noopener noreferrer">2024</a> and in <a href="https://x.com/didier_lopes/status/1882635148694606134" target="_blank" rel="noopener noreferrer">2025</a>.
			</p>
			<BooksList books={data} />
		</>
	);
}
