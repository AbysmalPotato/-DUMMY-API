export interface Division {
  division_id: number;
  division_name: string;
  division_code: string;
}

export interface EmployeeProfile {
  employee_id: string;
  employee_no: string;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  position_title: string;
  plantilla_item_no: string;
  salary_grade: number;
  step: number;
  basic_monthly_salary: number;
  division_id: number;
  division_name: string;
  division_code: string;
  employment_status: string;
  official_station: string | null;
  date_original_appointment: string | null;
  last_promotion_date: string | null;
  gsis_bp_no: string | null;
  gsis_crn: string | null;
  pagibig_mid_no: string | null;
  philhealth_no: string | null;
  tin: string | null;
}

export interface AttendanceRecord {
  employee_id: string;
  cutoff_start: string;
  cutoff_end: string;
  days_present: number;
  lwop_days: number;
  late_minutes: number;
  undertime_minutes: number;
}

export interface OfficeOrder {
  office_order_no: string;
  employee_no: string;
  purpose: string;
  destination: string;
  travel_type: "local" | "regional" | "national";
  travel_date_start: string;
  travel_date_end: string;
  status: "approved";
  approved_at: string;
  remarks: string | null;
}
