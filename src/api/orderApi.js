import { getAxios } from "@/services"

export const OrderGetAll = async () => {
  try {
    const response = await getAxios('/orders/list')
    return response
  } catch (error) {
    throw new Error(error);
  }
}
