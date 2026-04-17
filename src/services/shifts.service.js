import axios from '@axios'
// API unavailable — route through mock client.
import mockHttp from '@/mocks/client'

void axios

export const ShiftsService = {
  getShifts(params) {
    return mockHttp.get('/data-operations/shifts', { params })
  },

  getShiftById(id) {
    return mockHttp.get(`/data-operations/shifts/${id}`)
  },

  createShift(data) {
    return mockHttp.post('/data-operations/shifts', data)
  },

  updateShift(id, data) {
    return mockHttp.put(`/data-operations/shifts/${id}`, data)
  },

  deleteShift(id) {
    return mockHttp.delete(`/data-operations/shifts/${id}`)
  },
}
