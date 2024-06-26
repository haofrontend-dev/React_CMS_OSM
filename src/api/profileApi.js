import { getAxios } from "@/services"

export const profileGetAll = async () => {
  try {
    const response = await getAxios('/user/profile')
    return response
  } catch (error) {
    throw new Error(error);
  }
}
