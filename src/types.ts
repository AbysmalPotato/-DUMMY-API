export interface Division {
  division_id: number;
  division_name: string;
  division_code: string;
}

export interface EmployeeProfile {
  employee_id: number;
  employee_no: string;
  last_name: string;
  first_name: string;
  middle_name: string | null;
  position_title: string;
  plantilla_item_no: string;
  salary_grade: number;
  step: number;
  basic_monthly_salary: string;
  division_id: number;
  division_name: string;
  division_code: string;
  employment_status: string;
  official_station: string | null;
  date_original_appointment: string | null;
  last_promotion_date: string | null;
  gsis_bp_no: string;
  gsis_crn: string;
  pagibig_mid_no: string;
  philhealth_no: string;
  tin: string;
}

export interface EmployeeResponse {
  success: boolean;
  data: {
    current_page: number;
    data: EmployeeProfile[];
  };
}

export interface AttendanceLog {
  in: string | null;
  out: string | null;
}

export interface AttendanceLogs {
  am: AttendanceLog;
  pm: AttendanceLog;
  ot: AttendanceLog;
}

export interface AttendanceRecord {
  user_id: number;
  user_name: string;
  date: string;
  logs: AttendanceLogs;
  status: string;
  remarks: string | null;
}

export interface AttendanceResponse {
  status: string;
  meta: {
    count: number;
    start_date: string;
    end_date: string;
  };
  data: AttendanceRecord[];
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
