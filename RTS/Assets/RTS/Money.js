#pragma strict

var money = 500;

function Start ()
{
	
}

function Update ()
{
	
}

function OnGUI ()
{
	GUI.color.r = 255;
	GUI.color.g = 255;
	GUI.color.b = 0;
	GUI.color.a = 255;
	GUI.Label (Rect (10, 10, 100, 20), "Gold: " + money);
}