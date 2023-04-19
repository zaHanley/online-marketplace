import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type MessageForm = { content: string; listingId: string };

const ListingView: NextPage = () => {
  const router = useRouter();
  const user = useUser();

  const sendMessage = api.message.newMessage.useMutation();
  const listing = api.listings.get.useQuery(
    {
      listingId: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const item = listing.data;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-[#15162c]">
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item?.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item?.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            ${item?.price}
          </p>
          {user.isSignedIn && (
            <>
              <form
                className="flex flex-col gap-6"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit((formData: MessageForm) =>
                  sendMessage
                    .mutateAsync({
                      content: formData.content,
                      listingId: item?.id,
                    })
                    .then(() => reset())
                )}
              >
                <div>
                  <label
                    htmlFor="content"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message seller about {item?.name}
                  </label>
                  <textarea
                    id="content"
                    className="block w-full rounded-lg border border-gray-900"
                    {...register("content", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  className="mb-2 mr-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default ListingView;
