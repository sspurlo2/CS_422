const { query } = require('../config/db');

class Workplace {
  // Find all workplaces
  static async findAll() {
    const sql = 'SELECT * FROM workplaces ORDER BY name ASC';
    const result = await query(sql);
    return result.rows;
  }

  // Find workplace by ID
  static async findById(id) {
    const sql = 'SELECT * FROM workplaces WHERE id = $1';
    const result = await query(sql, [id]);
    return result.rows[0];
  }

  // Find workplace by name
  static async findByName(name) {
    const sql = 'SELECT * FROM workplaces WHERE name = $1';
    const result = await query(sql, [name]);
    return result.rows[0];
  }

  // Get member count for a workplace
  static async getMemberCount(id) {
    const sql = `
      SELECT COUNT(*) as member_count
      FROM members 
      WHERE workplace_id = $1 AND membership_status = 'active'
    `;
    const result = await query(sql, [id]);
    return result.rows[0].member_count;
  }

  // Create new workplace
  static async create(workplaceData) {
    const { name, location } = workplaceData;
    const sql = `
      INSERT INTO workplaces (name, location)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await query(sql, [name, location]);
    return result.rows[0];
  }

  // Update workplace
  static async update(id, data) {
    const allowedFields = ['name', 'location'];
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
      UPDATE workplaces 
      SET ${updates.join(', ')}
      WHERE id = $${++paramCount}
      RETURNING *
    `;

    const result = await query(sql, values);
    return result.rows[0];
  }

  // Delete workplace
  static async delete(id) {
    const sql = 'DELETE FROM workplaces WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);
    return result.rows[0];
  }

  // Get workplace statistics
  static async getStatistics() {
    const sql = `
      SELECT 
        w.name as workplace_name,
        w.location,
        COUNT(m.id) as total_members,
        COUNT(CASE WHEN m.membership_status = 'active' THEN 1 END) as active_members,
        COUNT(CASE WHEN m.dues_status = 'paid' THEN 1 END) as paid_dues
      FROM workplaces w
      LEFT JOIN members m ON w.id = m.workplace_id
      GROUP BY w.id, w.name, w.location
      ORDER BY total_members DESC
    `;
    const result = await query(sql);
    return result.rows;
  }

  // Get workplaces with member counts
  static async findAllWithCounts() {
    const sql = `
      SELECT 
        w.*,
        COUNT(m.id) as member_count,
        COUNT(CASE WHEN m.membership_status = 'active' THEN 1 END) as active_member_count
      FROM workplaces w
      LEFT JOIN members m ON w.id = m.workplace_id
      GROUP BY w.id, w.name, w.location, w.created_at
      ORDER BY member_count DESC
    `;
    const result = await query(sql);
    return result.rows;
  }
}

module.exports = Workplace;

