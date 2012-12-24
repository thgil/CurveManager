//#pragma strict
@CustomEditor (CurveManager)
class CurveManagerEditor extends Editor {

	enum OPTIONS {
    	Line = 0,
    	BezierCurve = 1
  	}

	static var op : OPTIONS; 
	//var pointsData = new Array(); //Contains points on curves
	var fastData :Vector3[]; //Builtin array
	var dirty = true; //Do we need to recalculate the curve?
	var selected = 0; //Selected point. -1 for all
	var dt = 0.1; // Size of step

	function OnInspectorGUI () {

		EditorGUILayout.BeginHorizontal();
			if(GUILayout.Button ("Add Point")) {
		      var point = Vector3.zero;
		      target.points.Add(point);
		      dirty = true;
		    }

			op = EditorGUILayout.EnumPopup("Select type of curve:", op);
		EditorGUILayout.EndHorizontal();
		EditorGUILayout.BeginHorizontal();
				    //Select All button
	      	if(GUILayout.Button ("Select All")) selected = -1;
	    EditorGUILayout.EndHorizontal();

		EditorGUILayout.BeginVertical();
			for (var i=0; i<target.points.length; i++) {
				EditorGUILayout.BeginHorizontal();
					//Vector3 edit fields 
		      		target.points[i] = EditorGUILayout.Vector3Field("Waypoint "+i+":", target.points[i]);

		      		//Select button
		      		if(GUILayout.Button ("Select")) selected = i;

		      		//Remove point button
					if(GUILayout.Button ("-")) target.points.splice(i,1);
	      		EditorGUILayout.EndHorizontal();
	      		if (GUI.changed)  {
					dirty=true;
					EditorUtility.SetDirty (target);
				}
			}
		EditorGUILayout.EndVertical();


		if(dirty) {
			switch(op) {
		      case OPTIONS.Line:
		      	Debug.Log("Calculating Line with "+target.points.length+" points.");
		      	target.pointsData = new Array(Line(target.points,dt));
		      	dirty = false;
		        break;
		      case OPTIONS.BezierCurve:
		      	Debug.Log("Calculating BezierCurve with "+target.points.length+" points.");
		        target.pointsData = new Array(BezierCurve(target.points,dt));
		        dirty = false;
		        break;
		    }
		}

		if (GUI.changed)  {
			dirty=true;
			EditorUtility.SetDirty (target);
		}
	}

	function OnSceneGUI () {
		//Curve Line Render
		//if(dirty)fastData = target.pointsData.ToBuiltin(Vector3);
		//Handles.DrawAAPolyLine(fastData);
		var i;
		var e : Event = Event.current;
		Debug.Log("mp:"+e.mousePosition);
        var ray : Ray = Camera.current.ViewportPointToRay (e.mousePosition);
        Debug.DrawRay(ray.origin, ray.direction*10, Color.green);
		//Handles
		for (i=0; i< target.points.length; i++) {
      		Handles.Label(target.points[i] + Vector3.up*2,"Waypoint "+i);
      		if(selected==i||selected ==-1)target.points[i] = Handles.PositionHandle (target.points[i], Quaternion.identity);
    	}

    	for (i=0; i< target.pointsData.length; i++) {
      		Handles.color = Color.red;
       		Handles.CubeCap(0,
            	target.pointsData[i],
            	Quaternion.identity,
            	0.5);
    	}


		if (GUI.changed)  {
			dirty=true;
			EditorUtility.SetDirty (target);
		}
	}

	function Line (points, dt:float) : Array{
		var data = new Array();
		for (var i =0; i< target.points.length-1; i++) {
			for(var t=0.0; t<1.1; t+=dt) data.Add( points[i] + t *(points[i+1]-points[i]) );
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
    else if(points.length==1) return points[0];
    else {
    //Make this nicer.
      var tmp1 = new Array(points);
      var tmp2 = new Array(points);
      tmp1.RemoveAt(points.length-1);
      tmp2.RemoveAt(0);

      return (1-t)*BezierPointOnCurve(tmp1,t) + t*BezierPointOnCurve(tmp2,t);
    }
  }
}