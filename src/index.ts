import { generateEmployees, generateAttendance, divisions, generateOfficeOrders } from "./data";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const profiles = generateEmployees();
const attendance = generateAttendance(profiles);
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
      return json({
        success: true,
        data: {
          current_page: 1,
          data: profiles,
        },
      });
    }

    if (path === "/attendance") {
      const url = new URL(req.url);
      const userId = url.searchParams.get("user_id");
      const startDate = url.searchParams.get("start_date");
      const endDate = url.searchParams.get("end_date");

      let filteredData = attendance.data;

      if (userId) {
        filteredData = filteredData.filter((r) => r.user_id === parseInt(userId));
      }
      if (startDate) {
        filteredData = filteredData.filter((r) => r.date >= startDate);
      }
      if (endDate) {
        filteredData = filteredData.filter((r) => r.date <= endDate);
      }

      return json({
        status: "success",
        meta: {
          count: filteredData.length,
          start_date: attendance.meta.start_date,
          end_date: attendance.meta.end_date,
        },
        data: filteredData,
      });
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
console.log(`   /employees → ${profiles.length} records | /attendance → ${attendance.meta.count} records | /divisions → ${divisions.length} records | /office-orders → ${officeOrders.length} records`);
