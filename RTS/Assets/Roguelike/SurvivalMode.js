#pragma strict

var shouldRestart = false;

function Start ()
{
	GameObject.Find("Spawn Loc").transform.position = GameObject.Find("Player").transform.position;
	Restart();
}

function Restart()
{
	shouldRestart = false;
	GameObject.Find("Player").transform.position = GameObject.Find("Spawn Loc").transform.position;
}

function Update ()
{
	if (Input.GetAxis("Restart") == 1)
		Restart();
	if (shouldRestart)
		return;
}

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Block")
		shouldRestart = true;
}