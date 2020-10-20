import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  // token: null,
  userId: null,
  firstName: null,
  lastName: null,
  profilePic: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
   //   console.log(action.userId,action.firstName,action.lastName,action.profilePic);
   console.log(action.firstName,action.profilePic,action.firstName,action.lastName);
      return {
        //   token: action.token,
        userId: action.userId,
        firstName: action.firstName,
        lastName: action.lastName,
        profilePic: action.profilePic,
      };
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
