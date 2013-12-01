#pragma strict

var canDeselect = true;
var selecting = false;
var selected = false;
var initSelectPos = Vector2();
var material : Material;
var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
	material = new Material (Shader.Find ("Transparent/Diffuse"));
}

function Update ()
{
	if (!name.Contains(player.ipAddress))
		return;
	if (Input.GetAxis("Select") == 0)
	{
		if (selecting)
		{
			if (transform.position.x >= Mathf.Min(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, -Input.mousePosition.y + Screen.height)).x, GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(initSelectPos).x) && transform.position.x <= Mathf.Max(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, -Input.mousePosition.y + Screen.height)).x, GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(initSelectPos).x) && transform.position.y >= Mathf.Min(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, -Input.mousePosition.y + Screen.height)).y, GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(initSelectPos).y) && transform.position.y <= Mathf.Max(GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, -Input.mousePosition.y + Screen.height)).y, GameObject.Find("Main Camera " + player.ipAddress).camera.ScreenToWorldPoint(initSelectPos).y))
				selected = true;
			else if (Input.GetAxis("Add To Selection") == 0)
				selected = false;
		}
		selecting = false;
	}
	else
	{
		if (!selecting)
			initSelectPos = Vector2(Input.mousePosition.x, -Input.mousePosition.y + Screen.height);
		selecting = true;
	}
	if (selected)
	{
		if (GetComponent(CharacterMotor) != null)
			GetComponent(CharacterMotor).canControl = true;
		material.color = Color.green;
	}
	else if (canDeselect)
	{
		if (GetComponent(CharacterMotor) != null)
			GetComponent(CharacterMotor).canControl = false;
		material.color = Color.white;
	}
	renderer.material = material;
}

function OnGUI()
{
	if (!name.Contains(player.ipAddress))
		return;
	if (selecting)
		GUI.Box(Rect(initSelectPos.x, initSelectPos.y, Input.mousePosition.x - initSelectPos.x, -Input.mousePosition.y + Screen.height - initSelectPos.y),"");
}
