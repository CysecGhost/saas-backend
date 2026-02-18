import { Router } from "express";
import { createOrg, getOrgs, inviteUser } from "../controllers/orgController.js";
import { validate } from "../middlewares/validate.js";
import { createOrgSchema, inviteUserSchema } from "../schemas/orgSchema.js";
import orgMiddleware, { requireRole } from "../middlewares/orgMiddleware.js";

const router = Router();

router.post("/", validate(createOrgSchema), createOrg);
router.get("/", getOrgs);
router.post("/invite", validate(inviteUserSchema), orgMiddleware, requireRole(["ADMIN"]), inviteUser);

export default router;