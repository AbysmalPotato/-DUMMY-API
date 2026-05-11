import { generateEmployees, generateAttendance, divisions, generateOfficeOrders } from "./data";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const profiles = generateEmployees();
const attendance = generateAttendance();
const officeOrders = generateOfficeOrders();

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const path = new URL(req.url).pathname.replace(/\/$/, "") || "/";

    if (path === "/") {
      return json({
        name: "Employee Dummy Data API",
        version: "1.0.0",
        endpoints: {
          "GET /employees": "All 82 employees (profile + government IDs)",
          "GET /attendance": "All attendance records",
          "GET /divisions": "Division reference data",
        },
      });
    }

    if (path === "/employees") {
      return json({ total: profiles.length, data: profiles });
    }

    if (path === "/attendance") {
      const url = new URL(req.url);
      const employeeId = url.searchParams.get("employee_id");
      const cutoffStart = url.searchParams.get("cutoff_start");
      const cutoffEnd = url.searchParams.get("cutoff_end");

      let filtered = attendance;

      if (employeeId) {
        filtered = filtered.filter((r) => r.employee_id === employeeId);
      }
      if (cutoffStart) {
        filtered = filtered.filter((r) => r.cutoff_start >= cutoffStart);
      }
      if (cutoffEnd) {
        filtered = filtered.filter((r) => r.cutoff_end <= cutoffEnd);
      }

      return json(filtered);
    }

    if (path === "/divisions") {
      return json(divisions);
    }

    if (path === "/office-orders") {
      return json({ total: officeOrders.length, data: officeOrders });
    }

    return json({ error: "Not found" }, 404);
  },
});

console.log(`✅ Employee API running on http://localhost:${PORT}`);
console.log(`   /employees → ${profiles.length} records | /attendance → ${attendance.length} records | /divisions → ${divisions.length} records | /office-orders → ${officeOrders.length} records`);
