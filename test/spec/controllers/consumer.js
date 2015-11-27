'use strict';

describe('Controller: ConsumerCtrl', function () {

  // load the controller's module
  beforeEach(module('colorWorkerApp'));

  var ConsumerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConsumerCtrl = $controller('ConsumerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConsumerCtrl.awesomeThings.length).toBe(3);
  });
});
