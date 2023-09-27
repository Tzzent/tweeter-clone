import Bookmarks from "@/components/bookmarks/Bookmarks";
import PostFeed from "@/components/site/PostFeed";

export default function BookmarksPage() {
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
      <Bookmarks />
      <div
        className="
        col-span-2
        mt-3
        md:mt-0
        flex
        flex-col
        gap-5
        "
      >
        <PostFeed />
      </div>
    </div>
  )
}
