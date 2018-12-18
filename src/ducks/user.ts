import { Reducer, Action } from 'redux';
import { UserState, RootState } from 'types/wub';

const USER_SET_NAME = "user/setName"
const USER_SET_IS_PREMIUM = "user/setIsPremium"

type userNameAction = Action & { payload: string };
type userIsPremiumAction = Action & { payload: boolean };
export type UserAction = userIsPremiumAction | userNameAction;


export const userInitialState: UserState = {
    username: null,
    isPremium: false,
}

export const createUserNameAction = (payload: string) => ({ type: USER_SET_NAME, payload })
export const createUserIsPremiumAction = (payload: boolean) => ({ type: USER_SET_IS_PREMIUM, payload })

export const userReducer: Reducer<UserState> = (state:UserState = userInitialState, action: UserAction) => {
    switch(action.type) {
        case USER_SET_NAME:
            return { ...state, username: action.payload as string }
        case USER_SET_IS_PREMIUM:
            return { ...state, isPremium: action.payload as boolean }
        default:
            break;
    }
    return state;
}

export const selectUserName = (state:RootState) => state.user.username;
