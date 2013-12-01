#pragma strict

var keys = 0;

function Start ()
{

}

function Update ()
{

}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name == "Door" && keys > 0)
	{
		other.gameObject.collider.isTrigger = true;
		other.gameObject.renderer.material.color.a = .36;
		keys --;
	}
}

function OnGUI ()
{
	GUI.Label (Rect (10, 10, 100, 20), "Keys: " + keys);
}