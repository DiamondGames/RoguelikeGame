#pragma strict

final var BARRACKS_HP = 1000;
final var BUTTON_WIDTH = 100;

static var canMoveButtonPos = true;
static var essentialElement : int;
var building = true;
var builder = Vector2();
var buttonPositions = new ArrayList();
var footman : Transform;
var gos : GameObject[];
var pSelection = new ArrayList();
var trainTimers = new ArrayList();
var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
}

function Update ()
{
	if (!name.Contains(player.ipAddress))
		return;
	pSelection = new ArrayList();
	gos = GameObject.FindGameObjectsWithTag("Unit");
		for (var go2 : GameObject in gos)
			if (go2.GetComponent(SelectUnit).selected)
				pSelection.Add(go2);
	if (building && Vector2.Distance(transform.position, builder) <= 2)
		GetComponent(Health).hp ++;
	if (GetComponent(Health).hp == BARRACKS_HP)
		building = false;
	buttonPositions = GameObject.Find("Main Camera " + player.ipAddress).GetComponent(GUIChange).buttonPositions;
	if (trainTimers.Count > 0)
	{
		var trainTimer : int = trainTimers[0];
		trainTimer ++;
		trainTimers[0] = trainTimer;
		if (trainTimer >= 200)
		{
			trainTimers.RemoveAt(0);
			var go = Instantiate(footman, transform.position, Quaternion.identity);
			go.name = "Footman " + go.GetComponent(Footman).footmen + " " + player.ipAddress;
			GameObject.Find("GameObject").name = "GameObject " + go.GetComponent(Footman).footmen + " " + player.ipAddress;
			GameObject.Find("Sword").name = "Sword " + go.GetComponent(Footman).footmen + " " + player.ipAddress;
			go.transform.position.x = transform.position.x + 1;
			go.transform.position.y = transform.position.y + 1;
			go.transform.position.z = 0;
			go.GetComponent(SelectUnit).canDeselect = false;
			go.GetComponent(SelectUnit).selected = true;
			GetComponent(SelectUnit).canDeselect = false;
			GetComponent(SelectUnit).selected = true;
			go.GetComponent(Footman).footmen ++;
		}
	}
}

function OnGUI()
{
	if (!name.Contains(player.ipAddress))
		return;
	if (trainTimers.Count > 0 && GetComponent(SelectUnit).selected)
	{
		//GUI.Box(Rect(0,0,Screen.width,Screen.height),"This is a title");
	}
	if (!building)
	{
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
			if (GUI.Button(Rect(buttonPos.x, buttonPos.y, BUTTON_WIDTH, 20),"Train Footman") && GameObject.Find("Main Camera " + player.ipAddress).GetComponent(Money).money >= 10)
			{
				for (var go2 : GameObject in gos)
					if (pSelection.Contains(go2))
					{
						go2.GetComponent(SelectUnit).canDeselect = false;
						go2.GetComponent(SelectUnit).selected = true;
					}
				GameObject.Find("Main Camera " + player.ipAddress).GetComponent(Money).money -= 10;
				trainTimers.Add(1);
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
	}
	if (GUI.changed)
	{
		GetComponent(SelectUnit).canDeselect = false;
		GetComponent(SelectUnit).selected = true;
	}
	else if (Input.GetAxis("Select") == 1 && !GetComponent(SelectUnit).selected)
		GetComponent(SelectUnit).canDeselect = true;
}