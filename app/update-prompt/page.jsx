"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@components";

export default function EditPrompt() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const promtId = useSearchParams().get("id");

  async function updatePrompt(e) {
    e.preventDefault();
    setSubmitting(true);

    if (!promtId) return alert("Prompt ID not found!");

    try {
      const response = await fetch(`/api/prompt/${promtId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      response.ok && router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    async function getPromptDetails() {
      const response = await fetch(`/api/prompt/${promtId}`);
      const { prompt, tag } = await response.json();

      setPost({ prompt, tag });
    }
    promtId && getPromptDetails();
  }, [promtId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}
