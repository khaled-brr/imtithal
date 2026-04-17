import axios from '@axios'

export const ShiftsService = {
  // Get all shifts with pagination and search
  getShifts(params) {
    return axios.get('/data-operations/shifts', { params })
  },

  // Get shift details by ID
  getShiftById(id) {
    return axios.get(`/data-operations/shifts/${id}`)
  },

  // Create new shift
  createShift(data) {
    return axios.post('/data-operations/shifts', data)
  },

  // Update shift
  updateShift(id, data) {
    return axios.put(`/data-operations/shifts/${id}`, data)
  },

  // Delete shift
  deleteShift(id) {
    return axios.delete(`/data-operations/shifts/${id}`)
  },
}
