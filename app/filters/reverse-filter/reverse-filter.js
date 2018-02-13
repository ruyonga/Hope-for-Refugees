angular.module('hopefr').filter('reverse',reverse);

function reverse() {
	// body...
//reverse a string
	return function(string){
		if(string){
			return string.split('').reverse().join('');
		}
	}
}