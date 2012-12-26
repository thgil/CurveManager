//#pragma strict

@CustomEditor (Point)
class PointEditor extends Editor {

	function OnInspectorGUI () {
		EditorGUILayout.BeginHorizontal();
			if(GUILayout.Button ("Add Point")) {
				var go : GameObject = new GameObject ("Point");
				go.transform.parent = target.transform.parent.transform;
				go.transform.localPosition = Vector3.zero;
				go.AddComponent ("Point");

				Selection.activeTransform = go.transform;

				target.myParent.points.Add(go);
				target.dirty = true;
			}
		EditorGUILayout.EndHorizontal();
	}
}