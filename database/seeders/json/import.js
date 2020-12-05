const baseJsonDir = './database/seeders/json/';
const shell = require('shelljs');

shell.cd(baseJsonDir);
shell.exec('mongoimport --db reviewsdb --collection products --file products.json');
shell.exec("mongo --eval 'db.products.createIndex({product_id: -1});' reviewsdb");
shell.exec('mongoimport --db reviewsdb --collection users --file users.json');
shell.exec("mongo --eval 'db.users.createIndex({user_id: -1});' reviewsdb");
