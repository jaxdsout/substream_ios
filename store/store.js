import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/search'

const store = configureStore({
    reducer: rootReducer,
});

export default store;