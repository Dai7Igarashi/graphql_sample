import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "田中太郎",
    tweets: {
      create: [
        {
          content: "田中太郎のツイート1",
        },
        {
          content: "田中太郎の不正なツイート2",
        },
      ],
    },
  },
  {
    name: "山田次郎",
    tweets: {
      create: [
        {
          content: "山田次郎のツイート1",
        },
      ],
    },
  },
  {
    name: "佐藤三郎",
    tweets: {
      create: [
        {
          content: "佐藤三郎のツイート1",
        },
        {
          content: "佐藤三郎のツイート2",
        },
        {
          content: "佐藤三郎のツイート3",
        },
      ],
    },
  },
];

async function main() {
  for (const u of userData) {
    await prisma.user.create({
      data: u,
    });
  }

  const users = await prisma.user.findMany();
  const tweets = await prisma.tweet.findMany();

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < tweets.length; j++) {
      if (j % 2 === 0) continue;

      await prisma.comment.create({
        data: {
          content: `${users[i].name}から${tweets[j].content}へのコメント`,
          authorId: users[i].id,
          tweetId: tweets[j].id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
