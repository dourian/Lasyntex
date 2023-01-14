const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search</span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder='Search.. ie "bold"'
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;
