'use strict';

const DataModel = require('../memory.js');

class Categories extends DataModel {
  constructor() {
    super();
    this.schema = {
      fields: {
        id: { type: 'string', required: true },
        name: { required: true },
      },
    };
  }
}

module.exports = Categories;
