#pragma strict

var target : Transform;
var smoothTime = 0.3;
private var velocity : Vector2;

function Start()
{
	
}

function Update() 
{
	transform.position.x = Mathf.SmoothDamp( transform.position.x, 
		target.position.x, velocity.x, smoothTime);
	transform.position.y = Mathf.SmoothDamp( transform.position.y, 
		target.position.y, velocity.y, smoothTime);
}