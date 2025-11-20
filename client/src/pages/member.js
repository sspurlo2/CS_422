import React, { useState } from "react";
import "../styles/Member.css";

function Member() {
  // Example static data; in real app, you could fetch this from your backend
  const allMembers = [
    { name: "Jane Doe", status: "Active", joined: "2023-01-15" },
    { name: "John Smith", status: "Inactive", joined: "2022-11-20" },
    { name: "Alex Green", status: "Active", joined: "2023-03-10" },
    { name: "Emily Brown", status: "Pending", joined: "2023-09-01" },
  ];

  const [filter, setFilter] = useState(""); // search filter
  const [statusFilter, setStatusFilter] = useState("All"); // dropdown filter

  const filteredMembers = allMembers.filter((member) => {
    const matchesName = member.name.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === "All" || member.status === statusFilter;
    return matchesName && matchesStatus;
  });

  return (
    <div className="member-container">
      <h1 className="member-title">Members</h1>

      {/* Filters */}
      <div className="member-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <table className="member-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.status}</td>
              <td>{member.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Member;