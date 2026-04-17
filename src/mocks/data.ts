// Dummy/mock data used while the backend API is unavailable.
// Keep this file as the single source of truth for mock responses.

export const MOCK_TOKEN = 'mock-jwt-token-1234567890abcdef';

export const MOCK_PERMISSIONS = [
  'interactive_map.view',
  'operations_platform.view',
  'readiness_indicators.view',
  'data_platform.view',
  'companies_performance.view',
  'recruitment_indicators.view'
];

export const MOCK_USER = {
  id: 1,
  name: 'مستخدم تجريبي',
  email: 'demo@imtithal1446.com',
  sa_id: '1000000000',
  role: { id: 1, name: 'Admin' },
  parent_companies: [],
  permissions: MOCK_PERMISSIONS
};

// Response shape returned by the login endpoint (matches what the app expects).
export const MOCK_LOGIN_RESPONSE = {
  token: MOCK_TOKEN,
  user: {
    user: MOCK_USER,
    token: MOCK_TOKEN
  },
  data: {
    token: MOCK_TOKEN,
    user: {
      user: MOCK_USER,
      permissions: MOCK_PERMISSIONS
    }
  }
};

export const MOCK_LOGOUT_RESPONSE = {
  success: true,
  message: 'تم تسجيل الخروج بنجاح'
};

export const MOCK_SHIFTS = [
  {
    id: 1,
    name: 'الوردية الصباحية',
    start_time: '06:00',
    end_time: '14:00',
    status: 'active',
    employees_count: 25,
    created_at: '2026-01-10T08:00:00Z'
  },
  {
    id: 2,
    name: 'الوردية المسائية',
    start_time: '14:00',
    end_time: '22:00',
    status: 'active',
    employees_count: 18,
    created_at: '2026-01-11T08:00:00Z'
  },
  {
    id: 3,
    name: 'الوردية الليلية',
    start_time: '22:00',
    end_time: '06:00',
    status: 'inactive',
    employees_count: 10,
    created_at: '2026-01-12T08:00:00Z'
  }
];

export const MOCK_SHIFTS_RESPONSE = {
  data: MOCK_SHIFTS,
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: MOCK_SHIFTS.length
  }
};
