import React, { useState, useEffect } from 'react';
import Command from '../classes/Command'
import Global from '../classes/Global';


function Requests({apiUrl, commandName}) {
    // const [postList, setPosts] = useState([]);


    // Stores the data retrieved from API
    fetch(apiUrl+commandName)
        .then((response) => response.json())
        .then((data) => {
            // var array = [new Command(data.name, data.syntax, data.example, data.description)];
            
            
        })
        .catch((err) => {
            console.log(err.message);
        });


    return (
        <div className="posts-container">
           {Global.allCommands.map((post) => {
              return (
                <div>
                <p>{post.name}</p>
                <p>{post.syntax}</p>
                <p>{post.example}</p>
                <p>{post.description}</p>
                </div>
              );
           })}
        </div>
        );
}

export default Requests;