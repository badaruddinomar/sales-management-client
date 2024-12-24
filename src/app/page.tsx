"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import React from "react";
const Home = () => {
  return <Button className="m-5">Hello World</Button>;
};

export default ProtectedRoute(Home, ["user", "admin"]);
