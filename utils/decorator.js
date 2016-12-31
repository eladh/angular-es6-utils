define(function () {
	function decorate(method, decMethod) {
		return function () {
			// chain = method.bind(this);
			var _this = this;
			var chain = function () {
				return method.apply(_this, arguments);
			};

			// pass chain as first argument
			Array.prototype.unshift.call(arguments, chain);

			// invoke decorator method
			return decMethod.apply(this, arguments);
		}
	}

	return  {
		/**
		 * Decorates a class with an object or class.
		 * Decorated methods de overridden by decorators methods
		 * decorators can call $chain() to invoke original decoratedClass method
		 * @param decoratedClass the target class to decorate
		 * @param decorators vararg of decorators
		 * @returns decorated class
		 * @example
		 class Decorator {
				doStuff(param) {
					// ... do decorator stuff

					// call original method
					$chain(param);
				}
			}
		 */
		decorate: function (decoratedClass, decorators) {
			var prototype = decoratedClass.prototype;

			for (var i = 1; i < arguments.length; i++) {
				var decClass = arguments[i];
				var decPrototype = decClass.prototype || decoratedClass;
				for (var key in decPrototype) {
					if (decPrototype.hasOwnProperty(key)) {
						// if method already exists in target class we need to decorate it
						if (typeof(prototype[key]) == "function") {
							prototype[key] = decorate(prototype[key], decPrototype[key]);
						} else {
							// method doesn't exist in sub-class, can copy as-is
							prototype[key] = decPrototype[key];
						}
					}
				}
			}

			return decoratedClass;
		}
	}
});