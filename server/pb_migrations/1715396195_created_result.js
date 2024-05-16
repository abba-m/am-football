/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "syd9mqma59ackvm",
    "created": "2024-05-11 02:56:35.939Z",
    "updated": "2024-05-11 02:56:35.939Z",
    "name": "result",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ekbptvbg",
        "name": "fixtureId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "k1rakqoqgwu0ta2",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "9rrsp4pi",
        "name": "home",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "b7kbmkj6",
        "name": "away",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("syd9mqma59ackvm");

  return dao.deleteCollection(collection);
})
