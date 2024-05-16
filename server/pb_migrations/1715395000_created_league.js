/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yt06ojma9ya77ht",
    "created": "2024-05-11 02:36:40.387Z",
    "updated": "2024-05-11 02:36:40.387Z",
    "name": "league",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oooz6k00",
        "name": "title",
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
        "id": "dexhacox",
        "name": "season",
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
  const collection = dao.findCollectionByNameOrId("yt06ojma9ya77ht");

  return dao.deleteCollection(collection);
})
