"use client";
import Towers from "../components/Towers";
import PageTitle from "@/components/PageTitle";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    document.title = "The Towers";
    router.push("/towers");
  }, []);
  return (
    <main className="flex flex-col py-10  justify-center">
      <PageTitle title="The Towers." />
      <div className="">
        <Towers />
      </div>
    </main>
  );
}
