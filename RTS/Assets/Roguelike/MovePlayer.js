#pragma strict

var speed = .125;
var colliding = false;

function Start ()
{
	
}

function Update ()
{
	if (Input.GetAxis("Horizontal") == 1 && !colliding)
		transform.position.x += speed;
	else if (Input.GetAxis("Horizontal") == -1 && !colliding)
		transform.position.x -= speed;
}

function OnCollisionEnter(collision : Collision)
{
	colliding = true;
}

function OnCollisionStay(collisionInfo : Collision)
{
	colliding = true;
}

function OnCollisionExit(collision : Collision)
{
	colliding = false;
}