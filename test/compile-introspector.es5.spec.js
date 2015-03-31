describe('$compileIntrospector', function () {

  var $compileProvider;

  beforeEach(function() {
    module('ng');
    module('ngNewRouter');
    module(function(_$compileProvider_) {
      $compileProvider = _$compileProvider_;
    });
  });

  it('should call the introspector function whenever a controller is registered', inject(function ($compileIntrospector) {
    var spy = jasmine.createSpy();
    $compileIntrospector(spy);
    var DirectiveFactory = function() {
      return {
        template: "awesome",
        controller: function() {}
      };
    }
    DirectiveFactory.$routeConfig = [{ path: '/', component: 'example' }];
    $compileProvider.directive('some', DirectiveFactory);
    expect(spy).toHaveBeenCalledWith('some', [{ path: '/', component: 'example' }]);
  }));

  it('should call the introspector function whenever a controller is registered with array annotations', inject(function ($compileIntrospector) {
    var spy = jasmine.createSpy();
    $compileIntrospector(spy);
    var DirectiveFactory = function(foo) {
      return {
        template: "awesome",
        controller: function() {}
      };
    }
    DirectiveFactory.$routeConfig = [{ path: '/', component: 'example' }];
    $compileProvider.directive('some', ['foo', DirectiveFactory]);
    expect(spy).toHaveBeenCalledWith('some', [{ path: '/', component: 'example' }]);
  }));
});
