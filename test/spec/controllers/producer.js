'use strict';

describe('Controller: ProducerCtrl', function () {

  // load the controller's module
  beforeEach(module('colorWorkerApp'));

  var ProducerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProducerCtrl = $controller('ProducerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProducerCtrl.awesomeThings.length).toBe(3);
  });
});
