// Components/FilterBar.tsx
// import React from "react";
import "./FilterBar.css";

interface TodoFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
  // onSortChange: (order: sortOrder) => void; // this won't work
  isCompleted: string;
  onStatusChange: (checked:string) => void;
}

const TodoFilterBar = ({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
  isCompleted,
  onStatusChange,
}: TodoFilterBarProps) => {
  return (
    <div className="filter-bar mb-3">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Sort by Date (Ascending)</option>
        <option value="desc">Sort by Date (Descending)</option>
      </select>

        <select
          value={isCompleted}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all"> All(All)</option>
          <option value="true"> Completed </option>
          <option value="false"> Incomplete</option>
        </select>
   
    </div>
  );
};

export default TodoFilterBar;
