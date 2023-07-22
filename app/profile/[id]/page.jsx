"use client";

import { Profile } from "@components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile({ params }) {
  const userName = useSearchParams().get("name");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    }
    params?.id && fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination!`}
      data={userPosts}
    />
  );
}
