var lineStatus = {
  "lines": [
    {
      "class": "bakerloo",
      "name": "Bakerloo",
      "status": "Good Service",
	  "serviceClass": "good",
      "details": "No more information available"
    },
    {
      "class": "central",
      "name": "Central",
      "status": "Unknown",
	  "serviceClass": "unknow",
      "details": "No more information available"
    },
    {
      "class": "circle",
      "name": "Circle",
      "status": "Minor Delays",
	  "serviceClass": "minor",
      "details": "No more information available"
    },
    {
      "class": "district",
      "name": "District",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "hammersmith",
      "name": "Hammersmith & City",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "jubilee",
      "name": "Jubilee",
      "status": "Severe Delays",
	  "serviceClass": "major",
      "details": "No more information available"
    },
    {
      "class": "metropolitan",
      "name": "Metropolitan",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "northern",
      "name": "Northern",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "piccadilly",
      "name": "Piccadilly",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "victoria",
      "name": "Victoria",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "waterloo",
      "name": "Waterloo & City",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "dlr",
      "name": "Docklands Light Railway",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "overground",
      "name": "London Overground",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "airline",
      "name": "Emirates Air Line",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "chiltern",
      "name": "Chiltern Railways",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "coast",
      "name": "c2c",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "capital",
      "name": "First Capital Connect",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "western",
      "name": "First Great Western",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "anglia",
      "name": "Greater Anglia",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "midland",
      "name": "London Midland",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "southern",
      "name": "Southern",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "southeastern",
      "name": "Southeastern",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "west",
      "name": "South West Trains",
      "status": "Unknown",
      "details": "No more information available"
    },
    {
      "class": "tramlink",
      "name": "London Tramlink",
      "status": "Unknown",
      "details": "No more information available"
    }
  ]
};
var myApp = {
	init: function (data, templateElement, outputArea) {
		var template = document.getElementById(templateElement).innerHTML;
		var output = Mustache.render(template,data);
		document.getElementById(outputArea).innerHTML = output;
		this.template = template;
		this.data = data
		this.getLineStatus();
		
	},
	getStationIncidents: function(){},
	getLineStatus: function () {
		$.get('retrieve/underground.php', function (liveLineStatus) {
			var output = {};
			console.log(liveLineStatus);
			$(liveLineStatus).find('LineStatus').each(function () {
				
				$line = $(this);
				var name = $($line.children('Line')[0]).attr('Name');
				var cssName = name.split(" ")[0].toLowerCase();
				var status = $($line.children('Status')[0]).attr('Description');
				var details = 'No further details';
				//console.log(name, status, details);
				output[cssName] = {status:status, details:details};
			});
			//console.log(output);
			myApp.updateLineStatus(output);
			var output = Mustache.render(myApp.template,window.lineStatus);
			document.getElementById('line-status-container').innerHTML = output;
		});
	},
	updateLineStatus: function (data) {
		console.log(window.lineStatus);
		var lineStatus = window.lineStatus['lines'];
		var i = lineStatus.length-1;
		if (i > -1) {
			do {
				try {
				var cssClass = lineStatus[i]['class'];
				lineStatus[i]['status'] = data[cssClass]['status'];
				lineStatus[i]['details'] = data[cssClass]['details'];
				}
				catch (e) {
					console.log(lineStatus[i]['class']);
				}
			} while (--i >= 0);
		}
	}
	
};
myApp.init(lineStatus, 'line-status-template', 'line-status-container');