#pragma strict

var SHOOT_DEADLINE = 30;
var MAX_HP = 5;
var hp = MAX_HP;
var gos : GameObject[];
var shootTimer = 0;
var sightRadius = 25;
var follow = false;
var speed = 0.0;
var vel : Vector2;
var bulletSpeed = 0.0;
var shooting = false;
var SHOOTS = true;
var xp = 0;
var patrol = false;

function Start ()
{
	hp = MAX_HP;
}

function Update ()
{
	//if (collider.enabled == true && Vector2.Distance(transform.position, GameObject.Find("Human Peasant").transform.position) <= sightRadius)
		//shooting = true;
	//else
		//shooting = false;
	var helping = false;
	//gos = GameObject.FindGameObjectsWithTag("Enemy");
	//for (var go : GameObject in gos)
		//if (Vector2.Distance(transform.position, go.transform.position) <= sightRadius && go != gameObject && (go.GetComponent(EnemyBehavior).shooting || go.GetComponent(EnemyBehavior).vel != Vector2(0, 0)))
			//helping = true;
	shootTimer ++;
	if (Vector2.Distance(transform.position, GameObject.Find("Human Peasant").transform.position) <= sightRadius && shootTimer >= SHOOT_DEADLINE && SHOOTS)
	{
		var sphere : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		sphere.layer = 1;
		sphere.collider.isTrigger = true;
		sphere.AddComponent(Rigidbody);
		sphere.rigidbody.useGravity = false;
		sphere.transform.position = transform.position;
		sphere.name = "Bullet";
		sphere.tag = "Bullet";
		sphere.layer = 1;
		sphere.AddComponent(BulletBehavior);
		sphere.GetComponent(BulletBehavior).vel = GameObject.Find("Human Peasant").transform.position - transform.position;
		sphere.GetComponent(BulletBehavior).speed = bulletSpeed;
		sphere.GetComponent(BulletBehavior).madeByPlayer = false;
		sphere.renderer.material.color.r = 255;
		sphere.renderer.material.color.g = 255;
		sphere.renderer.material.color.b = 0;
		shootTimer = 0;
	}
	if (hp <= 0)
		Destroy(gameObject);
	if (follow && (Vector2.Distance(transform.position, GameObject.Find("Human Peasant").transform.position) <= sightRadius || helping))
	{
		vel = GameObject.Find("Human Peasant").transform.position - transform.position;
		vel = Vector2.ClampMagnitude(vel, speed);
		transform.position += vel;
	}
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name == "Human Peasant")
	{
		other.gameObject.GetComponent(PlayerBehavior).hp --;
		Destroy(gameObject);
	}
}