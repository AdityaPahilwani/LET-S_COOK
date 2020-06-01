import React, { useState } from 'react';
import NAVIGATION from './Navigation/NAVIGATION';
import firebaseConfig from './config'
import firebase from 'firebase';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth-reducer'
import  mealsReducer from './store/reducers/meal-reducer'


firebase.initializeApp(firebaseConfig);

const rootReducer=combineReducers({
  auth:authReducer,
  meal:mealsReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
    <NAVIGATION />
    </Provider>
  );
}


