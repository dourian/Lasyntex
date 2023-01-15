import "./Searchbar.css";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import Collapsible from 'react-collapsible';


const replace = (oldstr) => {
    const newstr = oldstr.replaceAll("[backslash]", "\\");
    console.log(newstr);
    return newstr;
}

function SearchResult({ name, syntax, example, description }) {
    return (
        
        <Collapsible trigger={<div className="search_result">
        <p>
            Name: <Latex>{`$ ${name} $`}</Latex>
        </p>
        <p>Syntax: {replace(syntax)}</p>
    </div>}>
    <p>
            Example: <Latex>{`$ ${replace(example)} $`}</Latex>
        </p>
        <p>Description: {description}</p>
    </Collapsible>
    )
}

export default SearchResult;