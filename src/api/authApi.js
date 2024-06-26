import { postAxios } from "@/services"

export const AuthLogin = async ({ email, password }) => {
  try {
    const response = await postAxios('/auth/login', {
      email,
      password
    })

    return response
  } catch (error) {
    throw new Error(error);
  }
}
