import SearchBar from "../Components/Searchbar";
import React, { useState, useEffect } from "react";
import logo from "../assets/lasyntex.svg";
import "../App.css";
import SearchResult from "../Components/SearchResult";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import Bottomleft from "../Components/Bottomleft";
import { getRemoteConfig } from "firebase/remote-config";
import { getValue } from "firebase/remote-config";
import Global from "../classes/Global"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: "lasyntexhost",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);
const val = getValue(remoteConfig, "left");

const filterPosts = (posts, query) => {
  if (!query) {
    return [];
  }

  return posts.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query.toLowerCase());
  });
};

function Home() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  // const [postList, setPosts] = useState([]);
  


  

    const filteredPosts = filterPosts(Global.commandsList, searchQuery);

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
          <nav>
            <ul>
                {filteredPosts.map((post, index) => (
                <li key={post.key}>
                  <SearchResult
                    name={post.name}
                    syntax={post.syntax}
                    example={post.example}
                    description={post.description}
                    index={index}
                  ></SearchResult>
                </li>
              ))}
            </ul>
          </nav>
          {/* list of results end here */}
        </div>
      </div>

      <Bottomleft order = {val}></Bottomleft>
    </div>
  );
}

export default Home;
