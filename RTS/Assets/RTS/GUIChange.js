#pragma strict

var buttonPositions = new ArrayList();

function Start ()
{
	buttonPositions.Add(Vector2());
}

function Update ()
{
	var noneSelected = true;
	var gos = GameObject.FindGameObjectsWithTag("Unit");
	for (var go : GameObject in gos)
		if (go.GetComponent(SelectUnit).selected)
			noneSelected = false;
	if (noneSelected)
		buttonPositions.Clear();
}