import express from "express";
import {
  allUsers,
  deactivateAccount,
  singleUser,
} from "../../controllers/user.controller";
import { validateRequest } from "../../middlewares/validateRequest.middlware";
import {
  deactiveValidator,
  userIDValidator,
} from "../../validators/user.validator";

const router = express.Router();

router.get("/:id", userIDValidator, validateRequest, singleUser);
router.get("/", allUsers);

router.delete("/me", deactiveValidator, validateRequest, deactivateAccount);

export default router;
