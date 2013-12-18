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
		this.getLineStatus();
	},
	getStationIncidents: function(){},
	getLineStatus: function () {
		$.get('retrieve/underground.php', function (liveLineStatus) {
			console.log(liveLineStatus);
			$(liveLineStatus).find('LineStatus').each(function () {
				
				$line = $(this);
				var name = $($line.children('Line')[0]).attr('Name');
				var status = $($line.children('Status')[0]).attr('Description');
				/*var name = $line.attr('Name')*/
				console.log(name, status);
			});
		});
	},
	
};
myApp.init(lineStatus, 'line-status-template', 'line-status-container');