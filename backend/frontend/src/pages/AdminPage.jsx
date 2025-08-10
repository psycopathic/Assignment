import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function AdminPage() {
  const [urls, setUrls] = useState([]);
  const BASE_URL = "http://localhost:5000";
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/urls`, { withCredentials: true })
      .then((res) => {
        setUrls(res.data);
      })
      .catch((err) => {
        console.error(
          "Error fetching URLs:",
          err.response?.data || err.message
        );
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-4">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-center">Short Code</TableHead>
            <TableHead className="w-1/3 text-center">Long Url</TableHead>
            <TableHead className="w-1/3 text-center">Click</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url._id}>
              <TableCell className="w-1/3 text-center font-medium">
                <a
                  href={`${BASE_URL}/r/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {`${BASE_URL}/r/${url.shortCode}`}
                </a>
              </TableCell>
              <TableCell className="w-1/3 text-center text-muted-foreground">
                {url.longUrl.length > 50 ? (
                  <a
                    href={url.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.longUrl.slice(0, 50) + "..."}
                  </a>
                ) : (
                  <a
                    href={url.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.longUrl}
                  </a>
                )}
              </TableCell>
              <TableCell className="w-1/3 text-center">{url.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
