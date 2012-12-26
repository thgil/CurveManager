//#pragma strict
@CustomEditor (CurveManager)
class CurveManagerEditor extends Editor {
 
 	var showPoints : boolean = true;
 	var showAttached : boolean = true;

	function OnInspectorGUI () {

		//Slider for dt
		target.dt = EditorGUILayout.Slider(target.dt,0.01, 1.0);

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

		showPoints = EditorGUILayout.Foldout(showPoints, "Show Points");
        if(showPoints) {
			ShowPoints();
		}

		if(showAttached) {
			ShowAttached();
		}
		if (GUI.changed)  {
			target.dirty=true;
			EditorUtility.SetDirty (target);
		}
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

	function ShowPoints () {
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
	}

	function ShowAttached () {
		// Add game objects you want to move on this line here

	}

}