import {generateInvoiceHTML} from './helpers/invoice';
const data = {
    "shop": {
      "name": "Maa kaali Jewellers",
      "address": "242 AB Street, MG Road, New Delhi, 100001",
      "phone": "+91-123456789",
      "email": "shop@simpleshop.com"
    },
    "currency": "INR",
    "customer": {
      "name": "John Doe",
      "address": "123 Main Street, New York, NY 10001",
      "mobile": "+91-123456789",
      "email": ""
    },
    "invoice": {
      "id": "00001",
      "date": "12th September, 2019",
      "amount": 15000,
      "discount": 6000,
      "tax_rate": 6,
      "tax_amount": 600,
      "total": 14670,
      "notes": "Labour charges applied"
    },
    "items": [
      {
        "name": "Earrings",
        "type": "Gold",
        "description": "A beautiful gold earrings",
        "weight": 1.4,
        "quantity": 1,
        "rate": 5000.0,
        "unit": "gm",
        "amount": 7000
      },
      {
        "name": "Bangles",
        "type": "Silver",
        "description": "",
        "weight": 1.4,
        "quantity": 1,
        "rate": 5000.0,
        "unit": "gm",
        "amount": 7000
      },
      {
        "name": "Payal",
        "type": "Silver",
        "description": "",
        "weight": 1.4,
        "quantity": 1,
        "rate": 5000.0,
        "unit": "gm",
        "amount": 7000
      },
      {
        "name": "Earrings",
        "type": "Gold",
        "description": "A beautiful gold earrings",
        "weight": 1.4,
        "quantity": 1,
        "rate": 5000.0,
        "unit": "gm",
        "amount": 7000
      },
      {
        "name": "Earrings",
        "type": "Gold",
        "description": "A beautiful gold earrings",
        "weight": 1.4,
        "quantity": 1,
        "rate": 5000.0,
        "unit": "gm",
        "amount": 7000
      },
      {
        "name": "Other",
        "type": "",
        "description": "Labour Charges",
        "weight": 1,
        "quantity": 1,
        "rate": 100.0,
        "unit": "",
        "amount": 100
      }
    ]
  }

generateInvoiceHTML(data);