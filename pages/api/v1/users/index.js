import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(req, res) {
  const usersInputValues = req.body;
  const newUser = await user.create(usersInputValues);
  res.status(201).json(newUser);
}
