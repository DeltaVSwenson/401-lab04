const Categories = require('../categories/categories.js');
const Products = require('../categories/products.js');
function testIt(Model, createTest) {
  describe('Categories Model', () => {
    let model;

    beforeEach(() => {
      model = new Model();
    });

    // How might we repeat this to check on types?
    it('sanitize() returns undefined with missing requirements', () => {
      const schema = model.schema;
      var testRecord = {};
      for (var field in schema) {
        if (schema[field].required) {
          testRecord[field] = null;
        }
      }
      expect(model.sanitize(testRecord)).toBeUndefined();
    });

    it('can post() a new category', () => {
      let obj = createTest;
      return model
        .create(obj)
        .then(record => {
          Object.keys(obj).forEach(key => {
            expect(record[key]).toEqual(obj[key]);
          });
        })
        .catch(e => console.error('ERR', e));
    });

    it('can get() a category', () => {
      let obj = createTest;
      return model.create(obj).then(record => {
        return model.get(record._id).then(category => {
          Object.keys(obj).forEach(key => {
            expect(category[0][key]).toEqual(obj[key]);
          });
        });
      });
    });
    it('can delete() a category', () => {
      let obj = createTest;
      return model.create(obj).then(retrieve => {
        return model.get(retrieve.id).then(record => {
          record = record[0];
          console.log(record.id);
          return model.delete(record.id).then(async () => {
            let fromDB = await model.get(record.id);
            expect(fromDB.length).toBe(0);
          });
        });
      });
    });
    it('can update() a category', () => {
      let obj = createTest;
      return model
        .create(obj)
        .then(record => {
          let newName = { id: record.id, name: 'newName' };
          return model.update(record.id, newName);
        })
        .then(record => {
          expect(record.name).toEqual('newName');
        });
    });
  });
}

testIt(Categories, { name: 'Test Category'});
testIt(Products, {category_id: 'bob', price: 100, weight:5000, quantity_in_stock:7});