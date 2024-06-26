import { getAxios } from "@/services"

export const UserGetAll = async () => {
  try {
    const response = await getAxios('/user/list')
    return response
  } catch (error) {
    throw new Error(error);
  }
}
