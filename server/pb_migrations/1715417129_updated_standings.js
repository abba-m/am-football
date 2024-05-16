/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hf9hyn8osb80llx")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  leagueId,\n  team,\n  SUM(score) AS totalWins\nFROM \n  (\n    SELECT \n      fixtures.leagueId,\n      fixtures.home AS team,\n      result.home AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n    UNION ALL\n    SELECT \n      fixtures.leagueId,\n      fixtures.away AS team,\n      result.away AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n  ) AS subquery\nGROUP BY \n  leagueId, team\nORDER BY \n  totalWins DESC;"
  }

  // remove
  collection.schema.removeField("ci5c9dyr")

  // remove
  collection.schema.removeField("mtaqcfow")

  // remove
  collection.schema.removeField("4lxkv6wz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r5m3mec7",
    "name": "leagueId",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lcp8guqq",
    "name": "team",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cn5iw3od",
    "name": "totalWins",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hf9hyn8osb80llx")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  leagueId,\n  team,\n  SUM(score) AS total_wins\nFROM \n  (\n    SELECT \n      fixtures.leagueId,\n      fixtures.home AS team,\n      result.home AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n    UNION ALL\n    SELECT \n      fixtures.leagueId,\n      fixtures.away AS team,\n      result.away AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n  ) AS subquery\nGROUP BY \n  leagueId, team\nORDER BY \n  total_wins DESC;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ci5c9dyr",
    "name": "leagueId",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtaqcfow",
    "name": "team",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4lxkv6wz",
    "name": "total_wins",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("r5m3mec7")

  // remove
  collection.schema.removeField("lcp8guqq")

  // remove
  collection.schema.removeField("cn5iw3od")

  return dao.saveCollection(collection)
})
