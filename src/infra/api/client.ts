import express, { Request, Response } from "express";
import ClientFacadeFactory from "../../client/factory/client.facade.factory";
import { AddClientFacadeInputDto } from "../../client/facade/client.facade.interface";


const clientRouter = express.Router();

clientRouter.post("/", async (req: Request, res: Response) => {

  try {
    const facade = ClientFacadeFactory.create();

    const input: AddClientFacadeInputDto = {
      id: req.body.id as string,
      name: req.body.name as string,
      email: req.body.email as string,
    };

    const result = await facade.add(input);

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

clientRouter.get("/:id", async (req: Request, res: Response) => {

  try {
    const facade = ClientFacadeFactory.create();

    const id = req.params.id as string;

    const result = await facade.find({ id: id });

    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default clientRouter;