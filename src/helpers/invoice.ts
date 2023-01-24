import * as Handlebars from 'handlebars';
import { InvoiceData } from '../@types/invoice';
const CachedFS = require('cachedfs');

const fs = new CachedFS();

export const generateInvoiceHTML = async (invoice) => {
  const invoiceTemplate = await getInvoiceTemplate();

  const styles = await getInvoiceStyles();
  Handlebars.registerPartial('src/templates/styles', styles);
  const template = Handlebars.compile(invoiceTemplate);
  const html = template(JSON.parse(invoice));
  return html;
};

export const getInvoiceTemplate = () =>
  new Promise((resolve, reject) => {
    fs.readFile('src/templates/invoice.handlebars', function (err, contents) {
      if (err) reject(err);
      resolve(contents.toString());
    });
  });

export const getInvoiceStyles = (): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile('src/templates/styles.hbs', function (err, contents) {
      if (err) reject(err);
      resolve(contents.toString());
    });
  });
