//#pragma strict

@script AddComponentMenu ("Paths/Path to follow")

var path : CurveManager;
private var i = 0;
private var time = 0.0;
var speed : float = 1;

function Start () {

}

function Update () {
		if(i<path.pointsData.Count-1) {
			Debug.Log("position:"+transform.position+" going from:"+path.pointsData[i]+" to:"+path.pointsData[i+1]+" @Time:"+time);
			transform.position = Vector3.Lerp(path.pointsData[i], path.pointsData[i+1], time );
			time+=Time.deltaTime* speed;
			if(time>1.0){
				i++;
				time=0.0;
			}				
		} else i =0;

}