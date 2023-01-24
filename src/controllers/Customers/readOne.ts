import { Request } from "express";
import { getRepository } from "typeorm";
import { AppResponse } from "../../utils/responseFormats";
import { customers } from "../../entity/customers";
import { logError } from "../../utils/logError";
import { dues } from "../../entity/dues";

export default async (req: Request, res: AppResponse) => {
  const Items = getRepository(customers);
  const Dues = getRepository(dues);

  const { id } = req.body;
  if (!id)
    return res.status(400).json({ error: true, message: "Incomplete Params" });

  try {
    const item = await Items.findOne(id);
    // If no user found, return 404
    if (!item)
      return res.status(404).json({ error: true, message: "Entity not found" });
    const dues = await Dues.find({ where: { customer_id: id } });

    return res.status(200).json({ success: true, data: { ...item, dues } });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
