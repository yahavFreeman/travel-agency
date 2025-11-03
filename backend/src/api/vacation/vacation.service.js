// request.service.ts
import Request from "../../models/request.js"; // your Sequelize model for requests
import User from "../../models/user.js";       // Sequelize User model, for joins if needed

function validateRequestInput({ startDate, endDate, reason }) {
  if (!startDate || !endDate) {
    throw new Error("Start date and end date are required");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format");
  }

  if (start > end) {
    throw new Error("Start date cannot be after end date");
  }

  return { startDate: start, endDate: end, reason };
}


export async function getRequestsForUser(userId) {
  try {
    const requests = await Request.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]], // optional: latest first
    });
    return requests.map(r => r.toJSON());
  } catch (error) {
    throw error;
  }
}

export async function getAllRequests() {
  try {
    const requests = await Request.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "role"], // include user info
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return requests.map(r => r.toJSON());
  } catch (error) {
    throw error;
  }
}

export async function createRequest(userId, startDate, endDate, reason) {
  try {
    validateRequestInput({ startDate, endDate, reason });
    const request = await Request.create({
      userId,
      startDate,
      endDate,
      reason,
      status: "pending",
    });
    return request.toJSON();
  } catch (error) {
    throw error;
  }
}

export async function updateRequestStatus(requestId, status, comment) {
  try {
    const request = await Request.findByPk(requestId);
    if (!request) throw new Error("Request not found");
    request.status = status;
    if (comment) request.comment = comment;
    await request.save();
    return request.toJSON();
  } catch (error) {
    throw error;
  }
}
