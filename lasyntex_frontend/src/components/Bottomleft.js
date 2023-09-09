import React from "react";

function Bottomleft({ order }) {
  if (order==="True") {
    return (
      <div className="bottom_left">
        <a href="https://github.com/dourian/Lasyntex">Github</a>
        <a href="mailto:dz2chen@uwaterloo.ca">Contact</a>
        <a href="https://lasyntex.herokuapp.com">
          API
        </a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjeYUZMEeJnH-D9fInzDodiPksfRYL5Ghba7UCOCSqGHbC3Q/viewform">
          Missing?
        </a>
      </div>
    );
  } else {
    return (
      <div className="bottom_left">
        <a href="mailto:dz2chen@uwaterloo.ca">Contact</a>
        <a href="https://github.com/dourian/Lasyntex">Github</a>
        <a href="https://lasyntex.herokuapp.com">
          API
        </a>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfjeYUZMEeJnH-D9fInzDodiPksfRYL5Ghba7UCOCSqGHbC3Q/viewform">
          Missing?
        </a>
      </div>
    );
  }
}

export default Bottomleft;
