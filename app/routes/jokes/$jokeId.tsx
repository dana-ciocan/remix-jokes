import { json, useLoaderData, Link } from "remix";
import type { LoaderFunction } from "remix";
import type { Joke } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke | null };
export const loader: LoaderFunction = async ({ params }) => {
  const data: LoaderData = {
    joke: await db.joke.findUnique({
      where: { id: params.jokeId },
    }),
  };
  return json(data);
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();
  console.log(data);
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data?.joke?.content}</p>
      <Link to=".">{data?.joke?.name} Permalink</Link>
    </div>
  );
}
