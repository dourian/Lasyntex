import React, { useState, useEffect } from 'react';
import Command from '../classes/Command'
import Global from '../classes/Global';
var Latex = require('react-latex');


function Requests({apiUrl, commandName}) {
    const [postList, setPosts] = useState([]);


    // Stores the data retrieved from API
    useEffect(() => {
        fetch(apiUrl+commandName)
        .then((response) => response.json())
        .then((data) => {
            setPosts(data)
            
            
        })
        .catch((err) => {
            console.log(err.message);
        });
  })
    


    return (
        <div className="posts-container">
           {postList.map((cmd) => {
            var ex = "$$"+cmd.example+"$$"
            return (
                <div>
                    <div>{cmd.name}</div>
                    <Latex displayMode={true}>{ex}</Latex>
                </div>
                
            );
           })}
        </div>
        );
}

export default Requests;