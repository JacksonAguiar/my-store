import { Router } from "express";
import ProductRouter from "./product.routes";
import UserRouter from "./user.routes";
import SalesRouter from "./sales.routes";
import EnsureAuthenticated from "src/infra/middleware/EnsureAuthenticated";

const appRouter = Router();

appRouter.use(UserRouter);
appRouter.use(EnsureAuthenticated);
appRouter.use("/products", ProductRouter);
appRouter.use("/sales", SalesRouter);

export default appRouter;
