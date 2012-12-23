#pragma strict

enum OPTIONS {
    Line = 0,
    BezierCurve = 1
  }

@CustomEditor (CurveManager)
class CurveManagerEditor extends Editor {

	var op : OPTIONS; 
	var pointsData = new Array(); //Contains points on curves

	var dirty = true; //Do we need to recalculate the curve?

	function OnInspectorGUI () {

		op = EditorGUILayout.EnumPopup("Select type of curve:", op);

		if(dirty) {
			switch(op) {
		      case OPTIONS.Line:
		      	dirty = false;
		        break;
		      case OPTIONS.BezierCurve:
		      	var dt = 0.1; // Size of step
		        if(dirty)pointsData = BezierCurve(target.points,dt);
		        dirty = false;
		        break;
		    }
		}
	}

	function OnSceneGUI () {

	}

	function BezierCurve(points, dt:float) : Vector3[] {
		var data : Vector3[];
		for( var t =0.0; t<1.0; t+=dt) data.Add( BezierPointOnCurve(points,t) );
		return data;
	}

	function BezierPointOnCurve(points, t:float) : Vector3 {
    if(points.length<1) {Debug.Log("Bezier needs more points!"); return Vector3.zero;}
    else if(points.length==1) return points[0];
    else {
    //Make this nicer.
      var tmp1 = new Array(points);
      var tmp2 = new Array(points);
      tmp1.RemoveAt(points.length-1);
      tmp2.RemoveAt(0);

      return (1-t)*BezierCurve(tmp1,t) + t*BezierCurve(tmp2,t);
    }
  }
}