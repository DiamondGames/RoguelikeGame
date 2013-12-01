#pragma strict

var currentWayPoint = 1;
var wayPoint1 : Vector2;
var wayPoint2 : Vector2;
var speed = 0.0;
var vel : Vector2;
var initPos : Vector2;
var align = true;

function Start ()
{
	if (align)
	{
		transform.position.x = Mathf.RoundToInt(transform.position.x);
		transform.position.y = Mathf.RoundToInt(transform.position.y);
		transform.position.z = Mathf.RoundToInt(transform.position.z);
		transform.rotation.x = Mathf.RoundToInt(transform.rotation.x);
		transform.rotation.y = Mathf.RoundToInt(transform.rotation.y);
		transform.rotation.z = Mathf.RoundToInt(transform.rotation.z);
	}
	initPos = Vector2(transform.position.x, transform.position.y);
}

function Update ()
{
	if (currentWayPoint == 1 && wayPoint1 != Vector2(0, 0))
		vel = wayPoint1 - transform.position;
	else if (currentWayPoint == 2 && wayPoint2 != Vector2(0, 0))
		vel = wayPoint2 - transform.position;
	if (Vector2.Distance(wayPoint1, transform.position) < speed)
		currentWayPoint = 2;
	else if (Vector2.Distance(wayPoint2, transform.position) < speed)
		currentWayPoint = 1;
	vel = Vector2.ClampMagnitude(vel, speed);
	transform.position += vel;
}