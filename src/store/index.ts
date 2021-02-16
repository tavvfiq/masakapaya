import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reduxThunk from 'redux-thunk';
import recipeReducer from './recipe/reducers';
import { RecipeActionType } from './recipe/types';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['recipe'],
};

const recipePersistConfig = {
  key: 'recipe',
  storage: AsyncStorage,
  whitelist: ['liked', 'noped'],
};

const rootReducer = combineReducers({
  recipe: persistReducer(recipePersistConfig, recipeReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const enhancers = [reduxThunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  enhancers.push(createDebugger());
}

export const store = createStore<any, RecipeActionType, any, any>(
  persistedRootReducer,
  applyMiddleware(...enhancers),
);

export const persistor = persistStore(store);
