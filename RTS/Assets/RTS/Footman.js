#pragma strict

final var BUTTON_WIDTH = 100;

static var canMoveButtonPos = true;
static var essentialElement : int;
static var buttonPositions = new ArrayList();
var gos : GameObject[];
var pSelection = new ArrayList();
static var footmen = 1;
var FOOTMAN_NUM = 0;
var abilCooldown = new int[2];
var abilCooldownDeadline = new int[2];
var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
	FOOTMAN_NUM = footmen - 1;
	for (var i = 0; i < abilCooldownDeadline.length; i ++)
		abilCooldownDeadline[i] = 250;
	for (var i2 = 0; i2 < abilCooldown.length; i2 ++)
		abilCooldown[i2] = 0;
}

function Update ()
{
	if (!name.Contains(player.ipAddress))
		return;
	pSelection = new ArrayList();
	gos = GameObject.FindGameObjectsWithTag("Unit");
	for (var go : GameObject in gos)
		if (go.GetComponent(SelectUnit).selected)
			pSelection.Add(go);
	if (GetComponent(SelectUnit).selected)
		GetComponentInChildren(Sword).Turn();
	for (var i = 0; i < abilCooldown.length; i ++)
		abilCooldown[i] --;
}

function OnGUI()
{
	if (!name.Contains(player.ipAddress))
		return;
	if (GetComponent(SelectUnit).selected)
	{
		var buttonPos : Vector2;
		if (canMoveButtonPos)
		{
			canMoveButtonPos = false;
			if (buttonPositions.Count > 0)
			{
				buttonPos = buttonPositions[buttonPositions.Count - 1];
				buttonPositions.Add(new Vector2(buttonPos.x + BUTTON_WIDTH + 10, Screen.height - 30));
			}
			else
				buttonPositions.Add(new Vector2(10, Screen.height - 30));
			essentialElement = buttonPositions.Count - 1;
		}
		buttonPos = buttonPositions[essentialElement];
		if (GUI.Button(Rect(buttonPos.x, buttonPos.y, BUTTON_WIDTH, 20), "Attack") && abilCooldown[0] <= 0)
		{
			if (GameObject.Find("GameObject " + FOOTMAN_NUM + " " + player.ipAddress).transform.rotation.y == 0)
				GameObject.Find("GameObject " + FOOTMAN_NUM + " " + player.ipAddress).GetComponent(Animation).Play("Sword");
			else
				GameObject.Find("GameObject " + FOOTMAN_NUM + " " + player.ipAddress).GetComponent(Animation).Play("Sword 2");
			abilCooldown[0] = abilCooldownDeadline[0];
		}
	}
	else
	{
		if (!canMoveButtonPos)
				for (var i = 0; i < buttonPositions.Count; i ++)
					if (i >= essentialElement)
					{
						var buttonPos2 : Vector2;
						buttonPos2 = buttonPositions[i];
						buttonPos2.x -= BUTTON_WIDTH + 10;
						buttonPositions[i] = buttonPos2;
					}
			canMoveButtonPos = true;
	}
	if (GUI.changed)
	{
		GetComponent(SelectUnit).canDeselect = false;
		GetComponent(SelectUnit).selected = true;
	}
	else if (Input.GetAxis("Select") == 1 && !GetComponent(SelectUnit).selected)
		GetComponent(SelectUnit).canDeselect = true;
}