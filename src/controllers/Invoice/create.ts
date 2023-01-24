import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { invoice } from '../../entity/invoice';
import { logError, validationError } from '../../utils/logError';
import { validate } from 'class-validator';
import { generatePDF } from '../../helpers/pdfGenerator';
import uploadFile from '../../helpers/uploadFile';
import getSignedS3URL from '../../helpers/getSignedUrl';
let data = require('../../templates/invoice.handlebars.json');
const fs = require('fs');

export default async (req: Request, res: AppResponse) => {
  const Invoice = getRepository(invoice);
  const {
    customer_name,
    customer_address,
    customer_phone,
    customer_email,
    discount,
    date,
    notes,
    items,
    gst,
    received_amount,
    payment_type,
  } = req.body;

  const new_invoice = new invoice();

  new_invoice.customer_name = customer_name;
  new_invoice.customer_address = customer_address;
  new_invoice.customer_phone = customer_phone;
  new_invoice.customer_email = customer_email;
  new_invoice.discount = discount;
  new_invoice.date = date;
  new_invoice.notes = notes;
  new_invoice.received_amount = received_amount;
  new_invoice.gst = gst;
  new_invoice.payment_type = payment_type;
  new_invoice.amount = 0;
  new_invoice.total = 0;

  let invoice_id = new_invoice.id;
  try {
    // Check for validation errors
    let errors = await validate(invoice, {
      validationError: { target: false },
    });

    // Return errors if any
    if (errors.length) return validationError(errors, res);

    if (!customer_name || !date || !items || !received_amount || !payment_type) {
      return res.status(400).json({
        message: 'Please fill all the required fields',
      });
    }

    // Insert into database
    await Invoice.insert(new_invoice);
    invoice_id = new_invoice.id;
    let amount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const { name, type, description, weight, rate, unit } = item;
      let item_amount = (weight * rate) / 10;
      data.items.push({
        name,
        type,
        description,
        weight,
        rate,
        unit,
        amount: item_amount,
      });
      amount += item_amount;
    }

    let cgst_amount = 0;
    let sgst_amount = 0;
    let total_amount = 0;
    if (gst) {
      cgst_amount = (amount * 1.5) / 100;
      sgst_amount = (amount * 1.5) / 100;
      total_amount = amount + cgst_amount + sgst_amount - discount;
      new_invoice.cgst_amount = cgst_amount;
      new_invoice.sgst_amount = sgst_amount;
    } else {
      total_amount = amount - discount;
    }

    let balance_amount = total_amount - received_amount;
    new_invoice.amount = amount;
    new_invoice.total = total_amount;
    new_invoice.discount = discount;
    new_invoice.balance_amount = balance_amount;
    new_invoice.invoice_name = `invoice_${invoice_id}.pdf`;

    const invoice_date = date.split('T')[0];

    data = {
      ...data,
      customer: {
        name: customer_name,
        address: customer_address,
        mobile: customer_phone,
        email: customer_email,
      },
      invoice: {
        id: invoice_id,
        date: invoice_date,
        amount,
        discount,
        total_amount,
        notes,
        gst,
        cgst_amount,
        sgst_amount,
        cgst_rate: 1.5,
        sgst_rate: 1.5,
        received_amount,
        balance_amount,
        payment_type,
      },
    };

    const pdf = await generatePDF(JSON.stringify(data));
    const fileName = `invoice_${invoice_id}.pdf`;
    await uploadFile(fileName, pdf);
    return res.status(200).json({
      success: true,
      message: 'Invoice created successfully',
      data: {
        invoice_id,
        fileName,
      },
    });
  } catch (err) {
    console.log('err', err);
    if (invoice_id) {
      await Invoice.delete({ id: invoice_id });
    }
    logError(err, res);
  }
};
