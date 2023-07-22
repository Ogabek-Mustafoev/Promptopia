"use client";

import { Profile } from "@components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }
  async function handleDelete(post) {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      setPosts(await response.json());
    }
    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
