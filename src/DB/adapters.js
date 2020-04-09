import { DATABASE_LOCAL_URL } from '../Configs/env'

export default function DatabaseAdapterFunctions(dbms) {
  function connect() {
    return new Promise((resolve, reject) => {
      dbms.connect(
        DATABASE_LOCAL_URL,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
        err => {
          if (err) return reject(err)
          resolve('connected to the database')
        }
      )
    })
  }

  async function insert(targetModel, data) {
    try {
      // create new User
      const user = new targetModel(data)
      // save the user
      await user.save()

      return createReturnObject(null, user)
    } catch (err) {
      return createReturnObject(err)
    }
  }

  async function updateOne(targetModel, filter, data) {
    try {
      // find the item by filters and update it's data
      const user = await targetModel.updateOne(
        filter,
        { $set: data },
        { new: true }
      )

      // return the new item
      return createReturnObject(null, user)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function findOneAndUpdate(
    targetModel,
    filter,
    data,
    options = { new: true }
  ) {
    try {
      // find the item by filters and update it's data
      const modelData = await targetModel.findOneAndUpdate(
        filter,
        data,
        options
      )

      // return the new item
      return createReturnObject(null, modelData)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function deleteOne(targetModel, filter) {
    try {
      // find items to delete
      const item = await targetModel.findOne(filter)

      // check if there is an item to delete
      if (item === null) return createReturnObject('item not found')

      // remove the item if exist
      const info = await item.remove()

      // return the delete info
      return createReturnObject(null, info)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function find(targetModel, filter) {
    try {
      // find the items by filters
      const data = await targetModel.find(filter)
      // return the items
      return createReturnObject(null, data)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function findOne(targetModel, filter) {
    try {
      // find the items by filters
      const item = await targetModel.findOne(filter)

      // return the items
      return createReturnObject(null, item)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function findById(targetModel, id) {
    try {
      // find item by id
      const user = await targetModel.findById(id)
      // return the item
      return createReturnObject(null, user)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function findAndPopulate(
    targetModel,
    filters,
    populateField,
    fieldsToSkip
  ) {
    try {
      // find data by filters and populate refs
      const data = await targetModel
        .find(filters)
        .populate(populateField, fieldsToSkip)

      return createReturnObject(null, data)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  async function findOneAndPopulate(
    targetModel,
    filters,
    populateField,
    fieldsToSkip
  ) {
    try {
      // find data by filters and populate refs
      const data = await targetModel
        .findOne(filters)
        .populate(populateField, fieldsToSkip)

      return createReturnObject(null, data)
    } catch (error) {
      return createReturnObject(error)
    }
  }

  function createReturnObject(err, data) {
    return {
      data,
      error: err,
      hasDatabaseError: err === null ? false : true,
    }
  }

  connect().then(console.log)

  return Object.freeze({
    find,
    insert,
    findOne,
    findById,
    updateOne,
    deleteOne,
    findAndPopulate,
    findOneAndPopulate,
    findOneAndUpdate,
  })
}
