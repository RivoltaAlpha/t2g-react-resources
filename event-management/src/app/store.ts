import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

// Import APIs
import { loginApi } from "../features/Auth/LoginApi";
import { registrationAPI } from "../features/Auth/RegistrationAPI";
import { usersAPI } from "../features/Users/usersApi";
import { eventsAPI } from "../features/Events/eventsApi";
import { registrationsAPI } from "../features/Registrations/registrationsApi";
import { paymentsAPI } from "../features/Payments/paymentsApi";
import { feedbacksAPI } from "../features/Feedbacks/feedbacksApi";

// Import slices
import userActionsReducer from "../features/Users/userActionsSlice";
import userAuthReducer from "../features/Auth/UserAuthSlice";

const store = configureStore({
  reducer: {
    // API reducers
    [usersAPI.reducerPath]: usersAPI.reducer,
    [eventsAPI.reducerPath]: eventsAPI.reducer,
    [registrationsAPI.reducerPath]: registrationsAPI.reducer,
    [paymentsAPI.reducerPath]: paymentsAPI.reducer,
    [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registrationAPI.reducerPath]: registrationAPI.reducer,
    
    // State slices
    userActions: userActionsReducer,
    userAuth: userAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersAPI.middleware,
      eventsAPI.middleware,
      registrationsAPI.middleware,
      paymentsAPI.middleware,
      feedbacksAPI.middleware,
        loginApi.middleware,
      registrationAPI.middleware,
    ),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };