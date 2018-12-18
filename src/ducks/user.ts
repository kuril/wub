import { Reducer, Action } from 'redux';
import { UserState, RootState } from 'types/wub';

const USER_SET_NAME = "user/setName"
const USER_SET_IS_PREMIUM = "user/setIsPremium"

type userNameAction = Action & { payload: string };
type userIsPremiumAction = Action & { payload: boolean };
type UserAction = userIsPremiumAction | userNameAction;


const userInitialState: UserState = {
    username: null,
    isPremium: false,
}

const createUserNameAction = (payload: string) => ({ type: USER_SET_NAME, payload })
const createUserIsPremiumAction = (payload: boolean) => ({ type: USER_SET_IS_PREMIUM, payload })

const userReducer: Reducer<UserState> = (state:UserState = userInitialState, action: UserAction) => {
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

const selectUserName = (state:RootState) => state.user.username;

export {
    userInitialState,
    createUserNameAction,
    createUserIsPremiumAction,
    userReducer,
    UserAction,
    selectUserName,
}