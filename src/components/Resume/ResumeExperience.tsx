import React from "react";
import ExperienceList from "../General/ExperienceList";

const data = [
	{
		company: "OpenBB",
		title: "Co-founder & CEO",
		link: "https://openbb.co",
		daterange: "September 2021 - Present",
		summary: `
- Raised **$10M in funding** from an open source project I started in my spare time.
- Built a team of **20 people** from scratch in less than 1 year, including: engineering, product, marketing, design and finance departments.
- Launched [OpenBB Workspace](https://pro.openbb.co/), the AI workspace for Finance.
- The [Open Data Platform](https://github.com/OpenBB-finance/OpenBB) became the most popular finance project on GitHub with more than **50k stars**.
		`,
	},
	{
		company: "Universidade Europeia",
		title: "ML Guest Lecturer",
		link: "https://www.europeia.pt",
		daterange: "April 2024 - Present",
		summary: `
Invited to teach a course in "Big Data and Data Analytics" focusing on Supervised Learning.

I gave 4 hours of classes, divided into:
- Supervised Learning - Theory
- Supervised Learning - Practice

and graded student's coursework on supervised learning.

Then I also gave a 2h seminar in:
- Data Analytics in Financial Markets
- AI in Financial Markets

I open sourced the syllabus and content about Supervised Learning here: [github.com/DidierRLopes/supervised-learning](https://github.com/DidierRLopes/supervised-learning)
		`,
	},
	{
		company: "NURVV",
		title: "Sensor Fusion Engineer",
		link: "https://www.nurvv.com/en-gb/",
		daterange: "November 2020 - October 2021",
		summary: `
**My biggest contributions have been:**
- Improving the time-to-first-fix of the GNSS receiver
- Re-designing the concept of altitude estimation using Kalman Filter
- Adding a GPS filtering algorithm for outliers, including an approach to pick a valid start point
- Work on a new way of calibrating insoles to increase their life span and accuracy
- Create and clean Nurvv running dataset. This allowed to implement a new footstrike detection and INS algorithm to improve distance covered and speed reported to users

All of these tasks had a major research/simulation component carried through python in jupyter notebook environment.

**In addition I have:**
- Developed a python data analyzer that processes the data from a running session and produces a html report, which allows us to assess the state of the product, and helps us in development to make sure the product is behaving as expected
- Developed a python sensor analyzer that allows to analyze the raw samples seen by the trackers over a running session, to understand - at a low level - if something unexpected is happening
- Started the development of a python internal tool, similar to the app, to be used by the firmware team to communicate with the product
		`,
	},
	{
		company: "NURVV",
		title: "Embedded Firmware Engineer",
		link: "https://www.nurvv.com/en-gb/",
		daterange: "March 2020 - November 2020",
		summary: `
The primary tasks of the job are working on software development and automated systems. The job requires proficiency with C and C++ programming language and Python scripting; Some knowledge on Wireless communications (BLE, ANT), Communication protocols (SPI, I2C) and Sensor technologies (drivers). In addition, expertise in INS and GPS systems.

As part of a new firmware team of 3 engineers, we managed to get several bug fixes and features (e.g. auto-pause) in the latest release of the product.
		`,
	},
	{
		company: "U-blox",
		title: "Software Design Engineer",
		link: "https://www.u-blox.com/en",
		daterange: "November 2018 - February 2020",
		summary: `
The primary tasks of the job include designing and maintaining the internal and external customer-facing features, taking part in the whole embedded software development life cycle, in order to release state of the art GNSS receivers for this innovative IoT semiconductor company. Within my team responsibilities I was more keen towards Sensor Fusion and Inertial Navigation Systems.

The job requires: Proficiency in programming and scripting languages (C, C++, MATLAB and Perl); Knowledge in software testing, test automation and continuous integration concepts; Project tracking and collaboration (e.g. Jira); Agile software development processes; Experience with integrated development environments (e.g. Visual Studio Code), revision control systems (e.g. Git) and Linux computing.
		`,
	},
	{
		company: "Faculty of Sciences and Technology, New University of Lisbon",
		title: "Teacher Assistant",
		link: "https://www.fct.unl.pt",
		daterange: "January 2016 - June 2016",
		summary: `
My main activity was helping students to comprehend their MATLAB/Octave laboratory work and help them understanding the program of the course. I was responsible for 75 students, organized by 3 classes of 2 hours per week.

The program of the course was Signal and Systems; Linear, time invariant systems; The Laplace transform; Z transform; Periodic signals and the Fourier series (DFT); Discrete-time Fourier transform and The continuous-time Fourier Transform.
		`,
	},
];

export default function ResumeExperience() {
	return <ExperienceList experience={data} />;
}
