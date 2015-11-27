'use strict';

describe('Directive: colorize', function () {

  // load the directive's module
  beforeEach(module('colorWorkerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<colorize></colorize>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the colorize directive');
  }));
});
