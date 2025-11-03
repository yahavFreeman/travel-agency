import { createRequest, getRequestsForUser } from './vacation.service.js';

export async function addRequest(req, res) {
    try {
        const { userId, reason, startDate, endDate } = req.body;
        const vacationRequest = await createRequest(userId, startDate, endDate, reason);
        console.log('Created vacation request:', vacationRequest);
        res.status(201).send(vacationRequest);
    } catch (error) {
        if (error.message && error.message.includes('required')) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: error.message || 'Internal server error' });
        }
    }
}

export async function getUserRequests(req, res) {
    try {
        const { userId } = req.params;
        const requests = await getRequestsForUser(userId);
        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send({ error: error.message || 'Internal server error' });
    }
}