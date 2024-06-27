import { getAxios } from "@/services"

export const VehicleGetAll = async () => {
  try {
    const response = await getAxios('/vehicle/list')

    return response
  } catch (error) {
    throw new Error(error);
  }
}

export const PointsGetAll = async () => {
  try {
    const response = await getAxios('/point/list')

    return response
  } catch (error) {
    throw new Error(error);
  }
}
