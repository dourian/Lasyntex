
import SearchBar from "../components/Searchbar";
import React, { useState, useEffect } from "react";
import logo from "../assets/lasyntex.svg";


// required reclaration to use react-latex library
var Latex = require("react-latex");

const filterPosts = (posts, query) => {
  if (!query) {
    return [];
  }

  return posts.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query);
  });
};

function Home() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [postList, setPosts] = useState([]);
  const filteredPosts = filterPosts(postList, searchQuery);

  useEffect(() => {
    fetch("https://lasyntex-service-ftd5kbbgma-uc.a.run.app/allcommands")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

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
              {/* <Link to={`/${post.name}`}>

              </Link> */}
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

export default Home;