import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../store/authStore";
export default function ShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const BASE_URL = "https://assignment-1-0omm.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) return navigate("/signup");
    const res = await axios.post(
      `${BASE_URL}/api/shorten`,
      {
        longUrl,
      },
      { withCredentials: true }
    );
    setShortUrl(res.data.shortUrl);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        {/* Upper text */}
        <div className="text-4xl font-bold text-black text-center w-[600px]">
          Hi there this is an URL shortener — you can easily shorten your URLs
        </div>

        {/* Shortener box */}
        <div className="flex flex-col items-center justify-center h-[300px] w-[416px] border-2 border-black rounded-lg hover:shadow-2xl">
          <h1 className="text-3xl font-bold underline mb-6">URL Shortener</h1>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter long URL"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Shorten
            </Button>
          </form>

          {shortUrl && (
            <p className="mt-4">
              Shortened:{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {shortUrl}
              </a>
            </p>
          )}
        </div>
        {/* lower text */}
        <div className="text-4xl font-bold text-black text-center w-[600px]">
          Just enter your very Loooooooooong Url and see the magic happening
        </div>
      </div>
    </>
  );
}
