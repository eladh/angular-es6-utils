define(function () {
	Function.prototype.$directive = function () {
		var directive = this;
		return function () {
			return new directive();
		};
	};

	/**
	 * Base Directive
	 *
	 *  Fields: priority, terminal, restrict, templateUrl, template, scope, transclude, controller, controllerAs, require
	 *  @see https://docs.angularjs.org/api/ng/service/$compile
	 *  @see https://docs.angularjs.org/guide/directive
	 */
	class Directive {
		compile(tElement, tAttrs) {
			return {
				pre: this.preLink.bind(this), // todo yoava >> check performance impact
				post: this.link.bind(this)
			};
		}

		preLink($scope, $element, $attrs, $controller, $transclude) {
		}

		link($scope, $element, $attrs, $controller, $transclude) {
		}
	}

	return Directive;
});
