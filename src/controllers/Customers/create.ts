import { Request } from "express";
import { getRepository } from "typeorm";
import { AppResponse } from "../../utils/responseFormats";
import { customers } from "../../entity/customers";
import { dues } from "../../entity/dues";
import { logError, validationError } from "../../utils/logError";
import { validate } from "class-validator";

export default async (req: Request, res: AppResponse) => {
  const Customers = getRepository(customers);
  const Dues = getRepository(dues);

  const { name, address, mobile, email, previousDues } = req.body;

  try {
    const customer = Customers.create({ name, address, mobile,email });

    // Check for validation errors
    let errors = await validate(customer, { validationError: { target: false } });

    // Return errors if any
    if (errors.length) return validationError(errors, res);

    // Insert into database
    await Customers.insert(customer);

    if (previousDues) {
      const dues = previousDues as dues[];
      for (let i = 0; i < dues.length; i++) {
        const due = Dues.create({
          amount: dues[i].amount,
          date: dues[i].date,
          customer_id: customer.id,
          description: dues[i].description,
        });
        errors = await validate(due, { validationError: { target: false } });

        // Return errors if any
        if (errors.length) break;

        // Insert into database
        await Dues.insert(due);
      }

      if (errors.length) return validationError(errors, res);
    }

    // return rest
    res.status(200).json({ success: true, data: customer});
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
