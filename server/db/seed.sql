-- Sample data for development/testing
-- Insert roles
INSERT INTO roles (name, description) VALUES
('President', 'Highest level admin with full system access'),
('Treasurer', 'Financial management and payment tracking'),
('Executive Member', 'General admin with limited permissions'),
('Member', 'Regular union member');

-- Insert workplaces
INSERT INTO workplaces (name, location) VALUES
('EMU', 'Erb Memorial Union'),
('Central Kitchen', 'University Housing - Central Kitchen'),
('Library', 'Knight Library'),
('Recreation Center', 'Student Recreation Center'),
('Bookstore', 'University Bookstore'),
('Dining Services', 'Various dining locations');

-- Insert sample members
INSERT INTO members (name, email, uo_id, workplace_id, role_id, dues_status, membership_status, major, phone, pronouns, graduation_year) VALUES
('Alex Johnson', 'alex.johnson@uoregon.edu', '951234567', 1, 1, 'paid', 'active', 'Computer Science', '555-0101', 'they/them', 2025),
('Sarah Chen', 'sarah.chen@uoregon.edu', '951234568', 2, 2, 'paid', 'active', 'Business Administration', '555-0102', 'she/her', 2024),
('Marcus Rodriguez', 'marcus.rodriguez@uoregon.edu', '951234569', 3, 3, 'unpaid', 'active', 'Psychology', '555-0103', 'he/him', 2026),
('Taylor Kim', 'taylor.kim@uoregon.edu', '951234570', 4, 4, 'paid', 'active', 'Environmental Studies', '555-0104', 'she/they', 2025),
('Jordan Smith', 'jordan.smith@uoregon.edu', '951234571', 5, 4, 'unpaid', 'inactive', 'Mathematics', '555-0105', 'he/him', 2024),
('Casey Williams', 'casey.williams@uoregon.edu', '951234572', 6, 4, 'paid', 'graduated', 'English Literature', '555-0106', 'they/them', 2023);

-- Insert sample events
INSERT INTO events (title, description, event_date, location, created_by) VALUES
('General Meeting', 'Monthly general membership meeting', '2024-02-15 18:00:00', 'EMU Ballroom', 1),
('Budget Review', 'Quarterly budget review session', '2024-02-20 16:00:00', 'EMU Conference Room', 2),
('Social Event', 'End of semester celebration', '2024-05-10 19:00:00', 'Recreation Center', 1),
('Training Workshop', 'Workplace rights and safety training', '2024-03-05 14:00:00', 'Library Meeting Room', 3);

-- Insert sample attendance
INSERT INTO attendance (member_id, event_id, qr_code_token) VALUES
(1, 1, 'qr_token_001'),
(2, 1, 'qr_token_002'),
(3, 1, 'qr_token_003'),
(4, 1, 'qr_token_004'),
(1, 2, 'qr_token_005'),
(2, 2, 'qr_token_006'),
(1, 3, 'qr_token_007'),
(2, 3, 'qr_token_008'),
(3, 3, 'qr_token_009'),
(4, 3, 'qr_token_010'),
(5, 3, 'qr_token_011');

-- Insert admin records
INSERT INTO admins (member_id, role_id, permissions) VALUES
(1, 1, '{"canManageMembers": true, "canCreateEvents": true, "canViewReports": true, "canManageRoles": true}'),
(2, 2, '{"canManageMembers": false, "canCreateEvents": true, "canViewReports": true, "canManageRoles": false}'),
(3, 3, '{"canManageMembers": false, "canCreateEvents": true, "canViewReports": false, "canManageRoles": false}');

