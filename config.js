module.exports = {
  database:
    'mongodb://yograpradipta:yogra2020@cluster0-shard-00-00.xx8ws.mongodb.net:27017,cluster0-shard-00-01.xx8ws.mongodb.net:27017,cluster0-shard-00-02.xx8ws.mongodb.net:27017/dbmypro?ssl=true&replicaSet=atlas-39xxc5-shard-0&authSource=admin&retryWrites=true&w=majority',
  port: process.env.PORT || 3030,
  secret: 'YograPradipta2020'
};