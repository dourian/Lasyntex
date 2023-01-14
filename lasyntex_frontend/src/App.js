import "./App.css";
import SearchBar from "./Components/Searchbar";
import React, { useState } from "react";

// required reclaration to use react-latex library
import Textfile from "./textfile";
var Latex = require("react-latex");

const posts = [
  { id: "1", name: "Bold", command: "\textbf{}" },
  { id: "2", name: "Emphasize", command: "\emph{}"  },
  { id: "3", name: "Dorian Chen", command: "\dc{}"  },
  { id: "4", name: "Dorian Sun",command: "\ds{}"  },
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
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);

    return (
        <div>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.key}>
                      {post.name.toLowerCase()}: {post.command}
                      {/* <Latex>${post.name.toLowerCase()}$</Latex> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;