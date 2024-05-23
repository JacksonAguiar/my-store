import { Router } from 'express';
import { SaleController } from 'src/web/controllers/SaleController';


const SalesRouter = Router();
const saleController = new SaleController();

SalesRouter.post('/',saleController.create);
SalesRouter.get('/',saleController.fetch);
SalesRouter.put('/:id',saleController.proccessPayment);
SalesRouter.get('/source/:id',saleController.getPaymentSource);

export default SalesRouter;
