import { httpService } from "./http.service";

export async function submitRequest(requestData: { userId: number; reason?: string; startDate: string; endDate: string }) {
    return await httpService.post('/vacation/request', requestData)
}

export async function getRequestsForUser(userId: number) {
    return await httpService.get(`/vacation/request/user/${userId}`);
}