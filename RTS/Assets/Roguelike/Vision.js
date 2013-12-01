#pragma strict

function Start ()
{

}

function Update ()
{

}

function OnTriggerEnter (other : Collider)
{
		other.gameObject.layer = 0;
}