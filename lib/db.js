'use strict'

const r = require('rethinkdb')
const co = require('co')// permite funcionalidad tipo async await
const Promise = require('bluebird')


const defaults = {
  host: 'localhost',
  port: 28015,
  db: 'platzigram'
}

class Db {

  constructor (options){
    options = options || {}
    this.host = options.host || defaults.host
    this.port = options.port || defaults.port
    this.db = options.db || defaults.db
  }

  connect (callback) {
    this.connection = r.connect({
      host : this.host,
      port :this.port
    })

    let db = this.db
    let connection = this.connection
    
    let setup = co.wrap (function * (){
      let conn = yield connection

      let dbList = yield r.dbList().run(conn)
      //check if the name of the db pased in the config exists
      if (dbList.indexOf(db) === -1){
        yield r.dbCreate(db).run(conn)
      }

      let dbTables = yield r.db(db).tableList().run(conn)

      if (dbList.indexOf('images') === -1){
        yield r.db(db).tableCreate('images').run(conn)
      }

      if (dbList.indexOf('users') === -1){
        yield r.db(db).tableCreate('users').run(conn)
      }

      return conn
    })

    //if no callback is send then return the promise, if yes then return the callback as an async function
    return Promise.resolve(setup()).asCallback(callback)
  }//connect
} //class

module.exports = Db