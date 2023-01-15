import "./Searchbar.css";

// SearchBar consumes a query and returns a search bar
const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get" autoComplete="off">
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder='Search.. ie "bold"'
            name="s"
        />
    </form>
);

export default SearchBar;
