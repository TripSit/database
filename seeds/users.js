'use strict';

const argon = require('argon2');

exports.seed = async function createUsers(knex) {
  await knex('user_role_users').del();
  await knex('user_roles').del();
  await knex('users').del();

  const roles = await knex('user_roles')
    .insert([
      {
        name: 'user:read',
        description: 'Read users',
      },
      {
        name: 'user:write',
        description: 'Create, update, and delete users',
      },
      {
        name: 'user:notes',
        description: 'User notes require special permissions',
      },
      {
        name: 'user:roles',
        description: 'Can set user roles',
      },
      {
        name: 'drug:write',
        description: 'Update drug information',
      },
    ])
    .returning('*');

  const users = [
    {
      nick: 'SevenCats',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
        'user:roles',
        'drug:write',
      ],
    },
    {
      nick: 'PhilosophicalDuck',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
        'user:roles',
        'drug:write',
      ],
    },
    {
      nick: 'reality',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
        'user:roles',
        'drug:write',
      ],
    },
    {
      nick: 'Moonbear',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
        'user:roles',
        'drug:write',
      ],
    },
    {
      nick: 'mogad0n',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
        'drug:write',
      ],
    },
    {
      nick: 'sHr00m',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
      ],
    },
    {
      nick: 'winter',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
      ],
    },
    {
      nick: 'Seg',
      roles: [
        'user:read',
        'user:write',
        'user:notes',
      ],
    },
  ];

  const passwords = await Promise.all(users.map(() => argon.hash('P@ssw0rd')));

  const userRecords = await knex('users')
    .insert(users.map((user, i) => ({
      nick: user.nick,
      password: passwords[i],
    })))
    .returning('id')
    .then(records => records.map((id, i) => ({
      id,
      ...users[i],
    })));

  return knex('user_role_users').insert(userRecords
    .flatMap(user => user.roles.map(role => ({
      userId: user.id,
      userRoleId: roles.find(({ name }) => name === role).id,
    }))));
};
