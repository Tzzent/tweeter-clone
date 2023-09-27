import Layout from "@/components/layout/Layout";
import Form from "@/components/site/Form";
import PostFeed from "@/components/site/PostFeed";
import Trends4u from "@/components/site/Trends4u";
import WhoToFollow from "@/components/site/WhoToFollow";

export default function HomePage() {
  return (
    <div
      className="
      grid
      grid-cols-3
      gap-5
      w-full
      max-w-7xl
      mx-auto
      mt-5
      "
    >
      <div
        className="
        px-3
        flex
        flex-col
        gap-5
        col-span-3
        lg:col-span-2
        "
      >
        <Form />
        <PostFeed />
      </div>
      <div
        className="
        flex
        flex-col
        gap-5
        px-3
        col-span-3
        lg:col-span-1
        "
      >
        <Trends4u />
        <WhoToFollow />
      </div>
    </div>
  )
}
