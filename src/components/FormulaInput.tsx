import React, { useState } from "react";
import { useQuery } from "react-query";
import { useFormulaStore } from "../store/useFormulaStore";

interface Suggestion {
  name: string;
  id: string;
}

const fetchSuggestions = async (query: string) => {
  const encodedQuery = encodeURIComponent(query.trim()); // Trim and encode the query
  const res = await fetch(
    `https://6694e92a4bd61d8314c92b61.mockapi.io/formula?q=${encodedQuery}`
  );
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

const FormulaInput = () => {
  const { formulas, addTag, removeTag } = useFormulaStore();
  const [input, setInput] = useState("");

  // UseQuery hook to fetch suggestions based on input value
  const { data: suggestions, refetch } = useQuery<Suggestion[]>(
    ["suggestions", input],
    () => fetchSuggestions(input),
    { enabled: input.length > 0 }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddTag = () => {
    if (input.trim()) {
      addTag(input.trim());
      setInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    removeTag(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className="mx-auto min-w-fit">
      <div className="mb-5 flex flex-wrap">
        {formulas.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2 mb-2"
          >
            <span className="pr-1">{tag}</span>
            <button
              className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 ml-2"
              onClick={() => handleRemoveTag(index)}
            >
              X
            </button>
          </span>
        ))}
      </div>

      <input
        className="w-full pl-3 mb-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleAddTag}
      >
        Add Tag
      </button>
      <div
        className="mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
        <div className="py-1" role="none">
          {suggestions &&
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                onClick={() => {
                  addTag(suggestion.name);
                  setInput("");
                }}
              >
                {suggestion.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FormulaInput;
