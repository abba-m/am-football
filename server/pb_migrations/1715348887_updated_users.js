/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "  @request.data.name:isset = true &&\n  @request.data.email:isset = true &&\n  @request.data.password:isset = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "  @request.data.name:isset = true &&\n  @request.data.email:isset = true"

  return dao.saveCollection(collection)
})
