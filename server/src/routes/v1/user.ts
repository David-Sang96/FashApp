import express from "express";
import {
  allUsers,
  singleUser,
  updateUser,
} from "../../controllers/user.controller";
import { validateRequest } from "../../middlewares/validateRequest.middlware";
import {
  updateUserValidator,
  userIDValidator,
} from "../../validators/user.validator";

const router = express.Router();

router.get("/:id", userIDValidator, validateRequest, singleUser);
router.get("/", allUsers);

router.put("/me", updateUserValidator, validateRequest, updateUser);

export default router;
