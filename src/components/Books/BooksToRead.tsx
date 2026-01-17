import React from "react";
import BooksList from "../General/BooksList";

const data = [
	{
		title: "Blindspotting: How to See What Others Miss",
		author: "Kirstin Ferguson ",
		image:
			"/books/blindspotting-how-to-see-what-others-miss.png",
	},
	{
		title: "The Sovereign Individual: Mastering the Transition to the Information Age",
		author: "James Dale Davidson  ",
		image:
			"/books/the-sovereign-individual.png",
	},
	{
		title: "AlphaBrain: How a Group of Iconoclasts Are Using Cognitive Science to Advance the Business of Alpha Generation",
		author: "Stephen Duneier",
		image:
			"/books/alphabrain.png",
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
