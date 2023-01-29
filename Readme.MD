# API Rest-O
COMMANDES :

. getCommande =>

{
	"status": "OK",
	"message": "Voici la commande recherchée.",
	"data": {
		"id": 11,
		"prix": "5",
		"deleted_at": false
	}
}

.getCommandeByRestaurantId =>

{
	"status": "OK",
	"message": "Voici la (les) commande(s) recherchée(s) pour ce restaurant.",
	"data": [
		{
			"id": 6,
			"prix": "10",
			"deleted_at": false
		},
		{
			"id": 7,
			"prix": "9",
			"deleted_at": false
		},
		{
			"id": 10,
			"prix": "10",
			"deleted_at": false
		},
		{
			"id": 11,
			"prix": "5",
			"deleted_at": false
		}
	]
}

.createNewCommande =>

{
	"status": "OK",
	"message": "Votre commande a bien été créée.",
	"data": [
		{
			"id": 15,
			"userId": 1,
			"restaurantId": 1,
			"menuId": 2,
			"prix": "5",
			"deleted_at": false
		}
	]
}

.updateNewCommande =>

{
	"status": "OK",
	"message": "Votre commande a bien été modifiée.",
	"data": [
		{
			"id": 15,
			"userId": 1,
			"restaurantId": 1,
			"menuId": 2,
			"prix": "10",
			"deleted_at": false
		}
	]
}

.deleteCommandeById =>

{
	"status": "OK",
	"message": "Votre commande a bien été annulée.",
	"data": [
		{
			"id": 15,
			"userId": 1,
			"restaurantId": 1,
			"menuId": 2,
			"prix": "10",
			"deleted_at": true
		}
	]
}

RESTAURANT :

.getRestaurantByVille =>



