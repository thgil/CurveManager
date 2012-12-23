//#pragma strict

var points = new Array(); // Contains waypoints

function Start () {

}

function Update () {

}

function OnDrawGizmos () {
    for (var i=0; i<points.length; i++) {
      Gizmos.color = Color.yellow;
      Gizmos.DrawWireSphere (points[i], 0.5);
    }
}

function OnDrawGizmosSelected () {

}
