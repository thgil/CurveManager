//#pragma strict

@script AddComponentMenu ("Paths/CurveManger")

var points = new Array(); // Contains waypoints
var pointsData = new Array(); //Contains points on curves

function Start () {

}

function Update () {
}

function OnDrawGizmos () {

	var i=0;

    for (i=0; i< pointsData.length-1; i++) {
      Gizmos.color = Color.white;
      Gizmos.DrawLine (pointsData[i], pointsData[i+1]);
    }

    for (i=0; i< points.length-1; i++) {
      Gizmos.color = Color.green;
      Gizmos.DrawLine (points[i], points[i+1]);
    }
}

function OnDrawGizmosSelected () {
    for ( i=0; i<points.length; i++) {
      Gizmos.color = Color.yellow;
      Gizmos.DrawWireSphere (points[i], 1);
    }
}
