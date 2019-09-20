'use strict';

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      fields: {
        id: { type: 'string', required: true },
        category_id: {type: 'string', required: true },
        price: { type: 'number', required: true },
        weight: { type: 'number', required: false },
        quantity_in_stock: {type: 'number', required: true },
      },
    };
  }
}

module.exports = Products;
