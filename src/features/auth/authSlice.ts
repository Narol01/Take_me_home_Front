import { createAppSlice } from "../../app/createAppSlice"
import type { AuthState, UserCreateDto, UserLoginDto, UserUpdateDto} from "./types"
import { PasswordDto, fetchCurrentUser, fetchDeleteUser, fetchLogin, fetchPassword, fetchRegister, fetchUpdateUser, fetchUser, fetchUsers} from "./api"

const initialState: AuthState = {

  user: undefined,
  userUpdateDto: undefined,
  userList: [],
  roles: [],
  isAuthenticated: false,
  token: "",
  loginErrorMessage: undefined,
  registerErrorMessage: undefined,
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({

    register: create.asyncThunk(
      async ({user, file}:{user: UserCreateDto, file: File}) => {
        const response = await fetchRegister(user, file)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.userList.push(action.payload)
          state.registerErrorMessage = undefined;
          // state.user = action.payload
        },
        rejected: (state, action) => {
          state.registerErrorMessage = action.error.message
        },
      },
    ),

    login: create.asyncThunk(
      async (user: UserLoginDto) => {
        const response = await fetchLogin(user)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          const { accessToken } = action.payload
          state.isAuthenticated = true
          localStorage.setItem("token", accessToken)
          state.token = accessToken
          state.loginErrorMessage = undefined
        },
        rejected: (state, action) => {
          state.isAuthenticated = false
          state.token = undefined
          state.loginErrorMessage = action.error.message
        },
      },
    ),

    user: create.asyncThunk(
      async (arg: void) => {
        const response = await fetchCurrentUser()
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.user = action.payload
        },
        rejected: state => {
          state.isAuthenticated = false
          state.token = undefined
        },
      },
    ),

    getUsers: create.asyncThunk(
      async (arg: void) => {
        const response = await fetchUsers()
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.userList = action.payload
        },
        rejected: state => {},
      },
    ),

    author: create.asyncThunk(
      async (author: string) => {
        const response = await fetchUser(author)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.userUpdateDto = action.payload
        },
        rejected: (state, action) => {
          console.error(action.error.message)
        },
      },
    ),

    updateUser: create.asyncThunk(
      async ({ id, userUpdateDto, file }: { id: number, userUpdateDto: UserUpdateDto,  file?: File }) => {
        const response = await fetchUpdateUser(id, userUpdateDto, file)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.user = action.payload
          state.userList = state.userList.map(e => {
            if (e.id === action.payload.id) {
              state.userList.push(action.payload)
              return action.payload
            }
            return e
          })
        },
        rejected: (state, action) => {
          console.error(action.error.message)
        },
      },
    ),

    deleteUser: create.asyncThunk(
      async (id: number) => {
        const response = await fetchDeleteUser(id)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {
          state.userList = state.userList.filter(
            e => e.id !== action.payload.id,
          )
          state.user = action.payload
          state.user = undefined
          state.isAuthenticated = false
          state.token = undefined
        },
        rejected: (state, action) => {
          console.error(action.error.message)
        },
      },
    ),

    logout: create.reducer(state => {
      state.user = undefined
      state.token = undefined
      state.isAuthenticated = false
      localStorage.removeItem("token");
    }),

    checkAuth: create.reducer(state => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      } else {
        state.isAuthenticated = false;
        state.token = undefined;
      }
    }),

    changePassword: create.asyncThunk(
      async (passwordDto: PasswordDto) => {
        const response = await fetchPassword(passwordDto)
        return response
      },
      {
        pending: state => {},
        fulfilled: (state, action) => {},
        rejected: (state, action) => {
          console.error(action.error.message)
        },
      },
    ),
  }),
  selectors: {
    selectUser: userState => userState.user,
    selectUserContacts: userState => userState.userUpdateDto,
    selectRoles: userState => userState.roles,
    selectUsers: userState => userState.userList,
    selectIsAuthenticated: userState => userState.isAuthenticated,
    selectToken: userState => userState.token,
    selectLoginError: userState => userState.loginErrorMessage,
    selectRegisterError: userState => userState.registerErrorMessage,
  },
})

export const { register, login, user, logout, checkAuth, author, updateUser, deleteUser, getUsers, changePassword} = authSlice.actions
export const { selectUser, selectUserContacts, selectRoles, selectUsers, selectIsAuthenticated, selectToken, selectLoginError, selectRegisterError} = authSlice.selectors
