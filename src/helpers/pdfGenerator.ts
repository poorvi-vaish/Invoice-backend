var html_to_pdf = require('html-pdf-node');
import { resolve } from 'url';
import { generateInvoiceHTML } from './invoice';

export const generatePDF = async (invoice) => {
  const options = { format: 'A4',
    printBackground: true,
  
    };
  try {
    const html = await generateInvoiceHTML(invoice);
    const file = { content: html };
    const pdf = await html_to_pdf.generatePdf(file, options);
    return pdf;
  } catch (error) {
    console.log(error);
  }
};
