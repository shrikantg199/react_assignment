const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onSort,
  suggestions,
  onSuggestionClick,
}) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <form
      onSubmit={onSearch}
      className="flex justify-center items-center flex-col gap-2 mb-4 relative"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search Users"
        className="px-2 w-full mx-4 md:w-96 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-xl mt-1 w-full max-h-40 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onSort}
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
        >
          Sort by Name
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
