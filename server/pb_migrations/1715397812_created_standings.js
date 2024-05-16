/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hf9hyn8osb80llx",
    "created": "2024-05-11 03:23:32.005Z",
    "updated": "2024-05-11 03:23:32.005Z",
    "name": "standings",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "274y3shh",
        "name": "leagueId",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "qigskoog",
        "name": "team",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "etpbspyb",
        "name": "total_wins",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  leagueId,\n  team,\n  SUM(score) AS total_wins\nFROM \n  (\n    SELECT \n      fixtures.leagueId,\n      fixtures.home AS team,\n      result.home AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n    UNION ALL\n    SELECT \n      fixtures.leagueId,\n      fixtures.away AS team,\n      result.away AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n  ) AS subquery\nGROUP BY \n  leagueId, team\nORDER BY \n  total_wins DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hf9hyn8osb80llx");

  return dao.deleteCollection(collection);
})
