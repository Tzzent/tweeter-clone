import Card from "@/components/Card";
import ExploreBar from "@/components/explore/ExploreBar";
import InputSearch from "@/components/explore/InputSearch";
import PostFeed from "@/components/site/PostFeed";

export default function ExplorePage() {
  return (
    <div
      className="
      w-full
      max-w-7xl
      mx-auto
      mt-5
      px-3
      grid
      grid-cols-1
      md:gap-5
      md:grid-cols-3
      "
    >
      <ExploreBar />
      <div
        className="
        mt-3
        md:mt-0
        col-span-2
        flex
        flex-col
        gap-5
        "
      >
        <InputSearch />
        <PostFeed />
      </div>
    </div>
  )
}
