#pragma strict

var player : NetworkPlayer;

function Start ()
{
	name = name + " " + player.ipAddress;
}

function Update ()
{
	if (!name.Contains(player.ipAddress))
		return;
	if (Input.GetAxis("Zoom") == 1 && camera.orthographicSize < 40)
		camera.orthographicSize += .4;
	else if (Input.GetAxis("Zoom") == -1 && camera.orthographicSize > 5)
		camera.orthographicSize -= .4;
	if (Input.GetAxis("Camera Follow") == 1)	
	{
		var gos = GameObject.FindGameObjectsWithTag("Unit");
		var distance = Mathf.Infinity;
		for (var go : GameObject in gos)
		{
			if (Vector2.Distance(go.transform.position, transform.position) < distance && go.GetComponent(SelectUnit).selected)
				distance = Vector2.Distance(go.transform.position, transform.position);
		}
		for (var go2 : GameObject in gos)
		{
			if (Vector2.Distance(transform.position, go2.transform.position) == distance)
				GetComponent(SmoothFollow2D).target = go2.transform;
		}
	}
	else
	{
		GetComponent(SmoothFollow2D).target = GameObject.Find("Target").transform;
		if (Input.GetAxis("Camera Horizontal") == 1)
			transform.position.x += .4;
		else if (Input.GetAxis("Camera Horizontal") == -1)
			transform.position.x -= .4;
		if (Input.GetAxis("Camera Vertical") == 1)
			transform.position.y += .4;
		else if (Input.GetAxis("Camera Vertical") == -1)
			transform.position.y -= .4;
		
	}
}