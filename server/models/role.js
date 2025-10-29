const { query } = require('../config/db');

class Role {
  // Find all roles
  static async findAll() {
    const sql = 'SELECT * FROM roles ORDER BY id ASC';
    const result = await query(sql);
    return result.rows;
  }

  // Find role by ID
  static async findById(id) {
    const sql = 'SELECT * FROM roles WHERE id = $1';
    const result = await query(sql, [id]);
    return result.rows[0];
  }

  // Find role by name
  static async findByName(name) {
    const sql = 'SELECT * FROM roles WHERE name = $1';
    const result = await query(sql, [name]);
    return result.rows[0];
  }

  // Create new role
  static async create(roleData) {
    const { name, description } = roleData;
    const sql = `
      INSERT INTO roles (name, description)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await query(sql, [name, description]);
    return result.rows[0];
  }

  // Update role
  static async update(id, data) {
    const allowedFields = ['name', 'description'];
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
      UPDATE roles 
      SET ${updates.join(', ')}
      WHERE id = $${++paramCount}
      RETURNING *
    `;

    const result = await query(sql, values);
    return result.rows[0];
  }

  // Delete role
  static async delete(id) {
    const sql = 'DELETE FROM roles WHERE id = $1 RETURNING *';
    const result = await query(sql, [id]);
    return result.rows[0];
  }

  // Get role statistics
  static async getStatistics() {
    const sql = `
      SELECT 
        r.name as role_name,
        COUNT(m.id) as member_count
      FROM roles r
      LEFT JOIN members m ON r.id = m.role_id
      GROUP BY r.id, r.name
      ORDER BY member_count DESC
    `;
    const result = await query(sql);
    return result.rows;
  }
}

module.exports = Role;

