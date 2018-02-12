angular.module('hopefr').filter('dateSuffix', dateSuffix);

function dateSuffix($filter) {
	// body...
	var suffixes = ['th', 'st', 'nd', 'rd'];

	return function(string){
		if(string){
			var dtfilter = $filter('date')(string, 'dd MMMM yyyy @ H:m:s');
			var day = parseInt(dtfilter.substr(0,2));
			var relevantDigits = (day < 30) ? day%20 : day%30
			var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
			dtfilter = dtfilter.substring(2);
			return day + suffix + dtfilter;
			}
	}
}