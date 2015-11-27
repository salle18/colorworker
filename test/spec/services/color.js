'use strict';

describe('Service: Storage', function () {

  // load the service's module
  beforeEach(module('colorWorkerApp'));

  // instantiate service
  var Storage;
  beforeEach(inject(function (_Color_) {
    Storage = _Color_;
  }));

  it('should do something', function () {
    expect(!!Storage).toBe(true);
  });

});
