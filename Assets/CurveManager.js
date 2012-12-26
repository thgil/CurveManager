//#pragma strict

@script AddComponentMenu ("Paths/CurveManger")


enum OPTIONS {
    	Line = 0,
    	BezierCurve = 1
  	}

static var op : OPTIONS;
var points = new Array(); // Contains waypoints
var pointsData = new Array(); //Contains points on curves
var dirty : boolean = true;
var dt = 0.3; // Size of step
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

    for (i=0; i< points.length; i++) {
      Gizmos.color = Color.green;
      if(i!=points.length-1)Gizmos.DrawLine (points[i].transform.position, points[i+1].transform.position);
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
		//var children = new List();
		var child: Transform;
		for (child in transform)
			if(child.gameObject.name == "Point")
		 		DestroyImmediate(child.gameobject);
		//for (child in children) Destroy(child);
		//children.ForEach(child => Destroy(child));
	}
}

// Gets points for Line.
function Line (points, dt:float) : Array {
	var data = new Array();
	for (var i =0; i< points.length-1; i++) {
		for(var t=0.0; t<=1.0; t+=dt) data.Add( points[i].transform.position + t *(points[i+1].transform.position-points[i].transform.position) );
	}
	return data;
}

// Gets points stepping dt each time.
function BezierCurve(points, dt:float) : Array {
	var data = new Array();
	for( var t =0.0; t<=1.0; t+=dt) data.Add( BezierPointOnCurve(points,t) );
	return data;
}

// Gets point at time t.
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