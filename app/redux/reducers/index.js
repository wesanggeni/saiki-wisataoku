import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import {DESTROY_SESSION} from '../constants/action-types';

const rootReducer = combineReducers({
  dataReducer: dataReducer,
});

const appReducer = (state, action) => {
  if(action.type === DESTROY_SESSION){
    state = undefined;
  }
  
  return rootReducer(state, action);
};

export default appReducer;