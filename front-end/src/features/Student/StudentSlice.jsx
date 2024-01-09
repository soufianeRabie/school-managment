import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { StudentApi } from "../../../Services/Student/StudentApi.js";

const initialState = {
    data: null,
    isLoggedIn: "true" === window.localStorage.getItem("authorized"),
    error :[],
    loading: false
}

const _setIsLoggedIn = (state, isAuthorized) => {
    state.isLoggedIn = isAuthorized;
    window.localStorage.setItem('authorized', isAuthorized);
};


// Thunk for fetching CSRF token
export const fetchCsrfToken = createAsyncThunk('student/fetchCsrfToken', async (_, { dispatch }) => {
    try {
         await StudentApi.getCsrfToken();
          dispatch(getCsrfToken())
    } catch (error) {
        dispatch(setError(error.message))
    }
});

export const loginStudent = createAsyncThunk(
    'student/loginUser',
    async ( userCredentials, { dispatch }) => {
        try {
             await StudentApi.login(userCredentials.email, userCredentials.password);
        } catch (error) {
            dispatch(setError(error.message))
        }
    }
);

const StudentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        getCsrfToken: (state) => state,
        login: (state) => state,
        setStudent: (state, action) => {
            state.data = action.payload;
        },
        logout: (state) => {
            _setIsLoggedIn(state , false)
            state.data = null;
            window.localStorage.removeItem("authorized");
        },
        setIsLoggedIn: (state, action) => {
            _setIsLoggedIn(state, action.payload);
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCsrfToken.pending, (state, action) => {

            })
            .addCase(fetchCsrfToken.fulfilled, (state, action) => {
            })
            .addCase(fetchCsrfToken.rejected, (state, action) => {

            })

            .addCase(loginStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
            })
            .addCase(loginStudent.rejected, (state, action) => {
                 state.loading = false;
            });
    },
});

export const {  setError, setIsLoggedIn, getCsrfToken, login, setStudent, logout } = StudentSlice.actions;
export default StudentSlice.reducer;
