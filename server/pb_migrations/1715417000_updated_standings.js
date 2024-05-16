/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hf9hyn8osb80llx")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("274y3shh")

  // remove
  collection.schema.removeField("qigskoog")

  // remove
  collection.schema.removeField("etpbspyb")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hf9hyn8osb80llx")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("ci5c9dyr")

  // remove
  collection.schema.removeField("mtaqcfow")

  // remove
  collection.schema.removeField("4lxkv6wz")

  return dao.saveCollection(collection)
})
