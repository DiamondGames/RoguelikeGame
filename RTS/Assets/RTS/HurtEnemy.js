#pragma strict

var damage = 5;
var canHit = false;
var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
}

function Update ()
{
	
}

function OnTriggerStay (other : Collider)
{
	var number = gameObject.name.Split(" "[0]);
	if ((GameObject.Find("GameObject " + number[1] + " " + player.ipAddress).GetComponent(Animation).IsPlaying("Sword") || GameObject.Find("GameObject " + number[1] + " " + player.ipAddress).GetComponent(Animation).IsPlaying("Sword 2")) && other.gameObject.tag == "Unit" && canHit)
	{
		other.gameObject.GetComponent(Health).hp -= damage;
		if (other.gameObject.GetComponent(Health).hp <= 0)
			Destroy(other.gameObject);
		canHit = false;
	}
}