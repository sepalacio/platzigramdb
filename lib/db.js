'use strict'

const r = require('rethinkdb')
const co = require('co')


const defaults = {
  host: 'localhost',
  port: 28015,
  db: platzigram
}

class Db {

  constructor (options){
    options = options || {}
    this.host = options.host || defaults.host
    this.port = options.port || defaults.port
    this.db = options.db || defaults.db
  }

  connect (){
    this.connection = r.conect({
      host : this.host,
      port :this.port
    })
  }

  // let setup = co.wrap (function * (){

  // })

}

module.export = Db