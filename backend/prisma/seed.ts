/// <reference types="node" />

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "stargazer12@example.com",
    username: "stargazer12",
    password: "password123",
    firstName: "Stella",
    lastName: "Andrews",
    posts: {
      create: [
        {
          title: "Exploring the Mysteries of the Cosmos",
          slug: "exploring-mysteries-of-the-cosmos",
          description:
            "Dive into the wonders of the universe as we unravel secrets of galaxies far, far away.",
          content:
            "Looking through my telescope last night, I was once again struck by the sheer vastness of the universe. As I focused on a distant nebula, I couldn't help but marvel at how small we are compared to the stars. There's something about the unknown that's both humbling and inspiring. Every time I observe the cosmos, I'm reminded that we've barely scratched the surface in understanding the universe's secrets. I can't wait to keep exploring, one galaxy at a time.",
        },
        {
          title:
            "The Quest for Extraterrestrial Intelligence: A Global Pursuit",
          slug: "quest-for-extraterrestrial-intelligence",
          description:
            "Join the global effort to find intelligent life beyond Earth. Are we alone in the universe?",
          content:
            "For years, I've been fascinated by the question: Are we alone? As part of a global network of scientists searching for extraterrestrial intelligence, I've spent countless hours listening to signals from space. Some days, I wonder if we'll ever find that elusive signal — but it's the possibility that keeps me going. The universe is too vast for us to be the only intelligent life forms, and I believe that one day, we will make contact. Until then, I'll keep listening.",
        },
      ],
    },
  },
  {
    email: "adventureseeker@example.com",
    username: "adventureseeker",
    password: "password123",
    firstName: "Maxwell",
    lastName: "Hunter",
    posts: {
      create: [
        {
          title: "Unveiling the Secrets of Ancient Civilizations",
          slug: "secrets-of-ancient-civilizations",
          description:
            "Travel back in time and uncover the hidden truths of ancient societies.",
          content:
            "There's something exhilarating about uncovering the past. On my recent expedition, I stood before ancient ruins that hadn't been touched for centuries. As I carefully brushed away the dirt, intricate carvings began to reveal themselves, telling the story of a forgotten people. It felt surreal, knowing that I was connecting with a civilization that had long since disappeared. Each discovery pushes me to dig deeper, and I can't wait to see what more history has hidden from us.",
        },
      ],
    },
  },
  {
    email: "mysterysolver@example.com",
    username: "mysterysolver",
    password: "password123",
    firstName: "Elena",
    lastName: "Ramirez",
    posts: {
      create: [
        {
          title: "Unraveling the Enigma of Time Travel",
          slug: "enigma-of-time-travel",
          description:
            "Is time travel possible? Explore the theories and science behind moving through time.",
          content:
            "Time travel has always fascinated me — the idea that we could move through time and witness the past or the future is beyond thrilling. Recently, I've been diving into the science behind it, reading every theory I can get my hands on. While it may still be impossible according to today's laws of physics, I can't help but dream of the day we make it a reality. Could you imagine the stories we'd learn from the past, or the mysteries the future holds?",
        },
      ],
    },
  },
  {
    email: "explorer24@example.com",
    username: "explorer24",
    password: "password123",
    firstName: "Christopher",
    lastName: "Park",
    posts: {
      create: [
        {
          title: "Journey Through the Unknown: Tales from the Abyss",
          slug: "journey-through-the-abyss",
          description:
            "Embark on an adventure to the deepest parts of the ocean, where mysteries await.",
          content:
            "Descending into the abyss is like stepping into another world. The deeper I go, the more alien the surroundings become. There's something both terrifying and captivating about the deep ocean — a place that's closer than space, yet still holds so many unknowns. During my latest dive, I encountered creatures I'd only seen in documentaries, and it reminded me just how vast and mysterious our own planet is. The ocean still has stories to tell, and I'm determined to uncover them.",
        },
      ],
    },
  },
  {
    email: "kenchang@example.com",
    username: "techlover99",
    password: "password123",
    firstName: "Ken",
    lastName: "Chang",
    posts: {
      create: [
        {
          title: "The Rise of Virtual Reality: A New Era Dawns",
          slug: "rise-of-virtual-reality",
          description:
            "Step into the future with virtual reality. Discover its impact and potential.",
          content:
            "Virtual reality has completely changed the way I experience the world. From exploring distant planets to reliving historical events, VR has made the impossible possible. It's not just for entertainment — VR has opened up new possibilities in education, healthcare, and even social interactions. The technology is still evolving, but I can already see how it's going to shape the future. I've been experimenting with different applications, and I'm excited to see where this new era of VR will take us.",
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
