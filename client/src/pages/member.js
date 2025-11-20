import React, { useState } from "react";
import "../styles/Member.css";

function Member() {
  const [members, setMembers] = useState([
    { id: 1, name: "Jane Doe", uo_id: "950000001", status: "Active", joined: "2023-01-15", email: "jane@example.com", role_name: "Member", workplace_name: "Workplace A", pronouns: "She/Her", major: "CS", phone: "123-456-7890", graduation_year: "2024", dues_status: "paid", membership_status: "active" },
    { id: 2, name: "John Smith", uo_id: "950000002", status: "Inactive", joined: "2022-11-20", email: "john@example.com", role_name: "Admin", workplace_name: "Workplace B", pronouns: "He/Him", major: "Math", phone: "987-654-3210", graduation_year: "2023", dues_status: "unpaid", membership_status: "inactive" },
  ]);

  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showDetails, setShowDetails] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [addingMember, setAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    uo_id: "",
    role_name: "",
    workplace_name: "",
    pronouns: "",
    major: "",
    phone: "",
    graduation_year: "",
    dues_status: "unpaid",
    membership_status: "active",
  });
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const filteredMembers = members.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesName && matchesStatus;
  });

  const toggleSelectionMode = () => {
    if (selectionMode && selectedMembers.length > 0) {
      const emails = members
        .filter((m) => selectedMembers.includes(m.id))
        .map((m) => m.email)
        .join(", ");
      alert(`Mass email would be sent to:\n${emails}`);
    }
    setSelectionMode(!selectionMode);
    setSelectedMembers([]);
  };

  const handleSelect = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const handleAddMember = () => {
    setAddingMember(true);
  };

  const handleSaveNewMember = () => {
    if (!newMember.name || !newMember.email || newMember.uo_id.length !== 9) {
      return alert("Please fill all fields and ensure 95# is 9 digits.");
    }
    const newEntry = {
      ...newMember,
      id: Date.now(),
      joined: new Date().toISOString().split("T")[0],
      status: newMember.membership_status === "active" ? "Active" : "Inactive",
    };
    setMembers([...members, newEntry]);
    setNewMember({
      name: "",
      email: "",
      uo_id: "",
      role_name: "",
      workplace_name: "",
      pronouns: "",
      major: "",
      phone: "",
      graduation_year: "",
      dues_status: "unpaid",
      membership_status: "active",
    });
    setAddingMember(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this member?")) {
      setMembers(members.filter((m) => m.id !== id));
      if (showDetails === id) setShowDetails(null);
    }
  };

  const handleSaveEdit = () => {
    setMembers(members.map((m) => (m.id === editingMember.id ? editingMember : m)));
    setEditingMember(null);
  };

  return (
    <div className="member-container">
      <h1 className="member-title">Members</h1>

      <div className="member-actions">
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
        </select>
        <button onClick={handleAddMember}>Add Member</button>
        <button onClick={toggleSelectionMode}>
          {selectionMode ? "Send to Selected" : "Send Email"}
        </button>
      </div>

      {addingMember && (
        <div className="member-add-form">
          <input
            type="text"
            placeholder="Full Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="95# (9 digits)"
            maxLength={9}
            value={newMember.uo_id}
            onChange={(e) => setNewMember({ ...newMember, uo_id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newMember.role_name}
            onChange={(e) => setNewMember({ ...newMember, role_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Workplace"
            value={newMember.workplace_name}
            onChange={(e) => setNewMember({ ...newMember, workplace_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pronouns"
            value={newMember.pronouns}
            onChange={(e) => setNewMember({ ...newMember, pronouns: e.target.value })}
          />
          <input
            type="text"
            placeholder="Major"
            value={newMember.major}
            onChange={(e) => setNewMember({ ...newMember, major: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Graduation Year"
            value={newMember.graduation_year}
            onChange={(e) => setNewMember({ ...newMember, graduation_year: e.target.value })}
          />
          <select
            value={newMember.dues_status}
            onChange={(e) => setNewMember({ ...newMember, dues_status: e.target.value })}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="exempt">Exempt</option>
          </select>
          <select
            value={newMember.membership_status}
            onChange={(e) => setNewMember({ ...newMember, membership_status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button onClick={handleSaveNewMember}>Save</button>
          <button onClick={() => setAddingMember(false)}>Cancel</button>
        </div>
      )}

      <table className="member-table">
        <thead>
          <tr>
            {selectionMode && <th>Select</th>}
            <th>Name</th>
            <th>95#</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <React.Fragment key={member.id}>
              <tr>
                {selectionMode && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelect(member.id)}
                    />
                  </td>
                )}
                <td>{member.name}</td>
                <td>{member.uo_id}</td>
                <td>{member.status}</td>
                <td>
                  <button
                    className="three-dots"
                    onClick={() =>
                      setShowDetails(showDetails === member.id ? null : member.id)
                    }
                  >
                    ⋮
                  </button>
                </td>
              </tr>

              {showDetails === member.id && (
                <tr className="member-details-row">
                  <td colSpan={selectionMode ? 5 : 4}>
                    {editingMember?.id === member.id ? (
                      <div className="member-details">
                        {/* Editing fields same as add form */}
                      </div>
                    ) : (
                      <div className="member-details">
                        <p><strong>Email:</strong> {member.email}</p>
                        <p><strong>Role:</strong> {member.role_name}</p>
                        <p><strong>Workplace:</strong> {member.workplace_name}</p>
                        <p><strong>Pronouns:</strong> {member.pronouns}</p>
                        <p><strong>Major:</strong> {member.major}</p>
                        <p><strong>Phone:</strong> {member.phone}</p>
                        <p><strong>Graduation Year:</strong> {member.graduation_year}</p>
                        <p><strong>Dues Status:</strong> {member.dues_status}</p>
                        <p><strong>Membership Status:</strong> {member.membership_status}</p>
                        <div className="member-details-buttons">
                          <button onClick={() => setEditingMember(member)}>Edit</button>
                          <button onClick={() => handleDelete(member.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Member;