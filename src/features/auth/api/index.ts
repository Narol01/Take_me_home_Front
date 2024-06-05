import {
  AuthState,
  LoginResponse,
  User,
  UserCreateDto,
  UserLoginDto,
  UserUpdateDto,
} from "../types"

export interface PasswordDto {
  oldPassword: string
  newPassword: string
}

export async function fetchRegister( userCreateDto: UserCreateDto, file: File ): Promise<User> {

  const formData = new FormData()

  // Добавление JSON-объекта как строки
  formData.append('registerDto', JSON.stringify(userCreateDto));
  // Добавление файлов в formData
  formData.append('image', file);

  const res = await fetch(`/api/account`, {
    method: "POST",
    headers: {
      accept: "*/*",
    },
    body: formData,
  })

  if (res.status === 409) {
    throw new Error("Conflict: User already exists.")
  }

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || "Failed to register user.")
  }
  return await res.json()
}

export async function fetchLogin(
  userLoginDto: UserLoginDto,
): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify(userLoginDto),
  })

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message)
  }
  return res.json()
}
export async function fetchCurrentUser(): Promise<User> {
  const res = await fetch("/api/account", {
    headers: {
      //"Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  if (!res.ok) {
    throw new Error("Login failed")
  }
  return res.json()
}
export async function fetchUser(author: string): Promise<UserUpdateDto> {
  const res = await fetch(`/api/account/${author}`, {
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  if (!res.ok) {
    throw new Error("Author does't exsist")
  }
  return res.json()
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/account/users", {
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  return res.json()
}

interface ServerDeleteUserResponse extends User {
  isDeleted: boolean
}

export async function fetchDeleteUser(
  id: number,
): Promise<ServerDeleteUserResponse> {
  const res = await fetch(`/api/account/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  return res.json()
}

export async function fetchUpdateUser( id: number, userUpdateDto: UserUpdateDto, file?: File ): Promise<User> {

  const formData = new FormData();
  
  formData.append('editDto', JSON.stringify(userUpdateDto));
  if (file) {
    formData.append('image', file);
  }
  
  const res = await fetch(`/api/account/user/${id}`, {
    method: "PUT",
    headers: {
      accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
  if (!res.ok) {
    throw new Error("Failed to update user")
  }
  return res.json()
}

export async function fetchPassword(paswordDto: PasswordDto): Promise<void> {
  const res = await fetch(`/api/account/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(paswordDto),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to update password: ${errorText}`)
  }
}
