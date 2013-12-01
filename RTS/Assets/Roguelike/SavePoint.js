#pragma strict

var initKeys = 0;

function Start ()
{

}

function Update ()
{

}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name == "Player")
	{
		GameObject.Find("Checkpoint 1").transform.position = transform.position;
		initKeys = GameObject.Find("Sphere 2").GetComponent(OpenDoors).keys;
	}
}