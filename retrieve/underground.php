<?php
	$enquiry = 'http://cloud.tfl.gov.uk/TrackerNet/LineStatus';
	header('Content-type: application/xml');
	echo file_get_contents($enquiry);
?>