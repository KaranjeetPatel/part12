db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'phonebook',
    },
  ],
});

db.createCollection('people');

db.people.insert({ name: 'First person', number: '040-0000000' });
db.people.insert({ name: 'Second person', number: '040-000001' });