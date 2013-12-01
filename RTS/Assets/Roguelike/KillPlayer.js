#pragma strict

var gos : GameObject[];

function Start ()
{
	
}

function Update ()
{
	
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name == "Player")
	{
		other.gameObject.transform.position = GameObject.Find("Checkpoint 1").transform.position;
		other.gameObject.rigidbody.velocity = Vector3.zero;
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
		other.gameObject.GetComponent(PlayerBehavior).hp = other.gameObject.GetComponent(PlayerBehavior).maxhp;
	}
}