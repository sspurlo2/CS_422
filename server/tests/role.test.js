const { Role } = require('../models');

describe('Role Database Operations', () => {
  let testRoleId;

  afterAll(async () => {
    // Clean up test data
    if (testRoleId) {
      await Role.delete(testRoleId);
    }
  });

  describe('Role Creation', () => {
    test('should create a new role successfully', async () => {
      const roleData = {
        name: 'Role Test Role',
        description: 'Test role for testing purposes'
      };

      const role = await Role.create(roleData);
      testRoleId = role.id;

      expect(role).toBeDefined();
      expect(role.name).toBe(roleData.name);
      expect(role.description).toBe(roleData.description);
    });

    test('should fail to create role with duplicate name', async () => {
      const roleData = {
        name: 'Role Test Role', // Same name as above
        description: 'Duplicate role'
      };

      await expect(Role.create(roleData)).rejects.toThrow();
    });
  });

  describe('Role Retrieval', () => {
    test('should find role by ID', async () => {
      const role = await Role.findById(testRoleId);

      expect(role).toBeDefined();
      expect(role.id).toBe(testRoleId);
      expect(role.name).toBe('Role Test Role');
    });

    test('should find role by name', async () => {
      const role = await Role.findByName('Role Test Role');

      expect(role).toBeDefined();
      expect(role.name).toBe('Role Test Role');
    });

    test('should find all roles', async () => {
      const roles = await Role.findAll();

      expect(roles).toBeDefined();
      expect(Array.isArray(roles)).toBe(true);
      expect(roles.length).toBeGreaterThan(0);
    });

    test('should return undefined for non-existent role', async () => {
      const role = await Role.findById(99999);
      expect(role).toBeUndefined();
    });
  });

  describe('Role Updates', () => {
    test('should update role information', async () => {
      const updateData = {
        name: 'Updated Role Test Role',
        description: 'Updated description'
      };

      const updatedRole = await Role.update(testRoleId, updateData);

      expect(updatedRole).toBeDefined();
      expect(updatedRole.name).toBe('Updated Role Test Role');
      expect(updatedRole.description).toBe('Updated description');
    });

    test('should fail to update with invalid data', async () => {
      const updateData = { invalid_field: 'test' };

      await expect(Role.update(testRoleId, updateData)).rejects.toThrow();
    });
  });

  describe('Role Statistics', () => {
    test('should get role statistics', async () => {
      const stats = await Role.getStatistics();

      expect(stats).toBeDefined();
      expect(Array.isArray(stats)).toBe(true);
      expect(stats.length).toBeGreaterThan(0);
    });
  });

  describe('Role Deletion', () => {
    test('should delete role successfully', async () => {
      const deletedRole = await Role.delete(testRoleId);

      expect(deletedRole).toBeDefined();
      expect(deletedRole.id).toBe(testRoleId);

      // Verify role is deleted
      const role = await Role.findById(testRoleId);
      expect(role).toBeUndefined();

      testRoleId = null; // Prevent cleanup in afterAll
    });
  });
});
