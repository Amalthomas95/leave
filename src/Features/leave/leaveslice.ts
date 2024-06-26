import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Leave {
  id: number;
  name: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface LeaveState {
  leaveApplications: Leave[];
}

const initialState: LeaveState = {
  leaveApplications: JSON.parse(localStorage.getItem('leaveApplications') || '[]'),
};

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    addLeaveApplication(state, action: PayloadAction<Leave>) {
      state.leaveApplications.push(action.payload);
      localStorage.setItem('leaveApplications', JSON.stringify(state.leaveApplications));
    },
    approveLeave(state, action: PayloadAction<number>) {
      const id = action.payload;
      const leaveAppIndex = state.leaveApplications.findIndex(app => app.id === id);
      if (leaveAppIndex !== -1) {
        state.leaveApplications[leaveAppIndex].status = 'Approved';
        localStorage.setItem('leaveApplications', JSON.stringify(state.leaveApplications));
      }
    },
    rejectLeave(state, action: PayloadAction<number>) {
      const id = action.payload;
      const leaveAppIndex = state.leaveApplications.findIndex(app => app.id === id);
      if (leaveAppIndex !== -1) {
        state.leaveApplications[leaveAppIndex].status = 'Rejected';
        localStorage.setItem('leaveApplications', JSON.stringify(state.leaveApplications));
      }
    },
  },
});

export const { addLeaveApplication, approveLeave, rejectLeave } = leaveSlice.actions;

export default leaveSlice.reducer;
