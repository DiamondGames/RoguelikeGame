#pragma strict

final var BUTTON_WIDTH = 100;

static var canMoveButtonPos = true;
static var essentialElement : int;
var placingBuilding = false;
var gos = new ArrayList();
var gos2 : GameObject[];
var go : GameObject;
var buttonPositions = new ArrayList();
var barracks : Transform;
var pSelection = new ArrayList();
var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
	networkView.SetScope(player, true);
}

function OnConnectedToServer()
{
    
}

function Update ()
{
	if (!name.Contains(player.ipAddress))
		return;
	pSelection = new ArrayList();
	gos2 = GameObject.FindGameObjectsWithTag("Unit");
	for (var go3 : GameObject in gos2)
		if (go3.GetComponent(SelectUnit).selected)
			pSelection.Add(go3);
	if (placingBuilding)
	{
		if (go != null)
			Destroy(go);
		go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		go.collider.isTrigger = true;
		go.transform.position.x = Mathf.RoundToInt(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).x);
		go.transform.position.y = Mathf.RoundToInt(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).y);
		go.transform.position.z = 0;
		go.AddComponent(Rigidbody);
		go.rigidbody.useGravity = false;
		go.name = "Barracks Placeholder " + player.ipAddress;
		go.renderer.material.shader = Shader.Find("Transparent/Diffuse");
		go.renderer.material.color.r = 255;
		go.renderer.material.color.g = 255;
		go.renderer.material.color.b = 255;
		go.renderer.material.color.a = .1;
		var mousePos = Vector2(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).x, GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).y);
		var distance = Vector2.Distance(Vector2(Mathf.RoundToInt(transform.position.x), Mathf.RoundToInt(transform.position.y)), Vector2(Mathf.RoundToInt(mousePos.x), Mathf.RoundToInt(mousePos.y)));
		if (Input.GetAxis("Select") == 1 && GameObject.Find("Main Camera " + player.ipAddress).GetComponent(Money).money >= 200 && distance <= 1)
		{
			for (var go3 : GameObject in gos2)
				if (pSelection.Contains(go3))
				{
					go3.GetComponent(SelectUnit).canDeselect = false;
					go3.GetComponent(SelectUnit).selected = true;
				}
			placingBuilding = false;
			Destroy(go);
			GameObject.Find("Main Camera " + player.ipAddress).GetComponent(Money).money -= 200;
			var go2 = Instantiate(barracks, transform.position, Quaternion.identity);
			go2.GetComponent(SelectUnit).canDeselect = false;
			go2.GetComponent(SelectUnit).selected = true;
			GetComponent(SelectUnit).canDeselect = false;
			GetComponent(SelectUnit).selected = true;
			go2.transform.position.x = Mathf.RoundToInt(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).x);
			go2.transform.position.y = Mathf.RoundToInt(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).y);;
			go2.transform.position.z = 0;
			go2.GetComponent(Barracks).builder = Vector2(transform.position.x, transform.position.y);
			go2.GetComponent(SelectUnit).canDeselect = false;
			go2.GetComponent(SelectUnit).selected = true;
		}		
		else if (go.activeInHierarchy && Input.GetAxis("Cancel") == 1)
		{
			placingBuilding = false;
			Destroy(go);
		}
	}
	buttonPositions = GameObject.Find("Main Camera " + player.ipAddress).GetComponent(GUIChange).buttonPositions;
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
		if (GUI.Button(Rect(buttonPos.x, buttonPos.y, BUTTON_WIDTH, 20),"Build Barracks"))
			placingBuilding = true;
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