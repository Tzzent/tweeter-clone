import UserHero from "@/components/username/UserHero";
import UserBio from "@/components/username/UserBio";
import Bookmarks from "@/components/bookmarks/Bookmarks";
import PostFeed from "@/components/site/PostFeed";

export default function UserPage() {
  return (
    <div
      className="
      grid
      grid-cols-3
      w-full
      mx-auto
      "
    >
      <div
        className="
        w-full
        flex
        flex-col
        items-center
        col-span-3
        "
      >
        <UserHero />
        <UserBio />
      </div>
      <div
        className="
        mt-3
        col-span-3
        w-full
        md:max-w-7xl
        md:mx-auto
        px-3
        grid
        lg:grid-cols-3
        gap-5
        "
      >
        <Bookmarks />
        <div
          className="
          lg:col-span-2
          "
        >
          <PostFeed />
        </div>
      </div>
    </div>
  )
}
