import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "../features/auth/AuthSlice"

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch