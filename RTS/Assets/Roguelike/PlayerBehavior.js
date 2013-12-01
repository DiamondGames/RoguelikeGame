#pragma strict

var SHOOT_DEADLINE = 10;
var maxhp = 10;
var hp = maxhp;
var gos : GameObject[];
var shootTimer = 0;
var range = 0;
var bulletSpeed = 0.025;
var score = 0;

function Start ()
{
	hp = maxhp;
	transform.position = Vector3.zero;
}

function Update ()
{
	shootTimer ++;
	if (shootTimer >= SHOOT_DEADLINE)
	{
		var sphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		sphere.collider.isTrigger = true;
		sphere.collider.material = PhysicMaterial("Bouncy");
		sphere.AddComponent(Rigidbody);
		sphere.rigidbody.useGravity = false;
		sphere.transform.position = transform.position;
		sphere.name = "Bullet";
		sphere.tag = "Bullet";
		sphere.layer = 1;
		sphere.AddComponent(BulletBehavior);
		sphere.GetComponent(BulletBehavior).vel = Vector2(GameObject.Find("Main Camera").camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).x, GameObject.Find("Main Camera").camera.ScreenToWorldPoint(Vector2(Input.mousePosition.x, Input.mousePosition.y)).y) - transform.position;
		sphere.GetComponent(BulletBehavior).speed = bulletSpeed;
		sphere.GetComponent(BulletBehavior).madeByPlayer = true;
		sphere.renderer.material.color.r = 255;
		sphere.renderer.material.color.g = 255;
		sphere.renderer.material.color.b = 255;
		shootTimer = 0;
	}
	if (hp <= 0)
	{
		Start();
		GameObject.Find("Main Camera").GetComponent(RandomizeMap).Start();
		/*
		transform.position = GameObject.Find("Checkpoint 1").transform.position;
		rigidbody.velocity = Vector3.zero;
		GameObject.Find("Sphere 2").GetComponent(OpenDoors).keys = GameObject.Find("Save Point").GetComponent(SavePoint).initKeys;
		GameObject.Find("Key").collider.enabled = true;
		GameObject.Find("Key").renderer.enabled = true;
		gos = GameObject.FindGameObjectsWithTag("Block");
		for (var go : GameObject in gos)
		{
			go.transform.position = go.GetComponent(MoveObject).initPos;
			go.GetComponent(MoveObject).currentWayPoint = 1;
		}
		gos = GameObject.FindGameObjectsWithTag("Enemy");
		for (var go : GameObject in gos)
		{
			go.collider.enabled = true;
			go.renderer.enabled = true;
			go.GetComponent(EnemyBehavior).hp = go.GetComponent(EnemyBehavior).MAX_HP;
			go.transform.position = go.GetComponent(MoveObject).initPos;
			go.GetComponent(EnemyBehavior).shootTimer = 0;
		}
		GetComponent(PlayerBehavior).hp = GetComponent(PlayerBehavior).maxhp;
		*/
	}
	else if (Input.GetKeyDown("r"))
	{
		Start();
		GameObject.Find("Main Camera").GetComponent(RandomizeMap).Start();
		score = 0;
	}
}

function OnGUI ()
{
	GUI.Label (Rect (10, 10, 100, 20), "Health: " + hp);
	GUI.Label (Rect (10, 20, 100, 20), "Score: " + score);
}