/**
 * enable lazy registration by using this function as a config function
 * for the desired module
 */
define(function () {
	return function (module) {

		//TODO bulid an angular provider to wrap this logic
		return function ($controllerProvider, $compileProvider, $filterProvider, $animateProvider, $provide) {
			module.provider = $provide.provider;
			module.factory = $provide.factory;
			module.service = $provide.service;
			module.value = $provide.value;
			module.animation = $animateProvider.register;
			module.filter = $filterProvider.register;
			module.controller = $controllerProvider.register;
			module.directive = $compileProvider.directive;
			module.constant = $provide.constant;
		};
	}
});