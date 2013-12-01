#pragma strict

var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
}

function Update ()
{
	
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name.Contains(player.ipAddress))
		other.gameObject.layer = 0;
}