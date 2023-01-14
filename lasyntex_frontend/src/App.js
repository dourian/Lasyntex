import "./App.css";
import SearchBar from "./Components/Searchbar";
import React, { useState } from "react";
import logo from "./assets/lasyntex.svg";

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
    <div className="page_wrapper">
      <div className="logo_and_search">
        <img src={logo} alt="description"></img>
        <p>Browse for LaTeX commands</p>
        <div className="searchbar_and_results">
          {/* Search bar goes here */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* list of results goes here */}
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
              </li>
            ))}
          </ul>
          {/* list of results end here */}
        </div>
      </div>
      <div className="bottom_left">
        <a href="https://github.com/dourian/Lasyntex">Github</a>
        <a href="mailto:dz2chen@uwaterloo.ca">Contact</a>
        <a href="https://lasyntex-service-e5x5h3x7kq-uc.a.run.app/api-docs/">API</a>
      </div>
    </div>
  );
}

export default App;
