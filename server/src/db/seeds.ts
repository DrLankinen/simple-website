import { connectDatabase } from "./index";
import faker from 'faker'

type Person = { id: number, name: String, shortBio: String }

const users: Person[] = Array.apply(null, Array(100)).map((_, index) => ({
  id: index,
  name: faker.name.findName(),
  shortBio: faker.company.catchPhrase()
}))

const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    db.users.clear();

    await users.forEach((user, index) => {
      db.users.create(user).save();
    });

    console.log("[seed] : success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
