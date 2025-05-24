-- db_sample_data.sql
-- Sample data for Event Calendar App

USE event_calendar_app;

-- Insert sample users
INSERT INTO users (email, name, password, role) VALUES
('alice@example.com', 'Alice Smith', '$2b$10$samplehashforalice', 'user'),
('bob@example.com', 'Bob Johnson', '$2b$10$samplehashforbob', 'user'),
('admin@example.com', 'Admin User', '$2b$10$samplehashforadmin', 'admin');

-- Insert sample events
INSERT INTO events (user_id, title, description, start_time, end_time, location, timezone, is_recurring, recurrence_type, recurrence_until)
VALUES
(1, 'Team Meeting', 'Monthly team sync-up', '2025-06-01 10:00:00', '2025-06-01 11:00:00', 'Conference Room', 'UTC', TRUE, 'monthly', '2025-12-01 11:00:00'),
(2, 'Doctor Appointment', 'Annual checkup', '2025-06-05 09:00:00', '2025-06-05 09:30:00', 'Clinic', 'UTC', FALSE, NULL, NULL),
(1, 'Project Deadline', 'Submit project deliverables', '2025-06-10 17:00:00', '2025-06-10 18:00:00', 'Office', 'UTC', FALSE, NULL, NULL),
(3, 'Admin Review', 'Review user activity', '2025-06-15 14:00:00', '2025-06-15 15:00:00', 'Admin Office', 'UTC', TRUE, 'weekly', '2025-08-15 15:00:00');
