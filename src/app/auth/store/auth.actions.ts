import { Action } from '@ngrx/store';


export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signup implements Action {
  public readonly type = SIGNUP;
}

export class Signin implements Action {
  public readonly type = SIGNIN;
}

export class Logout implements Action {
  public readonly type = LOGOUT;
}

export class SetToken implements Action {
  public readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type AuthActionTypes= Signup | Signin | Logout | SetToken;
