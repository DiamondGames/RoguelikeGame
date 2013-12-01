#pragma strict

function Start ()
{
	
}

function Update ()
{
	if (!animation.IsPlaying("Sword") && !animation.IsPlaying("Sword 2"))
		GetComponentInChildren(HurtEnemy).canHit = true;
}

function Turn ()
{
	if (Input.GetAxis("Horizontal") == 1)
		transform.rotation.y = 0;
	else if (Input.GetAxis("Horizontal") == -1)
		transform.rotation.y = 180;
}