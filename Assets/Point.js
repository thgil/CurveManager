#pragma strict

//@script AddComponentMenu ("Paths/Point")

var oldTransform;
oldTransform = transform.position;
var myParent : CurveManager;
//myParent = transform.parent.GetComponent(CurveManager);

function Start () {
}

function Update () {

}

function OnDrawGizmos () {
//draw labels

	if(oldTransform!=transform.position) {
		oldTransform=transform.position;
		myParent = transform.parent.GetComponent(CurveManager);
		myParent.dirty=true;
	}

    Gizmos.color = Color.blue;
    Gizmos.DrawWireSphere (transform.position, 0.5);
}
