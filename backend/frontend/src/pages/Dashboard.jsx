import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "../store/authStore";
const Dashboard = () => {
    const { authUser } = useAuthStore();
    const[urls,setUrls] = useState([]);
    const BASE_URL = "https://assignment-1-0omm.onrender.com";
    useEffect(() => {
      if (authUser?._id) {
      axios
        .get(`${BASE_URL}/api/userUrl`, { withCredentials: true })
        .then((res) => setUrls(res.data))
        .catch((err) => console.error("Failed to load URLs:", err));
    }
    },[authUser])
  return (
    <div className="min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard - Your URLs</h1>
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 text-center">Short Code</TableHead>
            <TableHead className="w-1/3 text-center">Long URL</TableHead>
            <TableHead className="w-1/3 text-center">Clicks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url._id}>
              <TableCell className="text-center font-medium">
                <a
                  href={`${BASE_URL}/r/${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {`${BASE_URL}/r/${url.shortCode}`}
                </a>
              </TableCell>
              <TableCell className="text-center text-muted-foreground">
                <a
                  href={url.longUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {url.longUrl.length > 50
                    ? url.longUrl.slice(0, 50) + "..."
                    : url.longUrl}
                </a>
              </TableCell>
              <TableCell className="text-center">{url.visits || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Dashboard
