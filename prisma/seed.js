const {PrismaClient} = require('@prisma/client');
const fetch = require('node-fetch');
const prisma = new PrismaClient();

const createUsers = async () => {
  const randomUsersResponse = await fetch('https://randomuser.me/api/?results=50');
  const randomUsers = await randomUsersResponse.json();

  await prisma.user.createMany({
    data: randomUsers.results.map((user) => ({
      email: user.email,
      name: `${user.name.first} ${user.name.last}`,
      emailVerified: new Date(),
      image: user.picture.large,
      sex: user.gender,
      age: user.dob.age
    }))
  });
};

const createUsersToConversation = async () => {
  const alice = await prisma.user.upsert({
    where: {email: 'alice@google.pl'},
    update: {
      updatedAt: new Date()
    },
    create: {
      email: `alice@google.pl`,
      name: 'Alice',
      skill: 'Fullstack Developer',
      timezone: '+02:00'
    }
  });
  const bob = await prisma.user.upsert({
    where: {email: 'bob@google.pl'},
    update: {
      updatedAt: new Date()
    },
    create: {
      email: `bob@google.pl`,
      name: 'Bob',
      skill: 'UI Designer',
      timezone: '+02:00'
    }
  });
  const anna = await prisma.user.upsert({
    where: {email: 'ania@google.pl'},
    update: {
      updatedAt: new Date()
    },
    create: {
      email: `ania@google.pl`,
      name: 'Ania',
      skill: 'Android Developer',
      timezone: '+02:00'
    }
  });
  return [alice, bob, anna];
};

const createFilters = async () => {
  const alice = await prisma.user.findUnique({
    where: {email: 'alice@google.pl'},
    include: {
      filter: true
    }
  });

  if (!alice.filter) {
    await prisma.filter.create({
      data: {
        user: {
          connect: {
            id: alice.id
          }
        },
        sex: 'Male',
        ageFrom: '20',
        ageUpTo: '30'
      }
    });
  }
};

const createConversation = async (users) => {
  await prisma.conversation.create({
    data: {
      users: {
        create: [
          {
            user: {
              connect: {
                id: users[0].id
              }
            }
          },
          {
            user: {
              connect: {
                id: users[1].id
              }
            }
          }
        ]
      },
      messages: {
        create: [
          {
            content: 'Hi how are you?',
            user: {
              connect: {
                id: users[0].id
              }
            }
          },
          {
            content: 'Im fine thanks!',
            user: {
              connect: {
                id: users[1].id
              }
            }
          }
        ]
      }
    }
  });
};

const createConversations = async (mainUserId) => {
  let userIds = await prisma.user.findMany({
    where: {
      NOT: {id: mainUserId}
    },
    select: {id: true}
  });
  userIds = userIds.map((el) => el.id);

  const chats = [];
  for (let i = 0; i < 35; i++) {
    const randomId = userIds[Math.floor(Math.random() * userIds.length)];
    chats.push(
      prisma.conversation.create({
        data: {
          users: {
            create: [
              {
                user: {
                  connect: {
                    id: randomId
                  }
                }
              },
              {
                user: {
                  connect: {
                    id: mainUserId
                  }
                }
              }
            ]
          },
          messages: {
            create: [
              {
                content: 'Hi how are you?',
                user: {
                  connect: {
                    id: randomId
                  }
                }
              },
              {
                content: 'Im fine thanks!',
                user: {
                  connect: {
                    id: mainUserId
                  }
                }
              }
            ]
          }
        }
      })
    );
  }

  await Promise.all(chats);
};

async function main() {
  // await createUsers();
  // await createFilters();
  // const [bob, alice] = await createUsersToConversation();
  // await createConversation([bob, alice]);
  // await createConversations('clkgnp1a10000p3n2ygyp6xqh');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
