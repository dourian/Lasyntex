import "./Searchbar.css";

// SearchBar consumes a query and returns a search bar
const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form onsubmit="return false;" autoComplete="off">
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder='Search.. ie "bold"'
            name="s"
            onKeyDown={e => {if (e.keyCode === 13) e.preventDefault()}}
        />
    </form>
);

export default SearchBar;
