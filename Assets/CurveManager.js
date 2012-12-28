//#pragma strict
import System.Collections.Generic;

@script AddComponentMenu ("Paths/CurveManger")


enum OPTIONS {
    	Line = 0,
    	BezierCurve = 1
  	}

var op : OPTIONS;
//var points : Array = new Array(); // Contains waypoints (GameObjects)
var points = new List.<GameObject>();
//var pointsData : Array = new Array(); // Contains points on curves (Vector3)
var pointsData = new List.<Vector3>();
//var attachedGameObjects : Array = new Array(); // Contains gameobjects that will follow the path.
var dirty : boolean = true; // Do we need to recalculate everything?
var dt : float = 0.1; // Size of step

// A easy way to see if we have moved
var oldTransform;
oldTransform = transform.position;

function Start () {
	//Debug.Log("points at start:"+ points.length);
	//Debug.Log("pointsData at start:"+ pointsData.length);
	for(var point in pointsData) Debug.Log(point);
	Debug.Log("ANYTHING: "+pointsData);
}

function Update () {
}

function OnDrawGizmos () {

	//cleanUp();
var tmppointsData;
	if(dirty) {
		switch(op) {
	      case OPTIONS.Line:
	      	//Debug.Log("Calculating Line with "+points.length+" points.");
	      	//pointsData = new Array(Line(points,dt));
	      	pointsData.Clear();
	      	Line(points,dt,pointsData);
	      	dirty = false;
	        break;
	      case OPTIONS.BezierCurve:
	      	//Debug.Log("Calculating BezierCurve with "+points.length+" points.");
	        //pointsData = new Array(BezierCurve(points,dt));
	        //tmppointsData = new List.<Vector3>(BezierCurve( points,dt));
	        pointsData.Clear();
	        BezierCurve(points,dt,pointsData);
	        //for(var point in tmppointsData) {pointsData.Add(point);Debug.Log("point: "+point);}
	    	dirty = false;
	        break;
	    }
	}

	if(oldTransform!=transform.position) {
		oldTransform=transform.position;
		dirty=true;
	}

    for (i=0; i< pointsData.Count-1; i++) {
      Gizmos.color = Color.white;
      Gizmos.DrawLine (pointsData[i], pointsData[i+1]);
    }

    for (i=0; i< points.Count; i++) {
      Gizmos.color = Color.green;
      if(i!=points.Count-1)Gizmos.DrawLine (points[i].transform.position, points[i+1].transform.position);
      Handles.Label (points[i].transform.position + Vector3.up*2,"Waypoint "+i);
    }
}


// Checks that all gameobject still exist.
// Stops deletion of gameobjects manually in unity causing errors.
// Forcefully removes any gameobject that may be left over
function cleanUp () {
	var i;
	var ilength;
	ilength = points.length;
	for (i = 0; i < ilength; i++) {
		if(points[i]==null) {
			points.RemoveAt(i);
			dirty = true;
		}
	}

	if(ilength==0) {
		var children = new Array();
		var child: Transform;
		for (child in transform) children.Add(child.gameObject);
		for (i = 0; i < children.length; i++) 
			if(children[i].name == "Point") DestroyImmediate(children[i]);
	}
}

// Gets points for Line.
function Line (points, dt:float, data) {
	for (var i =0; i< points.Count-1; i++) {
		for(var t=0.0; t<=1.0; t+=dt) data.Add( points[i].transform.position + t *(points[i+1].transform.position-points[i].transform.position) );
	}
}

// Gets points stepping dt each time.
function BezierCurve(points, dt:float, data) {
	for( var t =0.0; t<=1.0; t+=dt) data.Add( BezierPointOnCurve(points,t) );
}

// Gets point at time t.
function BezierPointOnCurve(points, t:float) : Vector3 {
	if(points.Count<1) {Debug.LogWarning("Bezier needs more points!"); return Vector3.zero;}
	else if(points.Count==1) return points[0].transform.position;
	else {
		//Make this nicer.
		var tmp1 = new List.<GameObject>();
		var tmp2 = new List.<GameObject>();
		for (var i = 0; i < points.Count; i++) {
			tmp1.Add(points[i]);
			tmp2.Add(points[i]);
		}
		//var tmp2 = new Array(points);
		tmp1.RemoveAt(tmp1.Count-1);
		tmp2.RemoveAt(0);
		return (1-t)*BezierPointOnCurve(tmp1,t) + t*BezierPointOnCurve(tmp2,t);
	}
}