/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hf9hyn8osb80llx")

  collection.options = {
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  leagueId,\n  team,\n  team.name as teamName,\n  COUNT(*) AS matchesPlayed,\n  SUM(score) AS totalWins\nFROM \n  (\n    SELECT \n      fixtures.leagueId,\n      fixtures.home AS team,\n      result.home AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n    UNION ALL\n    SELECT \n      fixtures.leagueId,\n      fixtures.away AS team,\n      result.away AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n  ) AS subquery\nJOIN\n  team ON subquery.team = team.id\nGROUP BY \n  leagueId, team, teamName\nORDER BY \n  totalWins DESC;"
  }

  // remove
  collection.schema.removeField("r5m3mec7")

  // remove
  collection.schema.removeField("lcp8guqq")

  // remove
  collection.schema.removeField("cn5iw3od")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dfmlbjqc",
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
    "id": "vrsy25vw",
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
    "id": "b0onfvyg",
    "name": "teamName",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjkgtxpv",
    "name": "matchesPlayed",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "toed1eat",
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
    "query": "SELECT \n  (ROW_NUMBER() OVER()) as id,\n  leagueId,\n  team,\n  SUM(score) AS totalWins\nFROM \n  (\n    SELECT \n      fixtures.leagueId,\n      fixtures.home AS team,\n      result.home AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n    UNION ALL\n    SELECT \n      fixtures.leagueId,\n      fixtures.away AS team,\n      result.away AS score\n    FROM \n      fixtures\n    JOIN \n      result ON fixtures.id = result.fixtureId\n  ) AS subquery\nGROUP BY \n  leagueId, team\nORDER BY \n  totalWins DESC;"
  }

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

  // remove
  collection.schema.removeField("dfmlbjqc")

  // remove
  collection.schema.removeField("vrsy25vw")

  // remove
  collection.schema.removeField("b0onfvyg")

  // remove
  collection.schema.removeField("sjkgtxpv")

  // remove
  collection.schema.removeField("toed1eat")

  return dao.saveCollection(collection)
})
