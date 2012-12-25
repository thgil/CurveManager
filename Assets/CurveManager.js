//#pragma strict

@script AddComponentMenu ("Paths/CurveManger")


enum OPTIONS {
    	Line = 0,
    	BezierCurve = 1
  	}

static var op : OPTIONS;
var points = new Array(); // Contains waypoints
var pointsData = new Array(); //Contains points on curves
var dirty = true;
var dt = 0.1; // Size of step
var oldTransform;
oldTransform = transform.position;

function Start () {

}

function Update () {
}

function OnDrawGizmos () {

	cleanUp();

	if(dirty) {
		switch(op) {
	      case OPTIONS.Line:
	      	Debug.Log("Calculating Line with "+points.length+" points.");
	      	pointsData = new Array(Line(points,dt));
	      	dirty = false;
	        break;
	      case OPTIONS.BezierCurve:
	      	Debug.Log("Calculating BezierCurve with "+points.length+" points.");
	        pointsData = new Array(BezierCurve(points,dt));
	    	dirty = false;
	        break;
	    }
	}

	if(oldTransform!=transform.position) {
		oldTransform=transform.position;
		dirty=true;
	}

    for (i=0; i< pointsData.length-1; i++) {
      Gizmos.color = Color.white;
      Gizmos.DrawLine (pointsData[i], pointsData[i+1]);
    }

    for (i=0; i< points.length-1; i++) {
      Gizmos.color = Color.green;
      Gizmos.DrawLine (points[i].transform.position, points[i+1].transform.position);
    }
}


// Checks that all gameobject still exist
function cleanUp () {
	var i;
	var ilength;
	ilength = points.length;
	for (i = 0; i < ilength; i++) {
		Debug.Log("CLEANUP AT "+(i+1)+" OF "+ilength+" : "+ (points[i]==null));
		if(points[i]==null) {
			points.RemoveAt(i);
			dirty = true;
		}
	}
}

function Line (points, dt:float) : Array {
	var data = new Array();
	for (var i =0; i< points.length-1; i++) {
		for(var t=0.0; t<1.1; t+=dt) data.Add( points[i].transform.position + t *(points[i+1].transform.position-points[i].transform.position) );
	}
	return data;
}

function BezierCurve(points, dt:float) : Array {
	var data = new Array();
	for( var t =0.0; t<1.1; t+=dt) data.Add( BezierPointOnCurve(points,t) );
	return data;
}

function BezierPointOnCurve(points, t:float) : Vector3 {
	if(points.length<1) {Debug.Log("Bezier needs more points!"); return Vector3.zero;}
	else if(points.length==1) return points[0].transform.position;
	else {
		//Make this nicer.
		var tmp1 = new Array(points);
		var tmp2 = new Array(points);
		tmp1.RemoveAt(points.length-1);
		tmp2.RemoveAt(0);
		return (1-t)*BezierPointOnCurve(tmp1,t) + t*BezierPointOnCurve(tmp2,t);
	}
}