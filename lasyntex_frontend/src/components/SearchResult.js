import "./Searchbar.css";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import Collapsible from "react-collapsible";
import { RiArrowDropDownLine } from "react-icons/ri";

const replace = (oldstr) => {
  const newstr = oldstr.replaceAll("[backslash]", "\\");
  return newstr;
};


function SearchResult({ name, syntax, example, description, index}) {
  const rotateIcon = (index) => {
    document.getElementById(`arrow${index}`).style.color = "white"
  }
  return (
    <Collapsible
      onOpen={console.log("clicked")}
      trigger={
        <div className="search_result">
          <div className="name_box">
            <p>
              <Latex>{`$ ${name} $`}</Latex>
            </p>
          </div>
          <p className="syntax">{replace(syntax)}</p>
          <div className="dropdown_icon" id={`arrow${index}`}>
            <RiArrowDropDownLine />
          </div>
        </div>
      }
    >
      <div className="dropdown_results">
        <div className="examples">
          <div className="input_box">
            <p className="example_no_latex">
              Input:
              <br /> {replace(example)}
            </p>
          </div>
          <p className="example_latex">
            Output:
            <br />
            <Latex>{`$ ${replace(example)} $`}</Latex>
          </p>
        </div>
        <div className="description">
          <p>Description: {description}</p>
        </div>
      </div>
    </Collapsible>
  );
}

export default SearchResult;
