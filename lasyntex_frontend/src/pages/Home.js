import SearchBar from "../components/Searchbar";
import React, { useState, useEffect } from "react";
import logo from "../assets/lasyntex.svg";
import "../App.css";
import SearchResult from "../components/SearchResult";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import Bottomleft from "../components/Bottomleft";
import { getRemoteConfig } from "firebase/remote-config";
import { getValue } from "firebase/remote-config";





const firebaseConfig = {
  apiKey: "AIzaSyDJSMjdFPMJkp-cJvYZeodIOE53C_HzwD0",
  authDomain: "lasyntexhost.firebaseapp.com",
  projectId: "lasyntexhost",
  storageBucket: "lasyntexhost.appspot.com",
  messagingSenderId: "525653224431",
  appId: "1:525653224431:web:9d4ebdbfc637cdbec7641a",
  measurementId: "G-F0PH4V3YLD"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
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
  const [postList, setPosts] = useState([]);
  const filteredPosts = filterPosts(postList, searchQuery);

  useEffect(() => {
    fetch("https://lasyntex-service-ftd5kbbgma-uc.a.run.app/allcommands")
      .then((response) => response.json())
      .then((data) => {
        // sorts array lexigraphically first
        var dummy = [];
        dummy = data;
        let sorteddummy = dummy.sort((r1, r2) => r1.name.localeCompare(r2.name))
        setPosts(sorteddummy);
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
