const SearchHistory = ({ searchHistory }) => {
  return (
    <div className="w-64">
      <h3 className="text-lg font-semibold mb-2">Past Search Terms:</h3>
      <ul className="border border-gray-300 rounded-md divide-y divide-gray-300">
        {searchHistory.map((term, index) => (
          <li
            key={index}
            className="px-4 py-2 bg-gray-100 text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
