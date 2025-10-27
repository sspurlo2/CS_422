const { Member, Event, Attendance, Workplace, Role } = require('../models');

class ReportController {
  // Get membership report
  static async getMembershipReport(req, res) {
    try {
      const memberStats = await Member.getStatistics();
      const roleStats = await Role.getStatistics();
      const workplaceStats = await Workplace.getStatistics();

      res.json({
        success: true,
        data: {
          membership: memberStats,
          roles: roleStats,
          workplaces: workplaceStats
        }
      });
    } catch (error) {
      console.error('Get membership report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get attendance report
  static async getAttendanceReport(req, res) {
    try {
      const { member_id, event_id, date_from, date_to } = req.query;

      let reportData = {};

      if (member_id) {
        // Individual member attendance report
        const member = await Member.findById(member_id);
        if (!member) {
          return res.status(404).json({
            success: false,
            message: 'Member not found'
          });
        }

        const attendanceHistory = await Attendance.findByMember(member_id);
        const attendanceStats = await Attendance.getStatistics(member_id);
        const attendanceRate = await Attendance.getAttendanceRate(member_id);

        reportData = {
          member,
          attendance_history: attendanceHistory,
          statistics: attendanceStats,
          attendance_rate: attendanceRate
        };
      } else if (event_id) {
        // Event-specific attendance report
        const event = await Event.findById(event_id);
        if (!event) {
          return res.status(404).json({
            success: false,
            message: 'Event not found'
          });
        }

        const attendance = await Attendance.findByEvent(event_id);
        const summary = await Attendance.getMeetingSummary(event_id);

        reportData = {
          event,
          attendance,
          summary
        };
      } else {
        // General attendance report
        const recentCheckIns = await Attendance.getRecentCheckIns(20);
        const eventStats = await Event.getStatistics();

        reportData = {
          recent_check_ins: recentCheckIns,
          event_statistics: eventStats
        };
      }

      res.json({
        success: true,
        data: reportData
      });
    } catch (error) {
      console.error('Get attendance report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get workplace report
  static async getWorkplaceReport(req, res) {
    try {
      const workplaceStats = await Workplace.getStatistics();
      const workplacesWithCounts = await Workplace.findAllWithCounts();

      res.json({
        success: true,
        data: {
          statistics: workplaceStats,
          workplaces: workplacesWithCounts
        }
      });
    } catch (error) {
      console.error('Get workplace report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get dues report
  static async getDuesReport(req, res) {
    try {
      const memberStats = await Member.getStatistics();
      
      // Get detailed dues breakdown by workplace
      const duesByWorkplace = await Workplace.getStatistics();

      // Get members with unpaid dues
      const unpaidMembers = await Member.findAll({ dues_status: 'unpaid' });

      res.json({
        success: true,
        data: {
          summary: {
            total_members: memberStats.total_members,
            paid_dues: memberStats.paid_dues,
            unpaid_dues: memberStats.unpaid_dues,
            exempt_dues: memberStats.exempt_dues,
            payment_rate: memberStats.total_members > 0 
              ? Math.round((memberStats.paid_dues / memberStats.total_members) * 100)
              : 0
          },
          by_workplace: duesByWorkplace,
          unpaid_members: unpaidMembers
        }
      });
    } catch (error) {
      console.error('Get dues report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get comprehensive dashboard report
  static async getDashboardReport(req, res) {
    try {
      const [
        memberStats,
        eventStats,
        recentCheckIns,
        upcomingEvents
      ] = await Promise.all([
        Member.getStatistics(),
        Event.getStatistics(),
        Attendance.getRecentCheckIns(10),
        Event.getUpcoming(5)
      ]);

      res.json({
        success: true,
        data: {
          members: memberStats,
          events: eventStats,
          recent_activity: recentCheckIns,
          upcoming_events: upcomingEvents
        }
      });
    } catch (error) {
      console.error('Get dashboard report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = ReportController;

