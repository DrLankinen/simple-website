import { connectDatabase } from "./index";
import faker from 'faker';

interface User {
  id: number;
  name: string;
  shortBio: string;
  imageUrl: string;
}

const users: User[] = Array.apply(null, Array(100)).map((_, index: number) => ({
  id: index,
  name: faker.name.findName(),
  shortBio: faker.company.catchPhrase(),
  imageUrl: faker.image.avatar()
}));

const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    db.users.clear();

    await users.forEach(user => {
      db.users.create(user).save();
    });

    console.log("[seed] : success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
