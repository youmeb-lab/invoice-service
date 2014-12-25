'use strict';

var validator = require('./validator');
var VALIDATE_ERROR = require('../../error-types').VALIDATE_ERROR;

module.exports = function () {
  return function *validate(next) {
    try {
      validateData(this.data);
      validateItems(this.items);
    } catch (e) {
      e.type = VALIDATE_ERROR;
      throw e;
    }
    yield* next;
  };
};

function validateData(data) {
  var v = validator(data);

  v.required('OrderId', [ 'string', 'number' ], 50);
  v.required('OrderDate', [ 'string', 'number' ], 10);
  v.required('BuyerIdentifier', [ 'string', 'number' ], 10);
  v.required('BuyerName', [ 'string', 'number' ], 60);

  (data.DonateMark === 2 ? v.required : v.optional)
    .call(v, 'BuyerAddress', [ 'string', 'number' ], 100);

  v.optional('BuyerPersonInCharge', [ 'string', 'number' ], 30);
  v.optional('BuyerTelephoneNumber', [ 'string', 'number' ], 26);
  v.optional('BuyerFacsimileNumber', [ 'string', 'number' ], 26);
  v.required('BuyerEmailAddress', [ 'string', 'number' ], 80);
  v.optional('BuyerCustomerNumber', [ 'string', 'number' ], 20);
  v.required('DonateMark', [ 'number' ], 1);
  v.required('InvoiceType', [ 'string' ], 2);
  v.optional('CarrierType', [ 'string', 'number' ], 6);
  v.optional('CarrierId1', [ 'string', 'number' ], 64);
  v.optional('CarrierId2', [ 'string', 'number' ], 64);

  (data.DonateMark === 1 ? v.required : v.optional)
    .call(v, 'NPOBAN', [ 'string', 'number' ], [3, 8]);

  v.required('TaxType', [ 'string', 'number' ], 1);
  v.optional('TaxRate', [ 'number' ], 6);
  v.required('PayWay', [ 'string', 'number' ], 1);
  v.optional('Remark', [ 'string', 'number' ], 200);
}

function validateItems(items) {
  items.forEach(function (item) {
    var v = validator(item);
    
    v.required('ProductionCode', [ 'string', 'number' ], 20);
    v.required('Description', [ 'string', 'number' ], 256);
    v.required('Quantity', [ 'number' ], 17);
    v.optional('Unit', [ 'string', 'number' ], 6);
    v.required('UnitPrice', [ 'number' ], 17);
  });
}
