import * as orgService from "../services/orgService.js";
import AppError from "../lib/AppError.js";
import asyncHandler from "express-async-handler";
export const createOrg = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new AppError("Unauthenticated", 401);
    }
    const userId = req.user.id;
    const { name } = req.body;
    const { membership } = await orgService.createOrg(userId, name);
    res.json({ membership });
});
export const getOrgs = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new AppError("Unauthenticated", 401);
    }
    const userId = req.user.id;
    const { orgs } = await orgService.getOrgs(userId);
    res.json({ orgs });
});
export const inviteUser = asyncHandler(async (req, res) => {
    const { email, role } = req.body;
    if (!req.org?.id) {
        throw new AppError("Organization context missing", 400);
    }
    const { membership } = await orgService.inviteUser(req.org.id, email, role);
    res.json({ membership });
});
//# sourceMappingURL=orgController.js.map