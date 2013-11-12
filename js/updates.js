var myApp = {
	init: function () {
		this.retrieveData(this.requestPath, this.logData, this.timeStampUpdate);
	},
	retrieveData: function (requestPath, updateFunction, timeStamp) {
		console.log("Beginning data retrieval with request Path " + requestPath);
		$.getJSON(requestPath, function(data, textStatus, error) {
			console.log("getJSON succeded, status: " + textStatus);
			updateFunction(data);
			timeStamp(true);
		}).fail(function (jqXHR, textStatus, error){
			console.error("getJSON failed, status: " + textStatus + ", error: "+error);
			timeStamp();
		});
	},
	logData: function (data) {
		for (var item in data) {
			console.log(item);
		}
	},
	call: function (){
		alert('ooh');
	},
	requestPath: "dummyTubeStatus.json",
	timeStampUpdate: function (success){
		var time = myApp.getCurrentDateString()
		if (success){
			console.log("Successful data update at " + time);
		}
		else {
			console.warn("Unsuccessful update at " + time);
		}
	},
	getCurrentDateString: function (){
		var currentdate = new Date();
		return (currentdate.getHours()<10?'0':'') + currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
	}
	
}
$(document).ready(function(){
	myApp.init();
});