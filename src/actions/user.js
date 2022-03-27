import { userConstants } from '../constants/user';

export const authenticate = (data) => ({ type: userConstants.authenticate, payload: data });
