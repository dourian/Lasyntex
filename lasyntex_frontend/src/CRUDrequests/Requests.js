import React, { useState, useEffect } from 'react';
import Command from '../classes/Command'


function Requests({apiUrl, commandName}) {
    const [posts,setPosts] = useState([]);

    // Stores the data retrieved from API
    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/"+apiUrl+commandName)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="posts-container">
           {posts.map((post) => {
              return (
                 <div className="post-card" key={post.name}>
                    <h2 className="post-title">{post.name}</h2>
                    <p className="post-body">{post.syntax}</p>
                 </div>
              );
           })}
        </div>
        );
}

export default Requests;