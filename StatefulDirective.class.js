"use strict";
define(['sk.Directive'], function (Directive) {
	/**
	 * Interface:
	 *  - link($scope, $element, $attrs, $controller, $transclude)
	 *  - preLink($scope, $element, $attrs, $controller, $transclude)
	 */
	class StatefulDirective extends Directive {
		constructor() {
			super();
			this.scope = true;
		}

		init($scope, $element, $attrs, $controller, $transclude) {
			// create a new instance which is a subclass of this
			var $this = Object.create(this);

			// allow template to get reference to $this by setting $scope.$this to this
			$scope.$this = $this;

			// inject parameters to new instance
			$this.$scope = $scope;
			$this.$element = $element;
			$this.$attrs = $attrs;
			$this.$controller = $controller;
			$this.$transclude = $transclude;

			// delegate to preLink
			$this.preLink.apply($this, arguments);
		}

		compile() {
			return {
				pre: this.init.bind(this),
				post: function (scope) {
					scope.$this.link.apply(scope.$this, arguments);
				}
			};
		}
	}

	return StatefulDirective;
});