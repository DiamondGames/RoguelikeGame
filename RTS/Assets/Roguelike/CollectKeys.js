#pragma strict

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
		GameObject.Find("Sphere 2").GetComponent(OpenDoors).keys ++;
		collider.enabled = false;
		renderer.enabled = false;
	}
}