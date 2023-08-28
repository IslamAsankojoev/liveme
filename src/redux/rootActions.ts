import * as userActions from './user/user.actions';
import { actions as userSliceActions } from './user/user.slice';

export const allActions = {
  ...userActions,
  ...userSliceActions,
};

