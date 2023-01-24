import { Request } from "express";
import { getRepository } from "typeorm";
import { AppResponse } from "../../utils/responseFormats";
import { dues } from "../../entity/dues";
import { validate } from "class-validator";
import { validationError, logError } from "../../utils/logError";

export default async (req: Request, res: AppResponse) => {
  const Dues = getRepository(dues);

  const { field, new_value, id, data } = req.body;
  // Check params
  if ((!field || !new_value || !id) && (!id || !data))
    return res.status(400).json({ error: true, message: "Incomplete Params" });

  try {
    // Find User in Database
    const due = await Dues.findOne(id);
    // If no user is present, return 404
    if (!due)
      return res.status(404).json({ error: true, message: "User not found" });
    if (id && data) {
      const { amount, date, customer_id } = data as dues;
      due.amount = amount;
      due.date = date;
      due.customer_id = customer_id;
    } else {
      // If provided field is not present, return 404
      if (!due[field])
        return res.status(404).json({ error: true, message: "Invalid Field" });
      // Set user's new value
      due[field] = new_value;
    }
    // validate new user
    const errors = await validate(due, { validationError: { target: false } });
    // Return 400 if validation error
    if (errors.length) return validationError(errors, res);
    // Save new user
    await Dues.save(due);
    return res.status(200).json({ success: true, data: due });
  } catch (err) {
    // log everything else as 500
    logError(err, res);
  }
};
