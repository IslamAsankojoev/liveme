import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../redux/store';

export type AppDispatch = typeof store.dispatch;

import { allActions } from '../redux/rootActions';

export const useActions = () => {
  const dispatch: AppDispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
