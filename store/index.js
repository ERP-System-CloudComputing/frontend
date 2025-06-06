export const state = () => ({
  selectedStaff: null
})

export const mutations = {
  SelectedStaffAll (state, staff) {
    state.selectedStaff = staff
  }
}
