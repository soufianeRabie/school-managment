import { configureStore } from "@reduxjs/toolkit";
import StudentSlice from "../features/Student/StudentSlice.jsx";

const studentStore = configureStore({
    reducer: {
        student: StudentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['payload.headers'],
            },
        }),
});

export default studentStore;
