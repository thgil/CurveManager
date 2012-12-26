#pragma strict

//@script AddComponentMenu ("Paths/Point")

// A easy way to see if we have moved
var oldTransform;
oldTransform = transform.position;
var myParent : CurveManager;
//myParent = transform.parent.GetComponent(CurveManager);

function Start () {
}

function Update () {

}

function OnDrawGizmos () {

	// Add button to each point so you can add extra points from the scene instead
	// instead of going back and forth from scene to editor

	if(oldTransform!=transform.position) {
		oldTransform=transform.position;
		myParent = transform.parent.GetComponent(CurveManager);
		myParent.dirty=true;
	}

    Gizmos.color = Color.blue;
    Gizmos.DrawWireSphere (transform.position, 0.5);
}
