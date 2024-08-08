/// <reference types="node" />

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "stargazer12@example.com",
    username: "stargazer12",
    password: "password123",
    name: "Stella Andrews",
    posts: {
      create: [
        {
          title: "Exploring the Mysteries of the Cosmos",
          slug: "exploring-mysteries-of-the-cosmos",
          description:
            "Dive into the wonders of the universe as we unravel secrets of galaxies far, far away.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          title:
            "The Quest for Extraterrestrial Intelligence: A Global Pursuit",
          slug: "quest-for-extraterrestrial-intelligence",
          description:
            "Join the global effort to find intelligent life beyond Earth. Are we alone in the universe?",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  },
  {
    email: "adventureseeker@example.com",
    username: "adventureseeker",
    password: "password123",
    name: "Maxwell Hunter",
    posts: {
      create: [
        {
          title: "Unveiling the Secrets of Ancient Civilizations",
          slug: "secrets-of-ancient-civilizations",
          description:
            "Travel back in time and uncover the hidden truths of ancient societies.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  },
  {
    email: "mysterysolver@example.com",
    username: "mysterysolver",
    password: "password123",
    name: "Elena Ramirez",
    posts: {
      create: [
        {
          title: "Unraveling the Enigma of Time Travel",
          slug: "enigma-of-time-travel",
          description:
            "Is time travel possible? Explore the theories and science behind moving through time.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  },
  {
    email: "explorer24@example.com",
    username: "explorer24",
    password: "password123",
    name: "Christopher Park",
    posts: {
      create: [
        {
          title: "Journey Through the Unknown: Tales from the Abyss",
          slug: "journey-through-the-abyss",
          description:
            "Embark on an adventure to the deepest parts of the ocean, where mysteries await.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  },
  {
    email: "kenchang@example.com",
    username: "techlover99",
    password: "password123",
    name: "Ken Chang",
    posts: {
      create: [
        {
          title: "The Rise of Virtual Reality: A New Era Dawns",
          slug: "rise-of-virtual-reality",
          description:
            "Step into the future with virtual reality. Discover its impact and potential.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  },
];

async function seed() {
  console.log(`Start seeding ...`);

  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log(`Seeding finished.`);
}

seed()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
