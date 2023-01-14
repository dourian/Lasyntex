import "./App.css";
import SearchBar from "./Components/Searchbar";
import React, { useState } from "react";

// required reclaration to use react-latex library
var Latex = require("react-latex");

const posts = [
  {
    id: "1",
    name: "Bold",
    syntax: "\\textbf{}",
    example: "\\textbf{BRO}",
    commandDescription: "it bolds",
  },
  {
    id: "2",
    name: "Emphasize",
    syntax: "\\emph{}",
    example: "\\emph{BRO}",
    commandDescription: "it emph",
  },
  {
    id: "3",
    name: "Box",
    syntax: "\\fbox{}",
    example: "\\fbox{BRO}",
    commandDescription: "it box",
  },
];

const filterPosts = (posts, query) => {
  if (!query) {
    return [];
  }

  return posts.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query);
  });
};

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div className="logo_and_search">
      <img src="lasyntex_frontend/src/assets/lasyntex.png" alt="image description" width="200" height="150"></img>
      <div className="searchbar_and_results">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.key}>
              <div className="search_result">
                <p>
                  Name: <Latex>{`$ ${post.name} $`}</Latex>
                </p>
                <p>Syntax: {post.syntax}</p>
                <p>
                  Example: <Latex>{`$ ${post.example} $`}</Latex>
                </p>
                <p>Description: {post.commandDescription}</p>
              </div>
              {/* <Latex>${post.name.toLowerCase()}$</Latex> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
