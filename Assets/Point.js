#pragma strict

@script AddComponentMenu ("Paths/Point")

function Start () {

}

function Update () {

}

function OnDrawGizmos () {
    Gizmos.color = Color.blue;
    Gizmos.DrawWireSphere (transform.position, 1);
}
