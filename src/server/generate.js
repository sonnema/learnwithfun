var faker = require('faker');

var database = { words: []};

for (var i = 1; i<= 5; i++) {
  database.words.push({
    id: i,
    name: faker.lorem.word(),
    meaning: faker.lorem.sentence(),
    synonym1: faker.lorem.word(),
    synonym2: faker.lorem.word(),
    antonym1:faker.lorem.word(),
    antonym1:faker.lorem.word(),
    updated:faker.date.recent()
  });
}

console.log(JSON.stringify(database));