import React from "react";
import BooksList from "../General/BooksList";

const data = [
	{
		title: "Actionable Gamification: Beyond Points, Badges and Leaderboards",
		author: "Yu-Kai Chou",
		image:
			"/books/actionable-gamification-beyond-points-badges-and-leaderboards.jpeg",
	},
	{
		title:
			"Story: Substance, Structure, Style, and the Principles of Screenwriting",
		author: "Robert McKee",
		image:
			"/books/story-substance-structure-style-and-the-principles-of-screenwriting.jpeg",
	},
	{
		title: "Lights Out: Pride, Delusion, and the Fall of General Electric",
		author: "Ted Mann, Thomas Gryta",
		image:
			"/books/lights-out-pride-delusion-and-the-fall-of-general-electric.jpeg",
	},
	{
		title:
			"The Startup Owners Manual: The Step-By-Step Guide for Building a Great Company",
		author: "Steve Blank, Bob Dorf",
		image:
			"/books/the-startup-owners-manual-the-step-by-step-guide-for-building-a-great-company.jpeg",
	},
	{
		title:
			"The Power Presenter: Technique, Style, and Strategy from Americas Top Speaking Coach",
		author: "Jerry Weissman",
		image:
			"/books/the-power-presenter-technique-style-and-strategy-from-americas-top-speaking-coach.jpeg",
	},
	{
		title: "The Hero with a Thousand Faces",
		author: "Joseph Campbell",
		image: "/books/the-hero-with-a-thousand-faces.jpeg",
	},
	{
		title:
			"Predictably Irrational, Revised and Expanded Edition: The Hidden Forces That Shape Our Decisions",
		author: "Dr. Dan Ariely",
		image:
			"/books/predictably-irrational-revised-and-expanded-edition-the-hidden-forces-that-shape-our-decisions.jpeg",
	},
	{
		title:
			"Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days",
		author: "Jake Knapp, John Zeratsky, Braden Kowitz, Dan Bittner",
		image:
			"/books/sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-day.jpeg",
	},
	{
		title: "Poor Charlie's Almanack: The Wit and Wisdom of Charles T. Munger",
		author: "Peter D. Kaufman",
		image:
			"/books/poor-charlie-s-almanack-the-wit-and-wisdom-of-charles-t-munger.jpeg",
	},
	{
		title:
			"The Voltage Effect: How to Make Good Ideas Great and Great Ideas Scale",
		author: "John A List",
		image:
			"/books/the-voltage-effect-how-to-make-good-ideas-great-and-great-ideas-scale.jpeg",
	},
	{
		title: "A Guide to the Good Life: The Ancient Art of Stoic Joy",
		author: "William B. Irvine",
		image: "/books/a-guide-to-the-good-life-the-ancient-art-of-stoic-joy.jpeg",
	},
	{
		title: "Change: How to Make Big Things Happen",
		author: "Damon Centola",
		image: "/books/change-how-to-make-big-things-happen.jpeg",
	},
	{
		title:
			"Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value",
		author: "Teresa Torres",
		image:
			"/books/continuous-discovery-habits-discover-products-that-create-customer-value-and-business-value.jpeg",
	},
	{
		title:
			"Strong Product People: A Complete Guide to Developing Great Product Managers",
		author: "Petra Wille",
		image:
			"/books/strong-product-people-a-complete-guide-to-developing-great-product-managers.jpeg",
	},
	{
		title:
			"Escaping the Build Trap: How Effective Product Management Creates Real Value",
		author: "Melissa Perri",
		image:
			"/books/escaping-the-build-trap-how-effective-product-management-creates-real-value.jpeg",
	},
	{
		title:
			"Product Leadership: How Top Product Managers Launch Awesome Products and Build Successful Teams",
		author: "Richard Banfield, Martin Eriksson, Nate Walkingshaw",
		image:
			"/books/product-leadership-how-top-product-managers-launch-awesome-products-and-build-successful-teams.jpeg",
	},
	{
		title:
			"The Inmates Are Running the Asylum: Why High Tech Products Drive Us Crazy and How to Restore the Sanity",
		author: "Alan Cooper",
		image:
			"/books/the-inmates-are-running-the-asylum-why-high-tech-products-drive-us-crazy-and-how-to-restore-the-sanity.jpeg",
	},
	{
		title:
			"Loved: How to Rethink Marketing for Tech Products (Silicon Valley Product Group)",
		author: "Martina Lauchengco, Todd Wilms, Chris Jones",
		image:
			"/books/loved-how-to-rethink-marketing-for-tech-products-silicon-valley-product-group.jpeg",
	},
	{
		title:
			"Cracking the PM Interview: How to Land a Product Manager Job in Technology",
		author: "Gayle Laakmann McDowell, Jackie Bavaro",
		image:
			"/books/cracking-the-pm-interview-how-to-land-a-product-manager-job-in-technolog.jpeg",
	},
	{
		title:
			"Cracking the PM Career: The Skills, Frameworks, and Practices To Become a Great Product Manager",
		author: "Jackie Bavaro, Gayle McDowell",
		image:
			"/books/cracking-the-pm-career-the-skills-frameworks-and-practices-to-become-a-great-product-manager.jpeg",
	},
	{
		title:
			"Thinking in Bets: Making Smarter Decisions When You Don't Have All the Facts",
		author: "Annie Duke",
		image:
			"/books/hinking-in-bets-making-smarter-decisions-when-you-don-t-have-all-the-facts.jpeg",
	},
	{
		title:
			"Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability",
		author: "Steve Krug",
		image:
			"/books/don-t-make-me-think-revisited-a-common-sense-approach-to-web-usability.jpeg",
	},
	{
		title: "Indistractable: How to Control Your Attention and Choose Your Life",
		author: "Nir Eyal",
		image:
			"/books/indistractable-how-to-control-your-attention-and-choose-your-life.jpeg",
	},
	{
		title: "Dare to Lead: Brave Work. Tough Conversations. Whole Hearts.",
		author: "Brene Brown",
		image:
			"/books/dare-to-lead-brave-work-tough-conversations-whole-hearts.jpeg",
	},
	{
		title:
			"Nudge: The Final Edition: Improving Decisions About Money, Health, and the Environment",
		author: "Richard H. Thaler, Cass R. Sunstein",
		image:
			"/books/nudge-the-final-edition-improving-decisions-about-money-health-and-the-environment.jpeg",
	},
	{
		title:
			"The Most Important Thing: Uncommon Sense for The Thoughtful Investor",
		author: "Howard Marks",
		image:
			"/books/the-most-important-thing-uncommon-sense-for-the-thoughtful-investor.jpeg",
	},
	{
		title: "Market Wizards: Interviews with Top Traders",
		author: "Jack D. Schwager",
		image: "/books/market-wizards-interviews-with-top-traders.jpeg",
	},
	{
		title: "The Alchemy of Finance",
		author: "George Soros",
		image: "/books/the-alchemy-of-finance.jpeg",
	},
	{
		title: "More Money Than God: Hedge Funds and the Making of a New Elite",
		author: "Sebastian Mallaby",
		image:
			"/books/more-money-than-god-hedge-funds-and-the-making-of-a-new-elite.jpeg",
	},
	{
		title: "Founders at Work: Stories of Startups' Early Days",
		author: "Jessica Livingston",
		image: "/books/founders-at-work-stories-of-startups-early-days.jpeg",
	},
	{
		title:
			"Radical Candor: Fully Revised & Updated Edition: Be a Kick-Ass Boss Without Losing Your Humanity",
		author: "Kim Scott",
		image:
			"/books/radical-candor-fully-revised-updated-edition-be-a-kick-ass-boss-without-losing-your-humanity.jpeg",
	},
	{
		title: "Shoe Dog: A Memoir by the Creator of Nike",
		author: "Phil Knight",
		image: "/books/shoe-dog-a-memoir-by-the-creator-of-nike.jpeg",
	},
	{
		title: "Recruiting",
		author: "Ryan Breslow",
		image: "/books/recruiting.jpeg",
	},
	{
		title:
			"The Messy Middle: Finding Your Way Through the Hardest and Most Crucial Part of Any Bold Venture",
		author: "Scott Belsky",
		image:
			"/books/the-messy-middle-finding-your-way-through-the-hardest-and-most-crucial-part-of-any-bold-venture.jpeg",
	},
	{
		title:
			"The Innovator's Solution: Creating and Sustaining Successful Growth",
		author: "Clayton M. Christensen",
		image:
			"/books/the-innovator-s-solution-creating-and-sustaining-successful-growth.jpeg",
	},
	{
		title: "Built to Sell: Creating a Business That Can Thrive Without You",
		author: "John Warrilow",
		image:
			"/books/built-to-sell-creating-a-business-that-can-thrive-without-you.jpeg",
	},
	{
		title: "Resilience: Hard-Won Wisdom for Living a Better Life",
		author: "Eric Greitens",
		image: "/books/resilience-hard-won-wisdom-for-living-a-better-life.jpeg",
	},
	{
		title: "Man's Search for Meaning",
		author: "Viktor E. Frankl",
		image: "/books/man-s-search-for-meaning.jpg",
	},
	{
		title: "The Rational Optimist: How Prosperity Evolves",
		author: "Matt Ridley",
		image: "/books/the-rational-optimist-how-prosperity-evolve.jpg",
	},
	{
		title:
			"Working in Public: The Making and Maintenance of Open Source Software",
		author: "Nadia Eghbal",
		image:
			"/books/working-in-public-the-making-and-maintenance-of-open-source-software.jpg",
	},
	{
		title: "The Challenger Sale: Taking Control of the Customer Conversation",
		author: "Matthew Dixon, Brent Adamson",
		image:
			"/books/the-challenger-sale-taking-control-of-the-customer-conversatio.jpg",
	},
	{
		title:
			"People Powered: How Communities Can Supercharge Your Business, Brand, and Teams",
		author: "Jono Bacon",
		image:
			"/books/people-powered-how-communities-can-supercharge-your-business-brand-and-teams.jpg",
	},
	{
		title:
			"Do Less Better: The Power of Strategic Sacrifice in a Complex World",
		author: "J. Bell",
		image:
			"/books/do-less-better-the-power-of-strategic-sacrifice-in-a-complex-world.jpg",
	},
	{
		title: "Traction: How Any Startup Can Achieve Explosive Customer Growth",
		author: "Gabriel Weinberg",
		image:
			"/books/traction-how-any-startup-can-achieve-explosive-customer-growth.jpg",
	},
	{
		title: "Same as Ever: A Guide to What Never Changes",
		author: "Gabriel Weinberg",
		image: "/books/same-as-ever-a-guide-to-what-never-changes.jpg",
	},
	{
		title: "The Art of War",
		author: "Sun Tzu",
		image: "/books/the-art-of-war.jpg",
	},
	{
		title: "Inspired: How to Create Tech Products Customers Love",
		author: "Marty Cagan",
		image: "/books/inspired-how-to-create-tech-products-customers-love.jpg",
	},
	{
		title: "Make Time: How to Focus on What Matters Every Day",
		author: "Jake Knapp, John Zeratsky",
		image: "/books/make-time-how-to-focus-on-what-matters-every-day.jpg",
	},
	{
		title:
			"The E-Myth Revisited: Why Most Small Businesses Don't Work and What to Do About It",
		author: "Michael E. Gerber",
		image:
			"/books/the-e-myth-revisited-why-most-small-businesses-don-t-work-and-what-to-do-about-it.jpg",
	},
	{
		title: "Radical Uncertainty",
		author: "John Kay, Mervyn King",
		image: "/books/radical-uncertainty.jpg",
	},
	{
		title: "Startup: A Silicon Valley Adventure",
		author: "Jerry Kaplan",
		image: "/books/startup-a-silicon-valley-adventure.jpg",
	},
	{
		title:
			"Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration",
		author: "Ed Catmull, Amy Wallace",
		image:
			"/books/creativity-inc-overcoming-the-unseen-forces-that-stand-in-the-way-of-true-inspiration.jpg",
	},
	{
		title: "On Writing: A Memoir of the Craft",
		author: "Stephen King",
		image: "/books/on-writing-a-memoir-of-the-craft.jpg",
	},
	{
		title: "Alchemy: The Surprising Power of Ideas That Don't Make Sense",
		author: "Rory Sutherland",
		image:
			"/books/alchemy-the-surprising-power-of-ideas-that-don-t-make-sense.jpg",
	},
	{
		title: "Badass: Making Users Awesome",
		author: "Kathy Sierra",
		image: "/books/badass-making-users-awesome.jpg",
	},
	{
		title: "The JOLT Effect: How High Performers Overcome Customer Indecision",
		author: "Matthew Dixon, Ted McKenna",
		image:
			"/books/the-jolt-effect-how-high-performers-overcome-customer-indecision.jpg",
	},
	{
		title: "Why Machines Learn: The Elegant Math Behind Modern AI",
		author: "Anil Ananthaswamy",
		image: "/books/why-machines-learn-the-elegant-math-behind-modern-ai.jpg",
	},
	{
		title: "Read Write Own: Building the Next Era of the Internet",
		author: "Chris Dixon",
		image: "/books/read-write-own-building-the-next-era-of-the-internet.jpg",
	},
	{
		title: "7 Powers: The Foundations of Business Strategy",
		author: "Hamilton Helmer",
		image: "/books/7-powers-the-foundations-of-business-strategy.jpg",
	},
	{
		title: "make: The Indie Maker Handbook",
		author: "Pieter Levels",
		image: "/books/make-the-indie-maker-handbook.jpg",
	},
	{
		title:
			"Only the Paranoid Survive: How to Exploit the Crisis Points That Challenge Every Company",
		author: "Andrew S. Grove",
		image:
			"/books/only-the-paranoid-survive-how-to-exploit-the-crisis-points-that-challenge-every-company.jpg",
	},
	{
		title: "Shape Up: Stop Running in Circles and Ship Work that Matters",
		author: "Ryan Singer",
		image:
			"/books/shape-up-stop-running-in-circles-and-ship-work-that-matters.png",
	},
	{
		title: "Writing That Works; How to Communicate Effectively In Business",
		author: "Kenneth Roman, Joel Raphaelson",
		image:
			"/books/writing-that-works-how-to-communicate-effectively-in-business.jpg",
	},
	{
		title:
			"American Kingpin: The Epic Hunt for the Criminal Mastermind Behind the Silk Road",
		author: "Nick Bilton",
		image:
			"/books/american-kingpin-the-epic-hunt-for-the-criminal-mastermind-behind-the-silk-road.jpg",
	},
	{
		title:
			"Focus: The ASML way - Inside the power struggle over the most complex machine on earth",
		author: "Marc Hijink",
		image:
			"/books/focus-the-asml-way-inside-the-power-struggle-over-the-most-complex-machine-on-earth.jpg",
	},
	{
		title: "The minimalist entrepreneur: How great founders do more with less",
		author: "Sahil Lavingia",
		image:
			"/books/the-minimalist-entrepreneur-how-great-founders-do-more-with-less.jpg",
	},
	{
		title: "The Art of Doing Science and Engineering: Learning to Learn",
		author: "Richard W. Hamming",
		image:
			"/books/the-art-of-doing-science-and-engineering-learning-to-learn.jpg",
	},
	{
		title: "Secrets of Sand Hill Road: Venture Capital and How to Get It",
		author: "Scott Kupor, Eric Ries",
		image:
			"/books/secrets-of-sand-hill-road-venture-capital-and-how-to-get-it.jpg",
	},
	{
		title: "Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist",
		author: "Brad Feld, Jason Mendelson",
		image:
			"/books/venture-deals-be-smarter-than-your-lawyer-and-venture-capitalist.jpg",
	},
	{
		title: "Design Is Storytelling",
		author: "Ellen Lupton",
		image: "/books/design-is-storytelling.jpg",
	},
	{
		title: "The Qualified Sales Leader: Proven Lessons from a Five Time CRO",
		author: "John McMahon",
		image:
			"/books/the-qualified-sales-leader-proven-lessons-from-a-five-time-cro.jpg",
	},
	{
		title: "The Lessons of History",
		author: "Will Durant, Ariel Durant",
		image: "/books/the-lessons-of-history.jpg",
	},
	{
		title: "Flow: The Psychology of Optimal Experience",
		author: "Mihaly Csikszentmihalyi",
		image: "/books/flow-the-psychology-of-optimal-experience.jpg",
	},
	{
		title: "White Collar Boxing: One Man's Journey from the Office to the Ring",
		author: "John E. Oden",
		image:
			"/books/white-collar-boxing-one-mans-journey-from-the-office-to-the-ring.jpg",
	},
	{
		title: "Get Together: How to Build a Community With Your People",
		author: "Bailey Richardson, Kevin Huynh, Kai Elmer Sotto",
		image: "/books/get-together-how-to-build-a-community-with-your-people.jpg",
	},
	{
		title: "Endurance: Shackleton's Incredible Voyage",
		author: "Alfred Lansing",
		image: "/books/endurance-shackletons-incredible-voyage.jpg",
	},
	{
		title:
			"Yield: How Google Bought, Built, and Bullied Its Way to Advertising Dominance",
		author: "Ari Paparo",
		image:
			"/books/yield-how-google-bought-built-and-bullied-its-way-to-advertising-dominance.jpg",
	},
];

export default function BooksToRead() {
	return (
		<>
			<p>
				If there is a particular book that you think I should read, feel free to
				recommend it.
			</p>
			<BooksList books={data} />
		</>
	);
}
