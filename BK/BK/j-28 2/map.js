var centerLng = 14.5640756;
var centerLat = 121.0535951;


var map = L.map('map').setView([centerLng,centerLat], 14);
var buffer = 0.04;
var collection = [];
var geojsonlist = [];
var calDis = [8192,4096,2048,1024,512,256,128,64,32,16,8,4,2,1,2,4,8,16,32];

var routeTemp = {};
var baseSpeed = 3.5; //Walking Speed 3.5km/h


//Temporary Variables
var tempSID = 0;
var tempFID = 0;
var tempS = 0;
var tempF = 0;
var tempPath = [];
var transpoSpeed = 0;

var graph = readyGraph(basicGraph);
var start;
var finish;
var polyline;
var shortestPath;
var toEditIndex = null;

$(document).ready(function () {

    $("#sidebar").mCustomScrollbar({
         theme: "minimal"
    });

	/*
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
*/
});

//$("#bottomFilterAction").click();


var pointListConnections = {};



for(var i=0;i<Object.keys(basicGraph).length;i++){
    //alert(JSON.stringify());
	var pointA = new L.LatLng(nodes[basicGraph[i]["s"]].coord[0],nodes[basicGraph[i]["s"]].coord[1]);
	var pointB = new L.LatLng(nodes[basicGraph[i]["f"]].coord[0],nodes[basicGraph[i]["f"]].coord[1]);
	var pointList = [pointA, pointB];
	pointListConnections[i] = new L.Polyline(pointList, {
		color: 'blue',
		weight: 3,
		opacity: 0.5,
		smoothFactor: 1
	});
	pointListConnections[i].addTo(map);
}

//console.log(JSON.stringify(pointListConnections));
/*
for(var a in basicGraph) {
	
	alert(JSON.stringify(a));
	
	
	
}
*/
//http://{s}.tile.osm.org/{z}/{x}/{y}.png
//https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png
//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
//http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
$('.leaflet-control-attribution').hide()


/*

var geoBoundary = {
	"type": "FeatureCollection",
	"features": [{
		"type": "Feature",
		"id": "GBR",
		"properties": {
			"name": "Makati"
		},
		"geometry": {
			"type": "MultiPolygon",
			"coordinates": [
				[
					[
						[120.99902856758919,14.58042530158878 ],
						[121.06597650032185,14.584080198558361],
						[121.06752145833163,14.528004092069802],
						[ 120.99765527661891,14.525345315658821],
						[120.99902856758919,14.58042530158878 ]
					]
				]
			]
		}
	}]
};


var osm = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    boundary: geoBoundary
  });
map.addLayer(osm);

$('.leaflet-control-attribution').hide()
*/

/*

[120.99902856758919,14.58042530158878 ],
						[121.06597650032185,14.584080198558361],
						[121.06752145833163,14.528004092069802],
						[ 120.99765527661891,14.525345315658821],
						[120.99902856758919,14.58042530158878 ]
						
						[120.99866425340822, 14.561794087162776],
						[121.0168603584216, 14.579654177212976],
						[121.03462731001483, 14.56719380187817],
						[121.05016266414837, 14.56910443847809],
						[121.06698547821736, 14.559966461456021],
						[121.06458221906462, 14.551991190335139],
						[121.06827293847775, 14.550163483443415],
						[121.06295143606816, 14.541107803380656],
						[121.06767212368955, 14.53628903328282],
						[121.0617498064918, 14.534793531538783],
						[121.05926071665507, 14.529226852777132],
						[121.05651413476625, 14.529725367037848],
						[121.05651413476625, 14.538615349210941],
						[121.05170761646085, 14.543184827039079],
						[121.05393921424549, 14.545594150012075],
						[121.05625664271419, 14.547006499533609],
						[121.06037651554739, 14.552655807270769],
						[121.05823074844675, 14.552988114988102],
						[121.06114899170362, 14.557308069778038],
						[121.05411087561355, 14.56220945451581],
						[121.04775940499567, 14.555148102954286],
						[121.04149376506183, 14.555646558713356],
						[121.04647194473529, 14.54185553414769],
						[121.03342568076344, 14.534045776871551],
						[121.0309365909267, 14.534627364053604],
						[121.0201219247395, 14.529891538208288],
						[121.01171051770501, 14.529891538208288],
						[121.01282631659736, 14.538781513697112],
						[121.00862061308011, 14.540941640644236],
						[121.00862061308011, 14.548501918591889],
						[121.00003754417462, 14.553735805598697],
						[120.99866425340822, 14.561794087162776]

[14.58341,120.99063],
[14.54005,120.99046],
[14.58325,121.06908],
[14.53639,121.07217]

map.setView(new L.LatLng(centerLng, centerLat), 15);
*/




/*
$.getJSON('https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/GBR.geo.json').then(function(geoJSON) {
  var osm = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    boundary: geoJSON,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>'
  });
  map.addLayer(osm);
  var ukLayer = L.geoJSON(geoJSON);
  map.fitBounds(ukLayer.getBounds());
});
*/

//var geojson = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"id":663,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.131992578506473,38.42216723394987],[27.13854789733887,38.424125698143435]]}},{"type":"Feature","properties":{"id":749,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.13854789733887,38.424125698143435],[27.147903442382816,38.424512341449876]]}},{"type":"Feature","properties":{"id":765,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.147903442382816,38.424512341449876],[27.156314849853516,38.42047770071574]]}},{"type":"Feature","properties":{"id":781,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.131992578506473,38.42216723394987],[27.143955230712894,38.417855063388195]]}},{"type":"Feature","properties":{"id":797,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.143955230712894,38.417855063388195],[27.156314849853516,38.42047770071574]]}},{"type":"Feature","properties":{"id":813,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.13854789733887,38.424125698143435],[27.145113945007328,38.421183779112695]]}},{"type":"Feature","properties":{"id":829,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.145113945007328,38.421183779112695],[27.147903442382816,38.424512341449876]]}},{"type":"Feature","properties":{"id":845,"adi":"İsimsiz Polyline","fid":"0","uzunluk":"0"},"geometry":{"type":"LineString","coordinates":[[27.145113945007328,38.421183779112695],[27.156314849853516,38.42047770071574]]}}]};

//L.geoJSON(geojson, {style: {color:"#ff0000"}}).addTo(map);


//ADD NODES AND DIRECTIONS START

var newDirection = [];

map.on('click', function(e){
	if($("#actionToDo").val()==1){
		let pname = prompt("Enter name:", "");
		if(pname != ""){
			nodes.push({coord:[e.latlng["lat"],e.latlng["lng"]], name: pname});
			//alert(JSON.stringify( ));
			
			L.circleMarker(e.latlng,{title: Object.keys(nodes)[Object.keys(nodes).length-1],radius:5,color:"#0000ff",fillOpacity:1}).bindTooltip((Object.keys(nodes).length-1)+"", {permanent: true, className: "my-label", offset: [0, 0] }).bindPopup(pname).addTo(map).on("click", circleClick);
			//var marker = new L.marker(e.latlng).addTo(map);
		}
	}
	else if($("#actionToDo").val()==2){
		if(toEditIndex != null){
			nodes[toEditIndex].coord = [e.latlng["lat"],e.latlng["lng"]];
			L.circleMarker(e.latlng,{title: toEditIndex,radius:5,color:"#0000ff",fillOpacity:1}).bindPopup(nodes[toEditIndex].name).addTo(map).on("click", circleClick);
			toEditIndex = null;
		}
	}
});



function savePointDirection(){
	saveData("nodes = "+JSON.stringify(nodes), "nodes.json");
	saveData("basicGraph = "+JSON.stringify(basicGraph), "connections.json");
	
	 
	//var ActivexObj = new ActiveXObject(libraryname.classname[, location]);
	//let newfile = new ActiveXObject("Scripting.FileSystemObject");
	//var editFile = newfile.CreateTextFile("c:\\Demofile.txt", true);
	//editFile.WriteLine("Add sample text to the file...");
	//editFile.WriteLine('steadyAdvice');
	//editFile.Close();
	
	//var txtFile = "text.json";
	//var file = new File(txtFile,"write");
	//var str = JSON.stringify("adasdasd");

	//file.open(); 
	//file.writeline(str);
	//file.close();
}

var saveData = (function () {
var a = document.createElement("a");
// document.body.appendChild(a);
// a.style = "display: none";
return function (data, fileName) {
    var json = data,
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};
}());

//var data = { x: 42, s: "hello, world", d: new Date() },
   // fileName = "my-download.json";

//saveData(data, fileName);

function addDirection(index){
	newDirection.push(index);
	
	if(newDirection.length >= 2){
		if(confirm(nodes[newDirection[0]].name + " -> " +  nodes[newDirection[1]].name)){
			//if(!graph[newDirection[0]][newDirection[1]]){
				basicGraph.push({s: newDirection[0],f: newDirection[1]});
				graph = readyGraph(basicGraph);
				
				var pointA = new L.LatLng(nodes[newDirection[0]].coord[0],nodes[newDirection[0]].coord[1]);
				var pointB = new L.LatLng(nodes[newDirection[1]].coord[0],nodes[newDirection[1]].coord[1]);
				var pointList = [pointA, pointB];
				var firstpolyline = new L.Polyline(pointList, {
					color: 'blue',
					weight: 3,
					opacity: 0.5,
					smoothFactor: 1
				});
				firstpolyline.addTo(map);
	
			//}
		}
		newDirection = [];
	}
}


var nodesOnDisplay = map.createPane('nodes');

function displayNodes(id){
	if($('#' + id).is(":checked")){
		nodesOnDisplay.style.display = '';
	}
	else{
		nodesOnDisplay.style.display = 'none';
	}
}


//ADD NODES AND DIRECTIONS END
function showNodes(nodes){
  for(var a in nodes){
	
    L.circleMarker(nodes[a].coord,{pane: 'nodes',title: a,radius:5,color:"#0000ff",fillOpacity:1})
	.bindPopup(nodes[a].name).bindTooltip(a, {permanent: true, className: "my-label", offset: [0, 0] })
	.addTo(map).on("click", circleClick)
		.on('mouseover', function (e){
            this.openPopup();
		})
		.on('mouseout', function (e) {
            this.closePopup();
        });
  }
}





function getLocation() {
	/*
	 var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
		map.setView(new L.LatLng( position.coords.latitude , position.coords.longitude ), 15);
   };

   function onError(error) {
      fAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
   */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    fAlert("Geolocation is not supported.");
  }
}

function centerLocation(){
	map.setView(new L.LatLng(centerLng, centerLat), 15);
}

function showPosition(position) {
	//const coordinates_array = map.getLayers().map(l => l.feature.geometry.coordinates)
	//let closest_latlng = L.GeometryUtil.closest(map, coordinates_array, [position.coords.latitude, position.coords.longitude])
	map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 18);
}



function circleClick(e) {
    var clickedCircle = e.target;
	swal("Message Notice!", {
    title: "Select Location as?",
    text: "Choose an option what to do with the selected node",
    icon: "info",
    buttons: {
		edit: "Edit Node",
		bind: "Bind Node",
        sPoint: "Starting Point",
        dPoint: "Destination",
    }
	})
	.then((value) => {
		switch (value) {
			case "edit":
				$('#actionToDo option[value="'+2+'"]').attr("selected", "selected");
				toEditIndex = clickedCircle.options.title;
				map.removeLayer(clickedCircle);
				break;
			case "bind":
				$('#actionToDo option[value="'+0+'"]').attr("selected", "selected");
				addDirection(clickedCircle.options.title);
				break;
			
			case "sPoint":
				$('#sPoint option[value="'+clickedCircle.options.title+'"]').attr("selected", "selected");
				clickOption();
				break;

			case "dPoint":
				$('#dPoint option[value="'+clickedCircle.options.title+'"]').attr("selected", "selected");
				clickOption();
				break;
		}
	});

  // do something, like:
  //clickedCircle.bindPopup("some content").openPopup();
}

function clickOption(){
	if( $('#sPoint').val() &&  $('#dPoint').val())
		swal("Message Notice!", {
		title: "Would you like to navigate?",
		text: "The shortest path will be generated upon confimation.",
		icon: "info",
		buttons: {
			No: "No",
			Yes: "Yes",
		}
		})
		.then((value) => {
			switch (value) {

				case "Yes":
					changeDestination();
					break;
			}
		});
}




//showPath(start,shortestPath.path);
showNodes(nodes);
//showStartFinish(start,finish);

function toTest(s,f){
	if(typeof routeTemp[s]=="undefined")
		return false;
	else if( typeof routeTemp[s][f]=="undefined")
		return false;
	return true;
}

function changeDestination(){
	$('#resultDiv').html(`
	
<table class="table">
    <tbody>
      <tr>
        <td>Distance</td>
        <td><b id="pDistance"></b></td>
      </tr>
      <tr>
        <td>Visited Nodes</td>
        <td><b id="pNodes"> </b></td>
      </tr>
      <tr>
        <td>ETA</td>
        <td><b id="eTime"> </b></td>
      </tr>
      <tr>
        <td>Calculation Time</td>
        <td><b id="pCTime"> </b></td>
      </tr>
    </tbody>
  </table> 
	<p>Path</p> <ul id="pRoute" class="timeline"> </ul>`);
	if( $('#sPoint').val() &&  $('#dPoint').val() && $('#algo').val()){
		start = $('#sPoint').val();
		finish = $('#dPoint').val();
		clearMap();
		
		var finalizedPath = [];
		var tempText = "";
		var sIndex = 0;
		var fIndex = 0;
		var tempRPath = [];
		var tempWPath = [];
		shortestPath = solve(graph,start,finish);
		var time = 0;
		var path = shortestPath.path;
		path.unshift(start);
		/*
		if(toTest(start,path[0])){
			tempText += routeTemp[start][path[0]]["name"] + "<br>";
			tempRPat = routeTemp[start][path[0]]["path"];
			for(var i=1;i<tempRPat.length-1;i++){
				finalizedPath.push(tempRPat[i]);
			}
		}
		else{
			tempText += "walk  ";
			tempWPath.push(start);
			tempWPath.push(path[0]);
			finalizedPath.push(path[0]);
		}
		*/
		
		
		var tempRoutePath = {};
		tempRoutePath["name"] = "";
		tempRoutePath["start"] = "";
		tempRoutePath["finish"] = "";
		tempRoutePath["distance"] = "";
		tempRoutePath["time"] = "";
		for(var i=1;i<path.length;i++){
			sIndex = path[i-1];
			fIndex = path[i];
			if(toTest(sIndex,fIndex)){
				if (tempWPath.length >= 1) {
					tempWPath.push(sIndex);
					
					
					distance = roundOffNumber(calculateDistance(tempWPath,null));
					time = roundOffNumber(((distance/1000)/baseSpeed)*60);
					tempText += `<li>
									<a target="_blank" href="#">Walk</a>
									<a href="#" class="float-right">`+showTime(time)+`</a>
									
									<div class="row">
										<div class="col-8">
										  <p>`+nodes[tempWPath[0]].name + " to "+ nodes[sIndex].name +`</p>
										</div>
										<div class="col-4">
										  <a href="#" class="float-right">`+showDistance(distance)+`</a>
										</div>
									</div>
								</li>`;
					//tempText += "<li>walk from " + nodes[tempWPath[0]].name + " to "+ nodes[sIndex].name + " - "+showDistance(distance)+" ("+showTime(time)+")</li>"  ;
					
					tempWPath = [];
				}
				tempRPat = routeTemp[sIndex][fIndex]["path"];
				
				distance = roundOffNumber(calculateDistance(tempRPat,null));
				time = roundOffNumber(((routeTemp[sIndex][fIndex]["distance"]/1000)/baseSpeed)*60);
				
				
				
				if(routeTemp[sIndex][fIndex]["name"] == tempRoutePath["name"]){
					tempRoutePath["finish"] = nodes[tempRPat.at(-1)].name;
					tempRoutePath["distance"] += distance;
					tempRoutePath["time"] += time;
				}
				else{
					if(tempRoutePath["name"] != ""){
						//tempText += "<li>("+tempRoutePath["name"] + ") " + tempRoutePath["start"] + " to "+ tempRoutePath["finish"] +" - " + showDistance(tempRoutePath["distance"])+" ("+showTime(tempRoutePath["time"])+")</li>"  ;
						tempText += `<li>
										<a target="_blank" href="#">`+tempRoutePath["name"]+`</a>
										<a href="#" class="float-right">`+showTime(tempRoutePath["time"])+`</a>
										
										<div class="row">
											<div class="col-8">
											  <p>`+tempRoutePath["start"] + " to "+ tempRoutePath["finish"] +`</p>
											</div>
											<div class="col-4">
											  <a href="#" class="float-right">`+showDistance(tempRoutePath["distance"])+`</a>
											</div>
										</div>
									</li>`;
					}
					tempRoutePath["name"] = routeTemp[sIndex][fIndex]["name"];
					tempRoutePath["start"] = nodes[tempRPat[0]].name;
					tempRoutePath["finish"] = nodes[tempRPat.at(-1)].name;
					tempRoutePath["distance"] = distance;
					tempRoutePath["time"] = time;
				}
				
				//tempText += "<li>("+routeTemp[sIndex][fIndex]["name"] + ") " + nodes[tempRPat[0]].name + " to "+ nodes[tempRPat.at(-1)].name +" - " + showDistance(distance)+" ("+showTime(time)+")</li>"  ;
				
				for(var i2=0;i2<tempRPat.length-1;i2++){
					finalizedPath.push(tempRPat[i2]);
				}
			}else{
				
				if(tempRoutePath["name"] != ""){
					//tempText += "<li>("+tempRoutePath["name"] + ") " + tempRoutePath["start"] + " to "+ tempRoutePath["finish"] +" - " + showDistance(tempRoutePath["distance"])+" ("+showTime(tempRoutePath["time"])+")</li>"  ;
					tempText += `<li>
									<a target="_blank" href="#">`+tempRoutePath["name"]+`</a>
									<a href="#" class="float-right">`+showTime(tempRoutePath["time"])+`</a>
									
									<div class="row">
										<div class="col-8">
										  <p>`+tempRoutePath["start"] + " to "+ tempRoutePath["finish"] +`</p>
										</div>
										<div class="col-4">
										  <a href="#" class="float-right">`+showDistance(tempRoutePath["distance"])+`</a>
										</div>
									</div>
								</li>`;
					
					tempRoutePath["name"] = "";
					tempRoutePath["start"] = "";
					tempRoutePath["finish"] = "";
					tempRoutePath["distance"] = "";
					tempRoutePath["time"] = "";
				}
				
				
				tempWPath.push(sIndex);
				finalizedPath.push(sIndex);
				if(i == path.length-1){
					if (tempWPath.length > 1) {
						distance = roundOffNumber(calculateDistance(tempWPath,null));
						time = roundOffNumber(((distance/1000)/baseSpeed)*60);
						//tempText += "<li>walk from " + nodes[tempWPath[0]].name + " to "+ nodes[fIndex].name + " - "+showDistance(distance)+" ("+showTime(time)+")</li>"  ;
						tempText += `<li>
									<a target="_blank" href="#">Walk</a>
									<a href="#" class="float-right">`+showTime(time)+`</a>
									
									<div class="row">
										<div class="col-8">
										  <p>`+nodes[tempWPath[0]].name + " to "+ nodes[fIndex].name +`</p>
										</div>
										<div class="col-4">
										  <a href="#" class="float-right">`+showDistance(distance)+`</a>
										</div>
									</div>
								</li>`;
						tempWPath = [];
						
					}
					else{
						distance = roundOffNumber(calculateDistance([sIndex,fIndex],null));
						time = roundOffNumber(((distance/1000)/baseSpeed)*60);
						//tempText += "<li>walk from " + nodes[sIndex].name + " to "+ nodes[fIndex].name + " - " + showDistance(distance)+" ("+showTime(time)+")</li>"  ;
						tempText += `<li>
									<a target="_blank" href="#">Walk</a>
									<a href="#" class="float-right">`+showTime(time)+`</a>
									
									<div class="row">
										<div class="col-8">
										  <p>`+nodes[sIndex].name + " to "+ nodes[fIndex].name +`</p>
										</div>
										<div class="col-4">
										  <a href="#" class="float-right">`+showDistance(distance)+`</a>
										</div>
									</div>
								</li>`;
					}
				}
				//console.log(sIndex);
				
			}
			if(i == path.length-1 ){
				finalizedPath.push(path.at(-1));
				
				if(tempRoutePath["name"] != ""){
					//tempText += "<li>("+tempRoutePath["name"] + ") " + tempRoutePath["start"] + " to "+ tempRoutePath["finish"] +" - " + showDistance(tempRoutePath["distance"])+" ("+showTime(tempRoutePath["time"])+")</li>"  ;
					tempText += `<li>
									<a target="_blank" href="#">`+tempRoutePath["name"]+`</a>
									<a href="#" class="float-right">`+showTime(tempRoutePath["time"])+`</a>
									
									<div class="row">
										<div class="col-8">
										  <p>`+tempRoutePath["start"] + " to "+ tempRoutePath["finish"] +`</p>
										</div>
										<div class="col-4">
										  <a href="#" class="float-right">`+showDistance(tempRoutePath["distance"])+`</a>
										</div>
									</div>
								</li>`;
					tempRoutePath["name"] = "";
					tempRoutePath["start"] = "";
					tempRoutePath["finish"] = "";
					tempRoutePath["distance"] = "";
					tempRoutePath["time"] = "";
				}
			}
			
			
			
		}
		
		//console.log(JSON.stringify(path));
		
		//console.log(JSON.stringify(finalizedPath));
		finalizedPath.shift();
		
		
		
		showPath(start,finalizedPath);
		//console.log(JSON.stringify(shortestPath));
		//showPath(start,shortestPath.path);
		
		
		$('#pNodes').html(shortestPath.nodes);
		var cDistance = calculateDistance(shortestPath.path,start);
		
		//alert(cDistance + "  :  " + shortestPath.path + "    " + start);
		//$('#pDistance').html((shortestPath.distance>1000? (shortestPath.distance/1000)+" km":shortestPath.distance+" m"));
		$('#pDistance').html( showDistance(cDistance));
		
		//Minutes
		time = roundOffNumber(((shortestPath.distance/1000)/baseSpeed)*60);
		$('#eTime').html( roundOffNumber(time) + " min");
		
		//alert(shortestPath.distance);
		$('#pCTime').html( roundOffNumber(shortestPath.duration ) + " ms");
		
		$('#pRoute').html(tempText);
		//pRoute
		
		$("#navbarSupportedContentBottom").collapse('show')
		
	}
	else{
		fAlert("Fill the neccesarry form first");
	}
	
}

function showDistance(meters){
	return (meters>1000? roundOffNumber(meters/1000)+" km":meters+" m");
}

function showTime(minutes){
	return (minutes>60? roundOffNumber(minutes/60)+" hour":minutes+" min");
}

//function showStartFinish(start,finish){
//  L.circleMarker(nodes[start].coord,{radius:8,color:"#00ff00",fillOpacity:1}).bindPopup(start+'  Start Point').addTo(map);
//  L.circleMarker(nodes[finish].coord,{radius:8,color:"#ff0000",fillOpacity:1}).bindPopup(finish+'  Finish Point').addTo(map);
//}

function showPath(start,path){
	var lineCoords = [];
	lineCoords.push(nodes[start].coord);
	
	for(var i=0;i<path.length;i++){
		var nodeName =path[i];
		lineCoords.push(nodes[nodeName].coord);
	}
	
	/*
	path.forEach(function (item, index) {
		//var nodeName =path[index];
		lineCoords.push(item.coord);
	});
	*/
	polyline = L.polyline(lineCoords, {color: 'red'}).addTo(map);
  
}

function calculateDistance(path,start){
	var calDistance = 0;
	//var textT = "";
	
	if(start){
		
		calDistance += roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[start].coord, nodes[path[0]].coord) * 10));
		//textT += roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[start].coord, nodes[path[0]].coord) * 10) + "  ";
		
		//alert(start + "  :  " +path[0]   + "     " +textT);
	}
	for(var i=1;i<path.length;i++){
		calDistance += roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[path[i-1]].coord, nodes[path[i]].coord) * 10));
		//textT += roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[path[i-1]].coord, nodes[path[i]].coord)) + "  ";
	}
	//alert(calDistance);
	return calDistance;
	
}

function displayConnections(id){
	
	
	if($('#' + id).is(":checked")){
		for(var i=0;i<Object.keys(pointListConnections).length;i++)
			pointListConnections[i].addTo(map);
	}
	else{
		for(var i=0;i<Object.keys(pointListConnections).length;i++)
			map.removeLayer(pointListConnections[i]);
	}
}

function clearMap() {
	if(polyline != null)
		map.removeLayer(polyline);
}

var routelineCoords = [];

function showRoute(id,index){
	if($('#' + id).is(":checked")){
		var lineCoords = [];
		var tempRouthPath = [];
		routes[index].routes.forEach(function (item, i) {
			tempRouthPath = item["paths"];
			for(var i2=0;i2<tempRouthPath.length;i2++){
				var nodeName =tempRouthPath[i2];
				if(typeof lineCoords[i]=="undefined")
					  lineCoords[i]=[];
				lineCoords[i].push(nodes[nodeName].coord);
			}
		});
		
		lineCoords.forEach(function (item, i) {
			if(typeof routelineCoords[index]=="undefined")
					  routelineCoords[index]=[];
			routelineCoords[index][i] = L.polyline(lineCoords[i], {color: 'yellow'}).addTo(map);
		});
		
		/*
		path.forEach(function (item, index) {
			//var nodeName =path[index];
			lineCoords.push(item.coord);
		});
		*/
		
	}
	else{
		routelineCoords[index].forEach(function (item, i) {
			if(item != null)
				map.removeLayer(item);
		});
	}
}


function onLoad(){
	//Routes
	var routeKeys = Object.keys(routes);
	for(var rtype = 0; rtype < routeKeys.length; rtype++){
		
		
		$("#routeOptions").append( 
		`<li>
		<div class="form-check">
			  <input
				class="form-check-input"
				type="checkbox"
				id="check`+ rtype +`"
				onchange="showRoute(this.id,`+ rtype +`)"/>
			  <label class="form-check-label" for="check`+ rtype +`">`
				+ routes[rtype].name +
			  `</label>
			</div>
			</li>`  );
			
		//console.log(routes[rtype].name );
		//console.log(routes[rtype].speed );
		transpoSpeed = (baseSpeed / routes[rtype].speed);
		var distance = 0;
		//Minutes
		//var time = roundOffNumber(((distance/1000)/routes[rtype].speed)*60);
	  
		//New Computed Edge with distance
		var newDistance = 0;
		var compareDistance = 0;
		//for(var r = 0; r < Object.keys(routes[rtype].routes).length; r++);
		/*
		routes[rtype].routes.forEach(function (item, i) {
			//console.log(item.name);
			//tempSID = item["stops"][r1];
			
			
			  
		});
		*/
	}
}

function roundOffNumber(num){
	return Math.round((num + Number.EPSILON) * 100) / 100;
}

//Implements Algorithms
function solve(graph,s,f) {
	const startTime = performance.now();
	if($('#algo').val() == 1){
		
	
		var solutions = {};
		solutions[s] = [];
		solutions[s].dist = 0;
		var countNodes = 0;
		while(true) {
			var parent = null;
			var nearest = null;
			var dist = Infinity;
			for(var n in solutions) {
				if(!solutions[n])
					continue
				var ndist = solutions[n].dist;
				var adj = graph[n];
				for(var a in adj) {
					
					if(solutions[a])
						continue;
					var d = adj[a] + ndist;
					if(d < dist) {
						countNodes++;
						parent = solutions[n];
						nearest = a;
						dist = d;
					}
				}
			}
			if(dist === Infinity) {
				break;
			}
			solutions[nearest] = parent.concat(nearest);
			solutions[nearest].dist = dist;
		}
		var finish = solutions[f];
		//alert(JSON.stringify(solutions));
		const duration = performance.now() - startTime;
		return {results:solutions,path:finish,distance:finish.dist,nodes:countNodes,duration:duration};
	}
	else if($('#algo').val() == 2){
		//console.log(JSON.stringify(graph));
		var mainKeys = Object.keys(graph);
		//console.log(JSON.stringify(mainKeys ));
		//This contains the distances from the s node to all other nodes
		var distances = [];
		//Initializing with a distance of "Infinity"
		/*
		for (var i = 0; i < mainKeys.length; i++) {
			distances[mainKeys[i]] = Number.MAX_VALUE; 
			//console.log("graph " + Object.keys(graph).length);
		}
		*/
		mainKeys.forEach(function (item, i) {
			distances[item] = Number.MAX_VALUE; 
		});
		//The distance from the s node to itself is of course 0
		distances[s] = 0;
		
		//console.log(JSON.stringify(distances));

		//This contains the priorities with which to visit the nodes, calculated using the heuristic.
		var priorities = [];
		//Initializing with a priority of "Infinity"
		//for (var i = 0; i < mainKeys.length; i++) priorities[mainKeys[i]] = Number.MAX_VALUE;
		
		mainKeys.forEach(function (item, i) {
			priorities[item] = Number.MAX_VALUE;
		});
		//s node has a priority equal to straight line distance to f. It will be the first to be expanded.
		priorities[s] = roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[s].coord, nodes[f].coord) *10) );

		//This contains whether a node was already visited
		var visited = [];
		var path = [];
		//While there are nodes left to visit...
		while (true) {
			
			// ... find the node with the currently lowest priority...
			
			var lowestPriority = Number.MAX_VALUE;
			var lowestPriorityIndex = -1;
			priorities.forEach(function (item, i) {
				//... by going through all nodes that haven't been visited yet
				if (item < lowestPriority && !visited[i]) {
					lowestPriority = item;
					lowestPriorityIndex = i;
				}
			});
			/*
			for (var i = 0; i < priorities.length; i++) {
				//... by going through all nodes that haven't been visited yet
				if (priorities[i] < lowestPriority && !visited[i]) {
					lowestPriority = priorities[i];
					lowestPriorityIndex = i;
				}
			}
			*/

			if (lowestPriorityIndex === -1) {
				// There was no node not yet visited --> Node not found
				return -1;
			} else if (lowestPriorityIndex === f) {
				// f node found
				// console.log("f node found!");
				return distances[lowestPriorityIndex];
			}
			path.push(lowestPriorityIndex);
			
			//console.log(path.at(-1) + " : " + path.at(-2) + " yeah: "+ graph[path.at(-1)][path.at(-2)]);
			//console.log("Visiting node " + lowestPriorityIndex + " with currently lowest priority of " + lowestPriority);
			//console.log(priorities);
			
			//...then, for all neighboring nodes that haven't been visited yet....
			//var adj = graph[lowestPriorityIndex];
			//for(var a in adj) {
				//console.log(a+ "n: " + JSON.stringify(a));
					
			//}
			var graphKeys = Object.keys(graph[lowestPriorityIndex]);
			for (var i = 0; i < graphKeys.length; i++) {
				if (graph[lowestPriorityIndex][graphKeys[i]] !== 0 && !visited[graphKeys[i]]) {
					//console.log("n: " + JSON.stringify(graph[lowestPriorityIndex][i]));
					//...if the path over this edge is shorter...
					if (distances[lowestPriorityIndex] + graph[lowestPriorityIndex][graphKeys[i]] < distances[graphKeys[i]]) {
						//...save this path as new shortest path
						distances[graphKeys[i]] = Number(distances[lowestPriorityIndex]) + Number(graph[lowestPriorityIndex][graphKeys[i]]);
						//...and set the priority with which we should continue with this node
						priorities[graphKeys[i]] = Number(distances[graphKeys[i]]) + roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[graphKeys[i]].coord, nodes[f].coord) *10));
						 //console.log("Updating distance of node " + i + " to " + distances[i] + " and priority to " + priorities[i]);
						
						//console.log("Priorities: "+ (Number(distances[graphKeys[i]]) + roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[graphKeys[i]].coord, nodes[f].coord) *10))) );
						//console.log("lowestPriorityIndex: "+lowestPriorityIndex+" Node: " + graphKeys[i] );
						//console.log("index: "+i+" graphKeys.length: " + (graphKeys.length) );
						//console.log(" " );
						
						//if(i == graphKeys.length-1)
							//path.pop();
						
					}
				}
			}

			// Lastly, note that we are finished with this node.
			visited[lowestPriorityIndex] = true;
			if(lowestPriorityIndex == f){
				const duration = performance.now() - startTime;
				//while(path.length > 1 && !graph[path.at(-1)][path.at(-2)])
				//path.splice(path.length - 2, 1);
				var toRemove = [];
				var lastValid = path.length-1;


				for(var i = path.length-1; i > 0; i--){
					//console.log("PathCheck " + nodes[path[lastValid]].name + " " + path[lastValid] + " : " + path[i-1] + " " + nodes[path[i-1]].name);
					if(!graph[path[lastValid]][path[i-1]]){
						toRemove.push(i-1);
						//console.log("remove");
					}
					else {
						if(i>=2 && graph[path[lastValid]][path[i-2]]){
							toRemove.push(i-1);
						}
						else{
							lastValid = i-1;
						}
						
						//console.log("retain");
					}
				}
				
				//alert(toRemove);
				//console.log("Path" + JSON.stringify(path));
				//console.log("Remove" + JSON.stringify(toRemove));
				
				toRemove.forEach(function (item, i) {
					path.splice(item, 1);
					//console.log(path);
				});
				
				path.shift();
				
				return {path:path,distance:distances[f],nodes:visited.filter(Boolean).length,duration:duration};
				
				//console.log("Path" + JSON.stringify(path));
				//console.log("Visited nodes: " + visited.filter(Boolean).length);
				//console.log("Currently distances: " + distances[f]);
				//console.log("Priorities: " + JSON.stringify(priorities));
				//return -1;
			}

		}
		//alert("Visited nodes: " + visited);
		//alert("Currently lowest distances: " + distances);
	}
}


function readyGraph(paths) {
    var graph = {};
	
	//Connection of Nodes
    for(var i in paths){
        var path = paths[i];
        var start=path["s"];
        var finish=path["f"];
        //var distance=path["distance"];
		var dirDistance =  roundOffNumber(calDist(L.GeometryUtil.distance(map, nodes[start].coord, nodes[finish].coord)*10))  ;
        if(typeof graph[start]=="undefined")
            graph[start]={};
        
		
        graph[start][finish]=dirDistance;
        
        if(typeof graph[finish]=="undefined")
            graph[finish]={};
        
		graph[finish][start]=dirDistance;
        
    }
	
	//Routes
	
	for(var rtype = 0; rtype < Object.keys(routes).length; rtype++){
	  //console.log(routes[rtype].name );
	  //console.log(routes[rtype].speed );
	  transpoSpeed = (baseSpeed / routes[rtype].speed);
	  var distance = 0;
	  //Minutes
	  //var time = roundOffNumber(((distance/1000)/routes[rtype].speed)*60);
	  
	  //New Computed Edge with distance
	  var newDistance = 0;
	  var compareDistance = 0;
	  //for(var r = 0; r < Object.keys(routes[rtype].routes).length; r++);
	  routes[rtype].routes.forEach(function (item, i) {
		//console.log(item.name);
		
		for(var r1 = 0; r1 < item["stops"].length; r1++)
		  for(var r2 = r1; r2 < item["stops"].length; r2++)
			if(r1 !== r2){
			  tempSID = item["stops"][r1];
			  tempFID = item["stops"][r2];
			  tempS = item["paths"].indexOf(tempSID);
			  tempF = item["paths"].indexOf(tempFID);
			  
			  //console.log(tempS + " ---- "+tempF );
			  
			  tempPath = item["paths"].slice(tempS, tempF+1);
			  if(tempPath.length == 0)
				tempPath = item["paths"].slice(tempF, tempS+1);
			  
			  distance = calculateDistance(tempPath,null);
			  newDistance = roundOffNumber(distance*transpoSpeed);
			  compareDistance = Number.MAX_VALUE;
			  
				try {
					compareDistance = routeTemp[tempFID][tempSID]["distance"];
				}
					catch(err) {
					compareDistance = Number.MAX_VALUE;
				}
			  
			  
			  if(newDistance < compareDistance){
			  
				if(typeof routeTemp[tempSID]=="undefined")
					  routeTemp[tempSID]={};
				if(typeof routeTemp[tempFID]=="undefined")
					  routeTemp[tempFID]={};
				if(typeof routeTemp[tempSID][tempFID]=="undefined")
					  routeTemp[tempSID][tempFID]={};
					
				if(typeof routeTemp[tempFID][tempSID]=="undefined")
					  routeTemp[tempFID][tempSID]={};
					
				routeTemp[tempSID][tempFID]["path"]=tempPath;
				routeTemp[tempSID][tempFID]["name"]= routes[rtype].name + " - " + item.name;
				routeTemp[tempSID][tempFID]["distance"]= newDistance;
				
				
				//Reverse Path
				routeTemp[tempFID][tempSID]["path"]=tempPath.slice().reverse();
				routeTemp[tempFID][tempSID]["name"]= routes[rtype].name + " - " + item.name;
				routeTemp[tempFID][tempSID]["distance"]= newDistance;
				
				//Add to Graph
				graph[tempSID][tempFID]=newDistance;
				graph[tempFID][tempSID]=newDistance;
			  }
			  /*
			  //routeTemp[tempSID][tempFID] = tempPath;
			  //routeTemp[tempFID][tempSID] = tempPath.reverse();
			  while(true)
				try {
				  //if(!routeTemp[tempSID][tempFID]){
					//routeTemp[tempSID][tempFID] = tempPath;
					//routeTemp[tempFID][tempSID] = tempPath.slice().reverse();
					
					
					
					
					
				  //}
				  break;
				}
				catch(err) {
				  
					
				
					console.log("error " + err);
				}
			  
			  //routeTemp[tempSID][tempFID] = ["path":tempPath,"distance":0];
			  //routeTemp[tempFID][tempSID] = ["path":tempPath.reverse(),"distance":0];
			  */
			  
			}
			  
	  });
	}
	
	//alert(JSON.stringify(graph));
    return graph;
}

function calDist(distance){
	return (14<=map.getZoom() ? distance/calDis[map.getZoom()-1] :  distance*calDis[map.getZoom()-1]  )
}

function sAlert(message,loca){
	swal({
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: false,
        timer: 3000
    }).then(function() {
		if(loca == "reload-page")
			history.go(0);
		else if(!isBlank(loca))
            window.location.href=loca;
	});
}
					
function fAlert(message){
	swal({
		icon: 'error',
		title: 'Oops...',
		text: message,
		showConfirmButton: false,
		timer: 3000
	});
}





