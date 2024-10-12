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
    avatarURL:
      "https://res.cloudinary.com/dpqhn9i37/image/upload/v1728743143/avatar_stargazer_pnawm3.webp",
    bio: "I'm an astronomer and explorer of the cosmos. Stargazing fuels my curiosity, and I love sharing discoveries about the mysteries of the universe.",
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
    avatarURL:
      "https://res.cloudinary.com/dpqhn9i37/image/upload/v1728742116/avatar_adventureseeker_ztnrle.webp",
    bio: "I'm an adventurer and archaeologist on a quest to uncover ancient civilizations and reveal their secrets to the modern world.",
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
    avatarURL:
      "https://res.cloudinary.com/dpqhn9i37/image/upload/v1728743140/avatar_mysterysolver_cfjcc5.webp",
    bio: "I'm a researcher fascinated by the enigma of time travel. Exploring theories and pushing the boundaries of science keeps me curious.",
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
    avatarURL:
      "https://res.cloudinary.com/dpqhn9i37/image/upload/v1728743132/avatar_explorer24_stymdw.webp",
    bio: "I'm an explorer driven by a passion for uncovering the hidden mysteries of uncharted places. Every journey reveals something new, sparking my curiosity to delve even deeper into the unknown.",
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
    avatarURL:
      "https://res.cloudinary.com/dpqhn9i37/image/upload/v1728743146/avatar_techlover99_pkjzao.webp",
    bio: "I'm a tech enthusiast fascinated by the rise of virtual reality. I love experimenting with VR applications to see how they'll shape our future.",
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

const commentData: Prisma.CommentCreateInput[] = [
  {
    content:
      "This is truly inspiring, Stella! The universe is indeed vast and mysterious.",
    author: {
      connect: { username: "adventureseeker" },
    },
    post: { connect: { slug: "exploring-mysteries-of-the-cosmos" } },
  },
  {
    content: "I love your perspective on the cosmos. Can't wait to read more!",
    author: {
      connect: { username: "mysterysolver" },
    },
    post: { connect: { slug: "exploring-mysteries-of-the-cosmos" } },
  },
  {
    content:
      "Fascinating! I'm convinced we'll find something out there someday.",
    author: {
      connect: { username: "explorer24" },
    },
    post: {
      connect: { slug: "quest-for-extraterrestrial-intelligence" },
    },
  },
  {
    content:
      "The idea of making contact with extraterrestrial life is thrilling!",
    author: {
      connect: { username: "techlover99" },
    },
    post: {
      connect: { slug: "quest-for-extraterrestrial-intelligence" },
    },
  },
  {
    content:
      "Maxwell, your work always inspires me to explore the past. Keep it up!",
    author: {
      connect: { username: "stargazer12" },
    },
    post: {
      connect: { slug: "secrets-of-ancient-civilizations" },
    },
  },
  {
    content:
      "The ancient world holds so many secrets. I love reading about your discoveries.",
    author: {
      connect: { username: "mysterysolver" },
    },
    post: {
      connect: { slug: "secrets-of-ancient-civilizations" },
    },
  },
  {
    content: "Amazing! I'm looking forward to more of your adventures.",
    author: {
      connect: { username: "techlover99" },
    },
    post: {
      connect: { slug: "secrets-of-ancient-civilizations" },
    },
  },
  {
    content:
      "Time travel is such a mind-bending concept! Your post made me think.",
    author: {
      connect: { username: "adventureseeker" },
    },
    post: { connect: { slug: "enigma-of-time-travel" } },
  },
  {
    content: "I love how you delve into such complex topics. Keep exploring!",
    author: {
      connect: { username: "stargazer12" },
    },
    post: { connect: { slug: "enigma-of-time-travel" } },
  },
  {
    content:
      "Your insights into time travel are incredible. Can't wait to see what you explore next!",
    author: {
      connect: { username: "techlover99" },
    },
    post: { connect: { slug: "enigma-of-time-travel" } },
  },
  {
    content: "Your ocean adventures are always so thrilling, Christopher!",
    author: {
      connect: { username: "mysterysolver" },
    },
    post: {
      connect: { slug: "journey-through-the-abyss" },
    },
  },
  {
    content:
      "The ocean is such a mysterious place. I love reading your stories.",
    author: {
      connect: { username: "stargazer12" },
    },
    post: {
      connect: { slug: "journey-through-the-abyss" },
    },
  },
  {
    content:
      "Amazing dive! I can't wait to hear more about your underwater explorations.",
    author: {
      connect: { username: "adventureseeker" },
    },
    post: {
      connect: { slug: "journey-through-the-abyss" },
    },
  },
  {
    content:
      "Ken, your insights on VR are spot on! This technology is indeed transformative.",
    author: {
      connect: { username: "explorer24" },
    },
    post: {
      connect: { slug: "rise-of-virtual-reality" },
    },
  },
  {
    content:
      "Virtual reality is the future! Loved reading your thoughts on this.",
    author: {
      connect: { username: "mysterysolver" },
    },
    post: {
      connect: { slug: "rise-of-virtual-reality" },
    },
  },
  {
    content: "I completely agree, VR is changing everything. Great post!",
    author: {
      connect: { username: "stargazer12" },
    },
    post: {
      connect: { slug: "rise-of-virtual-reality" },
    },
  },
  {
    content: "I'm excited to see where VR takes us next. Thanks for sharing!",
    author: {
      connect: { username: "adventureseeker" },
    },
    post: {
      connect: { slug: "rise-of-virtual-reality" },
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

  for (const comment of commentData) {
    await prisma.comment.create({
      data: comment,
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
