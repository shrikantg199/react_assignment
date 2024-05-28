import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSearchTerm, setUsers } from "./redux/UserSlice";

import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import SearchHistory from "./components/SearchHistory";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const searchHistory = useSelector((state) => state.users.searchHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchUsers();
    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      dispatch(addSearchTerm(JSON.parse(storedSearchHistory)));
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
    setSortedUsers(users);
  }, [users]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(addSearchTerm(searchTerm));
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setSortedUsers(filtered);
      setIsSorted(false);
      setSearchTerm("");
      setSuggestions([]);
    } else {
      setFilteredUsers(users);
      setSortedUsers(users);
      setIsSorted(false);
    }
  };

  const sortByName = () => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedUsers(sorted);
    setIsSorted(true);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      const filteredSuggestions = searchHistory.filter((historyItem) =>
        historyItem.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredUsers(filtered);
    setSortedUsers(filtered);
    setIsSorted(false);
  };

  return (
    <div className="container mx-auto  px-4 py-8 md:w-[70vh]">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
        onSort={sortByName}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      <UserList users={isSorted ? sortedUsers : filteredUsers} />
      <SearchHistory searchHistory={searchHistory} />
    </div>
  );
};

export default App;
