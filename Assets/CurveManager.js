//#pragma strict

@script AddComponentMenu ("Paths/CurveManger")

var points = new Array(); // Contains waypoints
var pointsData = new Array(); //Contains points on curves

function Start () {

}

function Update () {
}

function OnDrawGizmos () {

    for (i=0; i< pointsData.length-1; i++) {
      Gizmos.color = Color.white;
      Gizmos.DrawLine (pointsData[i], pointsData[i+1]);
    }
}

function OnDrawGizmosSelected () {

    for (var i=0; i<points.length; i++) {
      Gizmos.color = Color.yellow;
      Gizmos.DrawWireSphere (points[i], 1);
    }
}
