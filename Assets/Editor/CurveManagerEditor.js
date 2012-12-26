//#pragma strict
@CustomEditor (CurveManager)
class CurveManagerEditor extends Editor {
 
	function OnInspectorGUI () {
		EditorGUILayout.BeginHorizontal();
			if(GUILayout.Button ("Add Point")) {
				var go : GameObject = new GameObject ("Point");
				go.transform.parent = target.transform;
				go.transform.localPosition = Vector3.zero;
				go.AddComponent ("Point");

				Selection.activeTransform = go.transform;

				target.points.Add(go);
				target.dirty = true;
			}

			target.op = EditorGUILayout.EnumPopup("Select type of curve:", target.op);
		EditorGUILayout.EndHorizontal();

		EditorGUILayout.BeginVertical();
			for (var i=0; i<target.points.length; i++) {
				EditorGUILayout.BeginHorizontal();
					//Vector3 edit fields 
		      		target.points[i].transform.position = EditorGUILayout.Vector3Field("Waypoint "+i+":", target.points[i].transform.position);

		      		//Select button
		      		if(GUILayout.Button ("Select")) Selection.activeTransform = target.points[i].transform;


		      		//Remove point button
					if(GUILayout.Button ("-")) {
						DestroyImmediate(target.points[i]);
						target.points.RemoveAt(i);
					}
	      		EditorGUILayout.EndHorizontal();
	      		if (GUI.changed)  {
					target.dirty=true;
					EditorUtility.SetDirty (target);
				}
			}
		EditorGUILayout.EndVertical();

		if (GUI.changed)  {
			target.dirty=true;
			EditorUtility.SetDirty (target);
		}

		/*if(target.dirty) {
			switch(op) {
		      case OPTIONS.Line:
		      	Debug.Log("Calculating Line with "+target.points.length+" points.");
		      	target.pointsData = new Array(Line(target.points,dt));
		      	target.dirty = false;
		        break;
		      case OPTIONS.BezierCurve:
		      	Debug.Log("Calculating BezierCurve with "+target.points.length+" points.");
		        target.pointsData = new Array(BezierCurve(target.points,dt));
		    	target.dirty = false;
		        break;
		    }
		}*/
	}

	function OnSceneGUI () {
	
    	for (i=0; i< target.pointsData.length; i++) {
      		Handles.color = Color.red;
       		Handles.CubeCap(0, target.pointsData[i], Quaternion.identity, 0.1);
    	}


		if (GUI.changed)  {
			target.dirty=true;
			EditorUtility.SetDirty (target);
		}
	}


}