import Head from "next/head";
import Image from "next/image";

import { useState } from "react";
import { textToImageService } from "../text-to-image.service";
import Link from "next/link";
import Loading from "../components/loading";
import ResolutionPicker from "../components/resolution-picker";

export default function Home() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [resolution, setResolution] = useState<string>("1080");
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      prompt: { value: string };
      ai: { value: string };
    };
    const prompt = target.prompt.value;
    try {
      if (prompt.length > 0) {
        setLoading(true);
        const response = await textToImageService(prompt);
        console.log(response.image);
        setImgUrl(response.image);
        setId(response.id);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setImgUrl(
        "https://images.unsplash.com/photo-1580775702218-1f746c0c49b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
      );
    }
  };
  return (
    <>
      <Head>
        <title>Stable Diffusion Image Generator</title>
        <meta name="description" content="Devvitt ai tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="grid place-content-center h-screen font-sans">
        <section className="flex flex-col gap-4 items-center w-fit  bg-neutral-focus rounded-md py-10 px-10">
          <h1 className="text-4xl font-semibold text-accent">
            Stable Diffusion Image Generator
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-row justify-between items-end gap-2 w-full">
              <label
                htmlFor="prompt"
                className="relative text-primary-focus focus-within:text-primary-focus block w-full transition-all duration-300"
              >
                Describe your image
                <input
                  className="input input-bordered input-primary w-full pr-10"
                  name="prompt"
                />
              </label>
              <button type="reset" className="btn rounded-full">
                Clear
              </button>
              <button type="submit" className="btn btn-primary rounded-full">
                Generate
              </button>
            </div>
          </form>
          <div className="card bg-primary text-primary-content overflow-hidden relative">
            {loading ? (
              <Loading />
            ) : imgUrl ? (
              <>
                <Image
                  src={imgUrl}
                  alt="image-generated"
                  width={400}
                  height={400}
                  className="w-auto h-auto max-h-[400px]"
                />
                <ResolutionPicker value={resolution} setState={setResolution} />
                <Link
                  referrerPolicy="no-referrer"
                  target="_blank"
                  href={`/api/download/?imageId=${id}&resolution=${resolution}`}
                  className="btn btn-secondary rounded-none w-full"
                >
                  Download Image
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            Made by{" "}
            <a
              className="underline decoration-1"
              target="_blank"
              rel="noreferrer"
              href="https://devvitt-site.vercel.app/"
              aria-label="Devvitt's porfolio"
            >
              Devvitt
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
