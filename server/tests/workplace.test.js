const { Workplace } = require('../models');

describe('Workplace Database Operations', () => {
  let testWorkplaceId;

  afterAll(async () => {
    // Clean up test data
    if (testWorkplaceId) {
      await Workplace.delete(testWorkplaceId);
    }
  });

  describe('Workplace Creation', () => {
    test('should create a new workplace successfully', async () => {
      const workplaceData = {
        name: 'Workplace Test Workplace',
        location: 'Test Location'
      };

      const workplace = await Workplace.create(workplaceData);
      testWorkplaceId = workplace.id;

      expect(workplace).toBeDefined();
      expect(workplace.name).toBe(workplaceData.name);
      expect(workplace.location).toBe(workplaceData.location);
    });

    test('should fail to create workplace with duplicate name', async () => {
      const workplaceData = {
        name: 'Workplace Test Workplace', // Same name as above
        location: 'Different Location'
      };

      await expect(Workplace.create(workplaceData)).rejects.toThrow();
    });
  });

  describe('Workplace Retrieval', () => {
    test('should find workplace by ID', async () => {
      const workplace = await Workplace.findById(testWorkplaceId);

      expect(workplace).toBeDefined();
      expect(workplace.id).toBe(testWorkplaceId);
      expect(workplace.name).toBe('Workplace Test Workplace');
    });

    test('should find workplace by name', async () => {
      const workplace = await Workplace.findByName('Workplace Test Workplace');

      expect(workplace).toBeDefined();
      expect(workplace.name).toBe('Workplace Test Workplace');
    });

    test('should find all workplaces', async () => {
      const workplaces = await Workplace.findAll();

      expect(workplaces).toBeDefined();
      expect(Array.isArray(workplaces)).toBe(true);
      expect(workplaces.length).toBeGreaterThan(0);
    });

    test('should return undefined for non-existent workplace', async () => {
      const workplace = await Workplace.findById(99999);
      expect(workplace).toBeUndefined();
    });
  });

  describe('Workplace Member Count', () => {
    test('should get member count for workplace', async () => {
      const count = await Workplace.getMemberCount(testWorkplaceId);

      expect(typeof count).toBe('string'); // PostgreSQL returns COUNT as string
      expect(parseInt(count)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Workplace Updates', () => {
    test('should update workplace information', async () => {
      const updateData = {
        name: 'Updated Workplace Test Workplace',
        location: 'Updated Location'
      };

      const updatedWorkplace = await Workplace.update(testWorkplaceId, updateData);

      expect(updatedWorkplace).toBeDefined();
      expect(updatedWorkplace.name).toBe('Updated Workplace Test Workplace');
      expect(updatedWorkplace.location).toBe('Updated Location');
    });

    test('should fail to update with invalid data', async () => {
      const updateData = { invalid_field: 'test' };

      await expect(Workplace.update(testWorkplaceId, updateData)).rejects.toThrow();
    });
  });

  describe('Workplace Statistics', () => {
    test('should get workplace statistics', async () => {
      const stats = await Workplace.getStatistics();

      expect(stats).toBeDefined();
      expect(Array.isArray(stats)).toBe(true);
      expect(stats.length).toBeGreaterThan(0);
    });

    test('should get workplaces with counts', async () => {
      const workplaces = await Workplace.findAllWithCounts();

      expect(workplaces).toBeDefined();
      expect(Array.isArray(workplaces)).toBe(true);
      expect(workplaces.length).toBeGreaterThan(0);
    });
  });

  describe('Workplace Deletion', () => {
    test('should delete workplace successfully', async () => {
      const deletedWorkplace = await Workplace.delete(testWorkplaceId);

      expect(deletedWorkplace).toBeDefined();
      expect(deletedWorkplace.id).toBe(testWorkplaceId);

      // Verify workplace is deleted
      const workplace = await Workplace.findById(testWorkplaceId);
      expect(workplace).toBeUndefined();

      testWorkplaceId = null; // Prevent cleanup in afterAll
    });
  });
});
