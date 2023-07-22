"use client";

import { useEffect, useState } from "react";
import { PromptCardList } from "./";

export default function Feed() {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  async function fetchPosts() {
    const response = await fetch("/api/prompt");
    setAllPosts(await response.json());
  }

  function filterPrompts(searchtext) {
    const regex = new RegExp(searchtext, "i");

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }

  function handleSearchChange(e) {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPrompts(e.target.value));
      }, 500)
    );
  }

  function handleTagClick(tagname) {
    setSearchText(tagname);
    setSearchedResults(filterPrompts(tagname));
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}
