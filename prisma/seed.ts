const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.characterCategory.createMany({
      data: [
    { name: "Business" },
    { name: "Sales" },
    { name: "CSR" },
    { name: "Analyst" },
    { name: "Tech" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();

