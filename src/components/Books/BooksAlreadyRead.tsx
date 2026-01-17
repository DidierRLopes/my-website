import React from "react";
import BooksList from "../General/BooksList";

const data = [
	{
		title:
			"Slaughterhouse-Five, or The Children's Crusade",
		author: "Kurt Vonnegut",
		image:
			"/books/slaughterhouse-five.png",
	
	},
	
];

export default function BooksAlreadyRead() {
	return (
		
		<>
			<p>
				 {/* 
				Most of the books I have read or listened to.
				<br />
				Here's a thread with the ones I read in{" "}
				<a
					href="https://x.com/didier_lopes/status/1615510616025993217"
					target="_blank"
					rel="noopener noreferrer"
				>
					2023
				</a>
				, in{" "}
				<a
					href="https://x.com/didier_lopes/status/1742748040220328189"
					target="_blank"
					rel="noopener noreferrer"
				>
					2024
				</a>{" "}
				and in{" "}
				<a
					href="https://x.com/didier_lopes/status/1882635148694606134"
					target="_blank"
					rel="noopener noreferrer"
				>
					2025
				</a>
				.
				*/}
			</p>
			<BooksList books={data} />
		</>
	);
}
