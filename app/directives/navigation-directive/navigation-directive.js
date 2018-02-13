angular.module('hopefr').directive('mhNavigation', mhNavigation);

function mhNavigation() {
	// body...
	return{
		restrict: 'E',
		templateUrl: 'directives/navigation-directive/navigation-directive.html'
	};
}