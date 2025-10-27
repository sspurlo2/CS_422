const { query } = require('../config/db');

class Event {
  // Create new event
  static async create(eventData) {
    const {
      title,
      description,
      event_date,
      location,
      created_by
    } = eventData;

    const sql = `
      INSERT INTO events (title, description, event_date, location, created_by)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [title, description, event_date, location, created_by];
    const result = await query(sql, values);
    return result.rows[0];
  }

  // Find event by ID
  static async findById(id) {
    const sql = `
      SELECT e.*, m.name as created_by_name
      FROM events e
      LEFT JOIN members m ON e.created_by = m.id
      WHERE e.id = $1
    `;
    const result = await query(sql, [id]);
    return result.rows[0];
  }

  // Find all events with optional filters
  static async findAll(filters = {}) {
    let sql = `
      SELECT e.*, m.name as created_by_name
      FROM events e
      LEFT JOIN members m ON e.created_by = m.id
    `;
    
    const conditions = [];
    const values = [];
    let paramCount = 0;

    if (filters.upcoming) {
      conditions.push(`e.event_date > NOW()`);
    }

    if (filters.past) {
      conditions.push(`e.event_date < NOW()`);
    }

    if (filters.date_from) {
      conditions.push(`e.event_date >= $${++paramCount}`);
      values.push(filters.date_from);
    }

    if (filters.date_to) {
      conditions.push(`e.event_date <= $${++paramCount}`);
      values.push(filters.date_to);
    }

    if (filters.created_by) {
      conditions.push(`e.created_by = $${++paramCount}`);
      values.push(filters.created_by);
    }

    if (filters.search) {
      conditions.push(`(e.title ILIKE $${++paramCount} OR e.description ILIKE $${++paramCount})`);
      const searchTerm = `%${filters.search}%`;
      values.push(searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY e.event_date ASC`;

    if (filters.limit) {
      sql += ` LIMIT $${++paramCount}`;
      values.push(filters.limit);
    }

    if (filters.offset) {
      sql += ` OFFSET $${++paramCount}`;
      values.push(filters.offset);
    }

    const result = await query(sql, values);
    return result.rows;
  }

  // Update event
  static async update(id, data) {
    const allowedFields = ['title', 'description', 'event_date', 'location'];

    const updates = [];
    const values = [];
    let paramCount = 0;

    Object.keys(data).forEach(key => {
      if (allowedFields.includes(key) && data[key] !== undefined) {
        updates.push(`${key} = $${++paramCount}`);
        values.push(data[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No valid fields to update');
    }

    values.push(id);
    const sql = `
      UPDATE events 
      SET ${updates.join(', ')}
      WHERE id = $${++paramCount}
      RETURNING *
    `;

    const result = await query(sql, values);
    return result.rows[0];
  }

  // Delete event
  static async delete(id) {
    const sql = 'DELETE FROM events WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);
    return result.rows[0];
  }

  // Get upcoming events
  static async getUpcoming(limit = 10) {
    const sql = `
      SELECT e.*, m.name as created_by_name
      FROM events e
      LEFT JOIN members m ON e.created_by = m.id
      WHERE e.event_date > NOW()
      ORDER BY e.event_date ASC
      LIMIT $1
    `;
    const result = await query(sql, [limit]);
    return result.rows;
  }

  // Get events by creator
  static async getByCreator(createdBy) {
    const sql = `
      SELECT e.*, m.name as created_by_name
      FROM events e
      LEFT JOIN members m ON e.created_by = m.id
      WHERE e.created_by = $1
      ORDER BY e.event_date DESC
    `;
    const result = await query(sql, [createdBy]);
    return result.rows;
  }

  // Get event statistics
  static async getStatistics() {
    const sql = `
      SELECT 
        COUNT(*) as total_events,
        COUNT(CASE WHEN event_date > NOW() THEN 1 END) as upcoming_events,
        COUNT(CASE WHEN event_date < NOW() THEN 1 END) as past_events
      FROM events
    `;
    const result = await query(sql);
    return result.rows[0];
  }
}

module.exports = Event;

