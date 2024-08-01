"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

function PromptFeed() {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);


	const handleTagClick = (e) => {
		console.log("tag click", e);
		setSearchText(e);
	}


	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};
		console.log(posts);
		fetchPosts();
	},[]);


	useEffect(() => {
		if (searchText === "") {
			setFilteredPosts(posts);
		} else {
			const filtered = posts.filter((post) =>
				post.tag.toLowerCase().includes(searchText.toLowerCase()) || 
				post.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
			 	post.prompt.toLowerCase().includes(searchText.toLowerCase())
			);
			setFilteredPosts(filtered);
		}
		console.log(posts);
	}, [searchText, posts]);



	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or username"
					value={searchText}
					onChange={handleSearchChange}
					className="search_input peer"
				/>
			</form>

			<PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
		</section>
	);
}

export default PromptFeed;
