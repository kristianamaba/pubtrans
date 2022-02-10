var centerLng = 14.5640756;
var centerLat = 121.0535951;

var map = L.map('map').setView([centerLng,centerLat], 15);
var buffer = 0.04;
var collection = [];
var geojsonlist = [];

var graph = readyGraph(basicGraph);
var start;
var finish;
var polyline;
var shortestPath;
var toEditIndex = null;

for(var i=0;i<Object.keys(basicGraph).length;i++){
    //alert(JSON.stringify());
	var pointA = new L.LatLng(nodes[basicGraph[i]["s"]].coord[0],nodes[basicGraph[i]["s"]].coord[1]);
	var pointB = new L.LatLng(nodes[basicGraph[i]["f"]].coord[0],nodes[basicGraph[i]["f"]].coord[1]);
	var pointList = [pointA, pointB];
	var firstpolyline = new L.Polyline(pointList, {
		color: 'red',
		weight: 3,
		opacity: 0.5,
		smoothFactor: 1
	});
	firstpolyline.addTo(map);
}
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
			
			L.circleMarker(e.latlng,{title: Object.keys(nodes)[Object.keys(nodes).length-1],radius:5,color:"#0000ff",fillOpacity:1}).bindPopup(pname).addTo(map).on("click", circleClick);
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
			if(!graph[newDirection[0]][newDirection[1]]){
				basicGraph.push({s: newDirection[0],f: newDirection[1]});
				graph = readyGraph(basicGraph);
				
				var pointA = new L.LatLng(nodes[newDirection[0]].coord[0],nodes[newDirection[0]].coord[1]);
				var pointB = new L.LatLng(nodes[newDirection[1]].coord[0],nodes[newDirection[1]].coord[1]);
				var pointList = [pointA, pointB];
				var firstpolyline = new L.Polyline(pointList, {
					color: 'red',
					weight: 3,
					opacity: 0.5,
					smoothFactor: 1
				});
				firstpolyline.addTo(map);
	
			}
		}
		newDirection = [];
	}
}

//ADD NODES AND DIRECTIONS END

function showNodes(nodes){
  for(var a in nodes){
	
    L.circleMarker(nodes[a].coord,{title: a,radius:5,color:"#0000ff",fillOpacity:1}).bindPopup(nodes[a].name).addTo(map).on("click", circleClick);
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



function changeDestination(){
	if( $('#sPoint').val() &&  $('#dPoint').val() && $('#algo').val()){
		start = $('#sPoint').val();
		finish = $('#dPoint').val();
		clearMap();
		
		shortestPath = solve(graph,start,finish);
		showPath(start,shortestPath.path);
		console.log(JSON.stringify(shortestPath.path));
		
		$('#pNodes').html(shortestPath.nodes);
		$('#pDistance').html((shortestPath.distance>1000? (shortestPath.distance/1000)+" km":shortestPath.distance+" m"));
		//alert(shortestPath.duration);
		$('#pCTime').html(( Math.round((shortestPath.duration + Number.EPSILON) * 100) / 100) + " ms");
		
	}
	else{
		fAlert("Fill the neccesarry form first");
	}
	
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
  polyline = L.polyline(lineCoords, {color: 'blue'}).addTo(map);
  
}

function clearMap() {
	if(polyline != null)
		map.removeLayer(polyline);
}

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
	
		
		//This contains the distances from the s node to all other nodes
		var distances = [];
		//Initializing with a distance of "Infinity"
		for (var i = 0; i < Object.keys(graph).length; i++) {
			distances[i] = Number.MAX_VALUE; 
			//console.log("graph " + Object.keys(graph).length);
		}
		//The distance from the s node to itself is of course 0
		distances[s] = 0;
		

		//This contains the priorities with which to visit the nodes, calculated using the heuristic.
		var priorities = [];
		//Initializing with a priority of "Infinity"
		for (var i = 0; i < Object.keys(graph).length; i++) priorities[i] = Number.MAX_VALUE;
		//s node has a priority equal to straight line distance to f. It will be the first to be expanded.
		priorities[s] = Math.round(L.GeometryUtil.distance(map, nodes[s].coord, nodes[f].coord));

		//This contains whether a node was already visited
		var visited = [];
		var path = [];
		//While there are nodes left to visit...
		while (true) {
			
			// ... find the node with the currently lowest priority...
			
			var lowestPriority = Number.MAX_VALUE;
			var lowestPriorityIndex = -1;
			for (var i = 0; i < priorities.length; i++) {
				//... by going through all nodes that haven't been visited yet
				if (priorities[i] < lowestPriority && !visited[i]) {
					lowestPriority = priorities[i];
					lowestPriorityIndex = i;
				}
			}

			if (lowestPriorityIndex === -1) {
				// There was no node not yet visited --> Node not found
				return -1;
			} else if (lowestPriorityIndex === f) {
				// f node found
				// console.log("f node found!");
				return distances[lowestPriorityIndex];
			}
			path.push(lowestPriorityIndex);
			while(path.length > 1 && !graph[path.at(-1)][path.at(-2)])
				path.splice(path.length - 2, 1);
				//console.log(path.at(-1) + " : " + path.at(-2) + " yeah: "+ graph[path.at(-1)][path.at(-2)]);
			 //console.log("Visiting node " + lowestPriorityIndex + " with currently lowest priority of " + lowestPriority);
			
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
						distances[graphKeys[i]] = distances[lowestPriorityIndex] + graph[lowestPriorityIndex][graphKeys[i]];
						//...and set the priority with which we should continue with this node
						priorities[graphKeys[i]] = distances[graphKeys[i]] + Math.round(L.GeometryUtil.distance(map, nodes[graphKeys[i]].coord, nodes[f].coord));
						 //console.log("Updating distance of node " + i + " to " + distances[i] + " and priority to " + priorities[i]);
						//console.log("lowestPriorityIndex: "+lowestPriorityIndex+" Node: " + graphKeys[i] );
						//console.log("i: "+i+" graphKeys.length-1: " + (graphKeys.length) );
						//console.log(" " );
						
						//if(i == graphKeys.length-1)
							//path.pop();
						
					}
				}
			}

			// Lastly, note that we are finished with this node.
			visited[lowestPriorityIndex] = true;
			if(lowestPriorityIndex == f){
				path.shift();
				const duration = performance.now() - startTime;
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
    for(var i in paths){
        var path = paths[i];
        var start=path["s"];
        var finish=path["f"];
        //var distance=path["distance"];
		var distance=  Math.round(L.GeometryUtil.distance(map, nodes[start].coord, nodes[finish].coord)) ;
        if(typeof graph[start]=="undefined"){
            graph[start]={};
            graph[start][finish]=distance;
        }else{
            graph[start][finish]=distance;
        }
        if(typeof graph[finish]=="undefined"){
            graph[finish]={};
            graph[finish][start]=distance;
        }else{
            graph[finish][start]=distance;
        }
    }
	//alert(JSON.stringify(graph));
    return graph;
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





