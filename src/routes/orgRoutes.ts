import { Router } from "express";
import { createOrg, getOrgs } from "../controllers/orgController.js";
import { validate } from "../middlewares/validate.js";
import { createOrgSchema } from "../schemas/orgSchema.js";

const router = Router();

router.post("/", validate(createOrgSchema), createOrg);
router.get("/", getOrgs);

export default router;