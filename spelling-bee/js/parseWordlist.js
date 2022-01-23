<script src="jquery-csv.js"></script>
var csv = require('jquery-csv');
var data = $.csv.toObjects("hardWords.csv");
data.forEach(function(entry) {
    console.log(entry);
});