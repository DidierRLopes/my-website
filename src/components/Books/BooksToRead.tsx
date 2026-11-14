import React from "react";
import BooksList from "../General/BooksList";
import type { Book } from "./categories";

const data: Book[] = [
	{
		title: "Actionable Gamification: Beyond Points, Badges and Leaderboards",
		author: "Yu-Kai Chou",
		image:
			"/books/actionable-gamification-beyond-points-badges-and-leaderboards.jpeg",
		category: "design",
	},
	{
		title:
			"Story: Substance, Structure, Style, and the Principles of Screenwriting",
		author: "Robert McKee",
		image:
			"/books/story-substance-structure-style-and-the-principles-of-screenwriting.jpeg",
		category: "writing",
	},
	{
		title: "Lights Out: Pride, Delusion, and the Fall of General Electric",
		author: "Ted Mann, Thomas Gryta",
		image:
			"/books/lights-out-pride-delusion-and-the-fall-of-general-electric.jpeg",
		category: "stories",
	},
	{
		title:
			"The Startup Owners Manual: The Step-By-Step Guide for Building a Great Company",
		author: "Steve Blank, Bob Dorf",
		image:
			"/books/the-startup-owners-manual-the-step-by-step-guide-for-building-a-great-company.jpeg",
		category: "startups",
	},
	{
		title:
			"The Power Presenter: Technique, Style, and Strategy from Americas Top Speaking Coach",
		author: "Jerry Weissman",
		image:
			"/books/the-power-presenter-technique-style-and-strategy-from-americas-top-speaking-coach.jpeg",
		category: "writing",
	},
	{
		title: "The Hero with a Thousand Faces",
		author: "Joseph Campbell",
		image: "/books/the-hero-with-a-thousand-faces.jpeg",
		category: "writing",
	},
	{
		title:
			"Predictably Irrational, Revised and Expanded Edition: The Hidden Forces That Shape Our Decisions",
		author: "Dr. Dan Ariely",
		image:
			"/books/predictably-irrational-revised-and-expanded-edition-the-hidden-forces-that-shape-our-decisions.jpeg",
		category: "decisions",
	},
	{
		title:
			"Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days",
		author: "Jake Knapp, John Zeratsky, Braden Kowitz, Dan Bittner",
		image:
			"/books/sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-day.jpeg",
		category: "product",
	},
	{
		title: "Poor Charlie's Almanack: The Wit and Wisdom of Charles T. Munger",
		author: "Peter D. Kaufman",
		image:
			"/books/poor-charlie-s-almanack-the-wit-and-wisdom-of-charles-t-munger.jpeg",
		category: "investing",
	},
	{
		title:
			"The Voltage Effect: How to Make Good Ideas Great and Great Ideas Scale",
		author: "John A List",
		image:
			"/books/the-voltage-effect-how-to-make-good-ideas-great-and-great-ideas-scale.jpeg",
		category: "strategy",
	},
	{
		title: "A Guide to the Good Life: The Ancient Art of Stoic Joy",
		author: "William B. Irvine",
		image: "/books/a-guide-to-the-good-life-the-ancient-art-of-stoic-joy.jpeg",
		category: "personal-growth",
	},
	{
		title: "Change: How to Make Big Things Happen",
		author: "Damon Centola",
		image: "/books/change-how-to-make-big-things-happen.jpeg",
		category: "ideas",
	},
	{
		title:
			"Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value",
		author: "Teresa Torres",
		image:
			"/books/continuous-discovery-habits-discover-products-that-create-customer-value-and-business-value.jpeg",
		category: "product",
	},
	{
		title:
			"Strong Product People: A Complete Guide to Developing Great Product Managers",
		author: "Petra Wille",
		image:
			"/books/strong-product-people-a-complete-guide-to-developing-great-product-managers.jpeg",
		category: "product",
	},
	{
		title:
			"Escaping the Build Trap: How Effective Product Management Creates Real Value",
		author: "Melissa Perri",
		image:
			"/books/escaping-the-build-trap-how-effective-product-management-creates-real-value.jpeg",
		category: "product",
	},
	{
		title:
			"Product Leadership: How Top Product Managers Launch Awesome Products and Build Successful Teams",
		author: "Richard Banfield, Martin Eriksson, Nate Walkingshaw",
		image:
			"/books/product-leadership-how-top-product-managers-launch-awesome-products-and-build-successful-teams.jpeg",
		category: "product",
	},
	{
		title:
			"The Inmates Are Running the Asylum: Why High Tech Products Drive Us Crazy and How to Restore the Sanity",
		author: "Alan Cooper",
		image:
			"/books/the-inmates-are-running-the-asylum-why-high-tech-products-drive-us-crazy-and-how-to-restore-the-sanity.jpeg",
		category: "design",
	},
	{
		title:
			"Loved: How to Rethink Marketing for Tech Products (Silicon Valley Product Group)",
		author: "Martina Lauchengco, Todd Wilms, Chris Jones",
		image:
			"/books/loved-how-to-rethink-marketing-for-tech-products-silicon-valley-product-group.jpeg",
		category: "sales",
	},
	{
		title:
			"Cracking the PM Interview: How to Land a Product Manager Job in Technology",
		author: "Gayle Laakmann McDowell, Jackie Bavaro",
		image:
			"/books/cracking-the-pm-interview-how-to-land-a-product-manager-job-in-technolog.jpeg",
		category: "product",
	},
	{
		title:
			"Cracking the PM Career: The Skills, Frameworks, and Practices To Become a Great Product Manager",
		author: "Jackie Bavaro, Gayle McDowell",
		image:
			"/books/cracking-the-pm-career-the-skills-frameworks-and-practices-to-become-a-great-product-manager.jpeg",
		category: "product",
	},
	{
		title:
			"Thinking in Bets: Making Smarter Decisions When You Don't Have All the Facts",
		author: "Annie Duke",
		image:
			"/books/hinking-in-bets-making-smarter-decisions-when-you-don-t-have-all-the-facts.jpeg",
		category: "decisions",
	},
	{
		title:
			"Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability",
		author: "Steve Krug",
		image:
			"/books/don-t-make-me-think-revisited-a-common-sense-approach-to-web-usability.jpeg",
		category: "design",
	},
	{
		title: "Indistractable: How to Control Your Attention and Choose Your Life",
		author: "Nir Eyal",
		image:
			"/books/indistractable-how-to-control-your-attention-and-choose-your-life.jpeg",
		category: "personal-growth",
	},
	{
		title: "Dare to Lead: Brave Work. Tough Conversations. Whole Hearts.",
		author: "Brene Brown",
		image:
			"/books/dare-to-lead-brave-work-tough-conversations-whole-hearts.jpeg",
		category: "leadership",
	},
	{
		title:
			"Nudge: The Final Edition: Improving Decisions About Money, Health, and the Environment",
		author: "Richard H. Thaler, Cass R. Sunstein",
		image:
			"/books/nudge-the-final-edition-improving-decisions-about-money-health-and-the-environment.jpeg",
		category: "decisions",
	},
	{
		title:
			"The Most Important Thing: Uncommon Sense for The Thoughtful Investor",
		author: "Howard Marks",
		image:
			"/books/the-most-important-thing-uncommon-sense-for-the-thoughtful-investor.jpeg",
		category: "investing",
	},
	{
		title: "Market Wizards: Interviews with Top Traders",
		author: "Jack D. Schwager",
		image: "/books/market-wizards-interviews-with-top-traders.jpeg",
		category: "wall-street",
	},
	{
		title: "The Alchemy of Finance",
		author: "George Soros",
		image: "/books/the-alchemy-of-finance.jpeg",
		category: "wall-street",
	},
	{
		title: "Founders at Work: Stories of Startups' Early Days",
		author: "Jessica Livingston",
		image: "/books/founders-at-work-stories-of-startups-early-days.jpeg",
		category: "startups",
	},
	{
		title:
			"Radical Candor: Fully Revised & Updated Edition: Be a Kick-Ass Boss Without Losing Your Humanity",
		author: "Kim Scott",
		image:
			"/books/radical-candor-fully-revised-updated-edition-be-a-kick-ass-boss-without-losing-your-humanity.jpeg",
		category: "leadership",
	},
	{
		title: "Recruiting",
		author: "Ryan Breslow",
		image: "/books/recruiting.jpeg",
		category: "leadership",
	},
	{
		title:
			"The Messy Middle: Finding Your Way Through the Hardest and Most Crucial Part of Any Bold Venture",
		author: "Scott Belsky",
		image:
			"/books/the-messy-middle-finding-your-way-through-the-hardest-and-most-crucial-part-of-any-bold-venture.jpeg",
		category: "startups",
	},
	{
		title:
			"The Innovator's Solution: Creating and Sustaining Successful Growth",
		author: "Clayton M. Christensen",
		image:
			"/books/the-innovator-s-solution-creating-and-sustaining-successful-growth.jpeg",
		category: "strategy",
	},
	{
		title: "Built to Sell: Creating a Business That Can Thrive Without You",
		author: "John Warrilow",
		image:
			"/books/built-to-sell-creating-a-business-that-can-thrive-without-you.jpeg",
		category: "startups",
	},
	{
		title: "Resilience: Hard-Won Wisdom for Living a Better Life",
		author: "Eric Greitens",
		image: "/books/resilience-hard-won-wisdom-for-living-a-better-life.jpeg",
		category: "personal-growth",
	},
	{
		title: "Man's Search for Meaning",
		author: "Viktor E. Frankl",
		image: "/books/man-s-search-for-meaning.jpg",
		category: "personal-growth",
	},
	{
		title: "The Rational Optimist: How Prosperity Evolves",
		author: "Matt Ridley",
		image: "/books/the-rational-optimist-how-prosperity-evolve.jpg",
		category: "ideas",
	},
	{
		title:
			"Working in Public: The Making and Maintenance of Open Source Software",
		author: "Nadia Eghbal",
		image:
			"/books/working-in-public-the-making-and-maintenance-of-open-source-software.jpg",
		category: "open-source",
	},
	{
		title:
			"People Powered: How Communities Can Supercharge Your Business, Brand, and Teams",
		author: "Jono Bacon",
		image:
			"/books/people-powered-how-communities-can-supercharge-your-business-brand-and-teams.jpg",
		category: "open-source",
	},
	{
		title:
			"Do Less Better: The Power of Strategic Sacrifice in a Complex World",
		author: "J. Bell",
		image:
			"/books/do-less-better-the-power-of-strategic-sacrifice-in-a-complex-world.jpg",
		category: "personal-growth",
	},
	{
		title: "Traction: How Any Startup Can Achieve Explosive Customer Growth",
		author: "Gabriel Weinberg",
		image:
			"/books/traction-how-any-startup-can-achieve-explosive-customer-growth.jpg",
		category: "sales",
	},
	{
		title: "Same as Ever: A Guide to What Never Changes",
		author: "Morgan Housel",
		image: "/books/same-as-ever-a-guide-to-what-never-changes.jpg",
		category: "decisions",
	},
	{
		title: "The Art of War",
		author: "Sun Tzu",
		image: "/books/the-art-of-war.jpg",
		category: "strategy",
	},
	{
		title: "Make Time: How to Focus on What Matters Every Day",
		author: "Jake Knapp, John Zeratsky",
		image: "/books/make-time-how-to-focus-on-what-matters-every-day.jpg",
		category: "personal-growth",
	},
	{
		title:
			"The E-Myth Revisited: Why Most Small Businesses Don't Work and What to Do About It",
		author: "Michael E. Gerber",
		image:
			"/books/the-e-myth-revisited-why-most-small-businesses-don-t-work-and-what-to-do-about-it.jpg",
		category: "startups",
	},
	{
		title: "Radical Uncertainty",
		author: "John Kay, Mervyn King",
		image: "/books/radical-uncertainty.jpg",
		category: "decisions",
	},
	{
		title: "Startup: A Silicon Valley Adventure",
		author: "Jerry Kaplan",
		image: "/books/startup-a-silicon-valley-adventure.jpg",
		category: "stories",
	},
	{
		title:
			"Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration",
		author: "Ed Catmull, Amy Wallace",
		image:
			"/books/creativity-inc-overcoming-the-unseen-forces-that-stand-in-the-way-of-true-inspiration.jpg",
		category: "leadership",
	},
	{
		title: "Badass: Making Users Awesome",
		author: "Kathy Sierra",
		image: "/books/badass-making-users-awesome.jpg",
		category: "design",
	},
	{
		title: "The JOLT Effect: How High Performers Overcome Customer Indecision",
		author: "Matthew Dixon, Ted McKenna",
		image:
			"/books/the-jolt-effect-how-high-performers-overcome-customer-indecision.jpg",
		category: "sales",
	},
	{
		title: "Why Machines Learn: The Elegant Math Behind Modern AI",
		author: "Anil Ananthaswamy",
		image: "/books/why-machines-learn-the-elegant-math-behind-modern-ai.jpg",
		category: "ai-data",
	},
	{
		title: "Read Write Own: Building the Next Era of the Internet",
		author: "Chris Dixon",
		image: "/books/read-write-own-building-the-next-era-of-the-internet.jpg",
		category: "strategy",
	},
	{
		title: "7 Powers: The Foundations of Business Strategy",
		author: "Hamilton Helmer",
		image: "/books/7-powers-the-foundations-of-business-strategy.jpg",
		category: "strategy",
	},
	{
		title: "make: The Indie Maker Handbook",
		author: "Pieter Levels",
		image: "/books/make-the-indie-maker-handbook.jpg",
		category: "startups",
	},
	{
		title:
			"Only the Paranoid Survive: How to Exploit the Crisis Points That Challenge Every Company",
		author: "Andrew S. Grove",
		image:
			"/books/only-the-paranoid-survive-how-to-exploit-the-crisis-points-that-challenge-every-company.jpg",
		category: "strategy",
	},
	{
		title: "Shape Up: Stop Running in Circles and Ship Work that Matters",
		author: "Ryan Singer",
		image:
			"/books/shape-up-stop-running-in-circles-and-ship-work-that-matters.png",
		category: "product",
	},
	{
		title: "Writing That Works; How to Communicate Effectively In Business",
		author: "Kenneth Roman, Joel Raphaelson",
		image:
			"/books/writing-that-works-how-to-communicate-effectively-in-business.jpg",
		category: "writing",
	},
	{
		title:
			"American Kingpin: The Epic Hunt for the Criminal Mastermind Behind the Silk Road",
		author: "Nick Bilton",
		image:
			"/books/american-kingpin-the-epic-hunt-for-the-criminal-mastermind-behind-the-silk-road.jpg",
		category: "stories",
	},
	{
		title:
			"Focus: The ASML way - Inside the power struggle over the most complex machine on earth",
		author: "Marc Hijink",
		image:
			"/books/focus-the-asml-way-inside-the-power-struggle-over-the-most-complex-machine-on-earth.jpg",
		category: "stories",
	},
	{
		title: "The minimalist entrepreneur: How great founders do more with less",
		author: "Sahil Lavingia",
		image:
			"/books/the-minimalist-entrepreneur-how-great-founders-do-more-with-less.jpg",
		category: "startups",
	},
	{
		title: "Secrets of Sand Hill Road: Venture Capital and How to Get It",
		author: "Scott Kupor, Eric Ries",
		image:
			"/books/secrets-of-sand-hill-road-venture-capital-and-how-to-get-it.jpg",
		category: "venture",
	},
	{
		title: "Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist",
		author: "Brad Feld, Jason Mendelson",
		image:
			"/books/venture-deals-be-smarter-than-your-lawyer-and-venture-capitalist.jpg",
		category: "venture",
	},
	{
		title: "Design Is Storytelling",
		author: "Ellen Lupton",
		image: "/books/design-is-storytelling.jpg",
		category: "design",
	},
	{
		title: "The Qualified Sales Leader: Proven Lessons from a Five Time CRO",
		author: "John McMahon",
		image:
			"/books/the-qualified-sales-leader-proven-lessons-from-a-five-time-cro.jpg",
		category: "sales",
	},
	{
		title: "The Lessons of History",
		author: "Will Durant, Ariel Durant",
		image: "/books/the-lessons-of-history.jpg",
		category: "ideas",
	},
	{
		title: "Flow: The Psychology of Optimal Experience",
		author: "Mihaly Csikszentmihalyi",
		image: "/books/flow-the-psychology-of-optimal-experience.jpg",
		category: "personal-growth",
	},
	{
		title: "White Collar Boxing: One Man's Journey from the Office to the Ring",
		author: "John E. Oden",
		image:
			"/books/white-collar-boxing-one-mans-journey-from-the-office-to-the-ring.jpg",
		category: "personal-growth",
	},
	{
		title: "Get Together: How to Build a Community With Your People",
		author: "Bailey Richardson, Kevin Huynh, Kai Elmer Sotto",
		image: "/books/get-together-how-to-build-a-community-with-your-people.jpg",
		category: "open-source",
	},
	{
		title: "Endurance: Shackleton's Incredible Voyage",
		author: "Alfred Lansing",
		image: "/books/endurance-shackletons-incredible-voyage.jpg",
		category: "stories",
	},
	{
		title: "Enough: True Measures of Money, Business, and Life",
		author: "John C. Bogle",
		image: "/books/enough-true-measures-of-money-business-and-life.jpg",
		category: "investing",
	},
	{
		title: "Open: An Autobiography",
		author: "Andre Agassi",
		image: "/books/open-an-autobiography.jpg",
		category: "stories",
	},
	{
		title: "Made in Japan: Akio Morita and Sony",
		author: "Akio Morita",
		image: "/books/made-in-japan-akio-morita-and-sony.jpg",
		category: "stories",
	},
	{
		title: "Sam Walton: Made in America",
		author: "Sam Walton",
		image: "/books/sam-walton-made-in-america.jpg",
		category: "stories",
	},
	{
		title: "The Making of Prince of Persia: Journals 1985-1993",
		author: "Jordan Mechner",
		image: "/books/the-making-of-prince-of-persia.jpg",
		category: "stories",
	},
	{
		title: "The Power of Regret: How Looking Backward Moves Us Forward",
		author: "Daniel H. Pink",
		image:
			"/books/the-power-of-regret-how-looking-backward-moves-us-forward.jpg",
		category: "personal-growth",
	},
	{
		title:
			"Scale: The Universal Laws of Growth, Innovation, Sustainability, and the Pace of Life in Organisms, Cities, Economies, and Companies",
		author: "Geoffrey West",
		image:
			"/books/scale-the-universal-laws-of-growth-innovation-sustainability.jpg",
		category: "ideas",
	},
	{
		title: "Why Greatness Cannot Be Planned: The Myth of the Objective",
		author: "Kenneth O. Stanley, Joel Lehman",
		image:
			"/books/why-greatness-cannot-be-planned-the-myth-of-the-objective.jpg",
		category: "ideas",
	},
	{
		title: "A Message to Garcia",
		author: "Elbert Hubbard",
		image: "/books/a-message-to-garcia.jpg",
		category: "personal-growth",
	},
	{
		title:
			"The WEIRDest People in the World: How the West Became Psychologically Peculiar and Particularly Prosperous",
		author: "Joseph Henrich",
		image: "/books/the-weirdest-people-in-the-world.jpg",
		category: "ideas",
	},
	{
		title: "In The Plex: How Google Thinks, Works, and Shapes Our Lives",
		author: "Steven Levy",
		image: "/books/in-the-plex.jpg",
		category: "stories",
	},
	{
		title: "Supremacy: AI, ChatGPT, and the Race that Will Change the World",
		author: "Parmy Olson",
		image: "/books/supremacy.jpg",
		category: "stories",
	},
	{
		title:
			"Genius Makers: The Mavericks Who Brought AI to Google, Facebook, and the World",
		author: "Cade Metz",
		image: "/books/genius-makers.jpg",
		category: "stories",
	},
	{
		title: "Hard Drive: Bill Gates and the Making of the Microsoft Empire",
		author: "James Wallace, Jim Erickson",
		image: "/books/hard-drive.jpg",
		category: "stories",
	},
	{
		title:
			"In the Company of Giants: Candid Conversations with the Visionaries of the Digital World",
		author: "Rama Dev Jager, Rafael Ortiz",
		image: "/books/in-the-company-of-giants.jpg",
		category: "stories",
	},
	{
		title:
			"Tao of Charlie Munger: A Compilation of Quotes from Berkshire Hathaway's Vice Chairman on Life, Business, and the Pursuit of Wealth",
		author: "David Clark",
		image: "/books/tao-of-charlie-munger.jpg",
		category: "investing",
	},
	{
		title:
			"Self-Esteem: A Proven Program of Cognitive Techniques for Assessing, Improving, and Maintaining Your Self-Esteem",
		author: "Matthew McKay, Patrick Fanning",
		image: "/books/self-esteem.jpg",
		category: "personal-growth",
	},
	{
		title: "From Third World to First: Singapore and the Asian Economic Boom",
		author: "Lee Kuan Yew",
		image: "/books/from-third-world-to-first.jpg",
		category: "ideas",
	},
	{
		title:
			"How Economics Explains the World: A Short History of Humanity: A Brief and Powerful Economic History with Timeless Lessons, Learn How Markets Mold Society",
		author: "Andrew Leigh",
		image: "/books/how-economics-explains-the-world.jpg",
		category: "ideas",
	},
	{
		title: "Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets",
		author: "Nassim Nicholas Taleb",
		image: "/books/fooled-by-randomness.jpg",
		category: "decisions",
	},
	{
		title: "Invention: A Life",
		author: "James Dyson",
		image: "/books/invention-a-life.jpg",
		category: "stories",
	},
	{
		title: "Outlive: The Science and Art of Longevity",
		author: "Peter Attia, Bill Gifford",
		image: "/books/outlive-the-science-and-art-of-longevity.jpg",
		category: "personal-growth",
	},
	{
		title: "Designing Your Life: How to Build a Well-Lived, Joyful Life",
		author: "Bill Burnett, Dave Evans",
		image: "/books/designing-your-life-how-to-build-a-well-lived-joyful-life.jpg",
		category: "personal-growth",
	},
	{
		title: "Pachinko",
		author: "Min Jin Lee",
		image: "/books/pachinko.jpg",
		category: "fiction",
	},
	{
		title: "Range: Why Generalists Triumph in a Specialized World",
		author: "David Epstein",
		image: "/books/range-why-generalists-triumph-in-a-specialized-world.jpg",
		category: "personal-growth",
	},
	{
		title: "Playing to Win: How Strategy Really Works",
		author: "A.G. Lafley, Roger L. Martin",
		image: "/books/playing-to-win-how-strategy-really-works.jpg",
		category: "strategy",
	},
	{
		title: "The Goal: A Process of Ongoing Improvement",
		author: " Eliyahu M Goldratt, Jeff Cox ",
		image: "/books/the-goal-a-process-of-ongoing-improvement.jpg",
		category: "leadership",
	},
	{
		title: "Conscious Business: How to Build Value Through Values",
		author: "Fred Kofman",
		image: "/books/conscious-business-how-to-build-value-through-values.jpg",
		category: "leadership",
	},
	{
		title: "The Effective Executive: The Definitive Guide to Getting the Right Things Done",
		author: "Peter Drucker",
		image: "/books/the-effective-executive-the-definitive-guide-to-getting-the-right-things-done.jpg",
		category: "leadership",
	},
	{
		title: "Steve Jobs",
		author: "Walter Isaacson",
		image: "/books/steve-jobs.jpg",
		category: "stories",
	},
	{
		title: "Scythe (Arc of a Scythe)",
		author: "Neal Shusterman",
		image: "/books/scythe.jpg",
		category: "fiction",
	},
	{
		title: "The Zero Marginal Cost Society: The Internet of Things, the Collaborative Commons, and the Eclipse of Capitalism",
		author: "Jeremy Rifkin",
		image: "/books/the-zero-marginal-cost-society-the-internet-of-things-the-collaborative-commons-and-the-eclipse-of-capitalism.jpg",
		category: "ideas",
	},
	{
		title: "The Wealthy Barber, Updated 3rd Edition: Everyone's Commonsense Guide to Becoming Financially Independent",
		author: "David Chilton",
		image: "/books/the-wealthy-barber.jpg",
		category: "investing",
	},
	{
		title: "Knowledge And Decisions",
		author: "Thomas Sowell",
		image: "/books/knowledge-and-decisions.jpg",
		category: "ideas",
	},
	{
		title: "The Brain from Inside Out",
		author: "György Buzsáki MD PhD",
		image: "/books/the-brain-from-inside-out.jpg",
		category: "ideas",
	},
	{
		title: "A Brief History of Intelligence: Evolution, AI, and the Five Breakthroughs That Made Our Brains",
		author: "Max S. Bennett",
		image: "/books/a-brief-history-of-intelligence-evolution-ai-and-the-five-breakthroughs-that-made-our-brains.jpg",
		category: "ai-data",
	},
	{
		title: "My Years with General Motors",
		author: "Alfred P. Sloan, Jr.",
		image: "/books/my-years-with-general-motors.jpg",
		category: "leadership",
	},
	{
		title: "The Infinite Game",
		author: "Simon Sinek",
		image: "/books/the-infinite-game.jpg",
		category: "strategy",
	},
	{
		title: "Finite and Infinite Games: A Vision of Life as Play and Possibility",
		author: "James P. Carse",
		image: "/books/finite-and-infinite-games.jpg",
		category: "personal-growth",
	},
	{
		title:
			"The New Strategic Selling: The Unique Sales System Proven Successful by the World's Best Companies",
		author: "Robert B. Miller, Stephen E. Heiman, Tad Tuleja",
		image: "/books/the-new-strategic-selling.jpg",
		category: "sales",
	},
	{
		title: "The Visual Display of Quantitative Information",
		author: "Edward R. Tufte",
		image: "/books/the-visual-display-of-quantitative-information.jpg",
		category: "design",
	},
	{
		title:
			"The Laws of Trading: A Trader's Guide to Better Decision-Making for Everyone",
		author: "Agustin Lebron",
		image:
			"/books/the-laws-of-trading-a-traders-guide-to-better-decision-making-for-everyone.jpg",
		category: "quant",
	},
	{
		title: "The Writing Life",
		author: "Annie Dillard",
		image: "/books/the-writing-life.jpg",
		category: "writing",
	},
	{
		title: "The Power Broker: Robert Moses and the Fall of New York",
		author: "Robert A. Caro",
		image: "/books/the-power-broker-robert-moses-and-the-fall-of-new-york.jpg",
		category: "stories",
	},
	{
		title: "The Confident Mind: A Battle-Tested Guide to Unshakable Performance",
		author: "Dr. Nate Zinsser",
		image:
			"/books/the-confident-mind-a-battle-tested-guide-to-unshakable-performance.jpg",
		category: "personal-growth",
	},
	{
		title:
			"Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications",
		author: "Chip Huyen",
		image: "/books/designing-machine-learning-systems.jpg",
		category: "ai-data",
	},
	{
		title:
			"Hands-On Large Language Models: Language Understanding and Generation",
		author: "Jay Alammar, Maarten Grootendorst",
		image: "/books/hands-on-large-language-models.jpg",
		category: "ai-data",
	},
	{
		title: "Build a Reasoning Model (From Scratch)",
		author: "Sebastian Raschka",
		image: "/books/build-a-reasoning-model-from-scratch.jpg",
		category: "ai-data",
	},
	{
		title: "Build a Large Language Model (From Scratch)",
		author: "Sebastian Raschka",
		image: "/books/build-a-large-language-model-from-scratch.jpg",
		category: "ai-data",
	},
	{
		title:
			"Reinforcement Learning from Human Feedback: Alignment and post-training of LLMs",
		author: "Nathan Lambert",
		image: "/books/reinforcement-learning-from-human-feedback.jpg",
		category: "ai-data",
	},
	{
		title: "Investing in America: The Rise Of A 250-Year Bull Market",
		author: "Meb Faber",
		image:
			"/books/investing-in-america-the-rise-of-a-250-year-bull-market.jpg",
		category: "investing",
	},
	{
		title:
			"Lucky by Design: The Hidden Economics You Need to Get More of What You Want",
		author: "Judd Kessler",
		image:
			"/books/lucky-by-design-the-hidden-economics-you-need-to-get-more-of-what-you-want.jpg",
		category: "decisions",
	},
	{
		title:
			"Freakonomics, Revised and Expanded Edition: A Rogue Economist Explores the Hidden Side of Everything",
		author: "Steven D. Levitt, Stephen J. Dubner",
		image:
			"/books/freakonomics-a-rogue-economist-explores-the-hidden-side-of-everything.jpg",
		category: "decisions",
	},
	{
		title: "Iconoclast: A Neuroscientist Reveals How to Think Differently",
		author: "Gregory Berns",
		image:
			"/books/iconoclast-a-neuroscientist-reveals-how-to-think-differently.jpg",
		category: "ideas",
	},
	{
		title: "Feynman's Rainbow: A Search for Beauty in Physics and in Life",
		author: "Leonard Mlodinow",
		image:
			"/books/feynmans-rainbow-a-search-for-beauty-in-physics-and-in-life.jpg",
		category: "ideas",
	},
	{
		title:
			"Make It Snow: From Zero to Billions: How Snowflake Scaled Its Go-To-Market Organization",
		author: "Denise Persson, Chris Degnan",
		image:
			"/books/make-it-snow-from-zero-to-billions-how-snowflake-scaled-its-go-to-market-organization.jpg",
		category: "sales",
	},
	{
		title:
			"A Fabulous Debt: The Epic Story of How Bonds Built the Modern World",
		author: "Robin Wigglesworth",
		image:
			"/books/a-fabulous-debt-the-epic-story-of-how-bonds-built-the-modern-world.jpg",
		category: "wall-street",
	},
	{
		title: "Kafka: The Definitive Guide: Real-Time Data and Stream Processing at Scale",
		author: "Gwen Shapira, Todd Palino, Rajini Sivaram, Krit Petty",
		image: "/books/kafka-the-definitive-guide.jpg",
		category: "ai-data",
	},
	{
		title: "Streaming Systems: The What, Where, When, and How of Large-Scale Data Processing",
		author: "Tyler Akidau, Slava Chernyak, Reuven Lax",
		image: "/books/streaming-systems.jpg",
		category: "ai-data",
	},
	{
		title: "The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling",
		author: "Ralph Kimball, Margy Ross",
		image: "/books/the-data-warehouse-toolkit.jpg",
		category: "ai-data",
	},
	{
		title: "Fundamentals of Data Engineering: Plan and Build Robust Data Systems",
		author: "Joe Reis, Matt Housley",
		image: "/books/fundamentals-of-data-engineering.jpg",
		category: "ai-data",
	},
	{
		title: "Expected Returns: An Investor's Guide to Harvesting Market Rewards",
		author: "Antti Ilmanen",
		image: "/books/expected-returns.jpg",
		category: "quant",
	},
	{
		title: "The Elements of Quantitative Investing",
		author: "Giuseppe A. Paleologo",
		image: "/books/the-elements-of-quantitative-investing.jpg",
		category: "quant",
	},
	{
		title:
			"Efficiently Inefficient: How Smart Money Invests and Market Prices Are Determined",
		author: "Lasse Heje Pedersen",
		image: "/books/efficiently-inefficient.jpg",
		category: "quant",
	},
	{
		title: "Advanced Portfolio Management: A Quant's Guide for Fundamental Investors",
		author: "Giuseppe A. Paleologo",
		image: "/books/advanced-portfolio-management.jpg",
		category: "quant",
	},
	{
		title: "Atlas Shrugged",
		author: "Ayn Rand",
		image: "/books/atlas-shrugged.jpg",
		category: "fiction",
	},
	{
		title: "Trading Volatility: Trading Volatility, Correlation, Term Structure and Skew",
		author: "Colin Bennett",
		image: "/books/trading-volatility.jpg",
		category: "quant",
	},
	{
		title: "Option Volatility & Pricing: Advanced Trading Strategies and Techniques",
		author: "Sheldon Natenberg",
		image: "/books/option-volatility-and-pricing.jpg",
		category: "quant",
	},
];

export const booksToReadCount = data.length;

export default function BooksToRead() {
	return (
		<>
			<p>
				If there is a particular book that you think I should read, feel free to
				recommend it.
			</p>
			<BooksList books={data.slice().reverse()} />
		</>
	);
}
