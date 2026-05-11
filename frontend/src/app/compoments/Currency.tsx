"use client";
import { useEffect, useState } from "react";

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};

const Currency = ({ value }: { value: number }) => {
  const isClient = useIsClient();
  return <>{isClient ? value.toLocaleString("vi-VN") : value}đ</>;
};

export default Currency;
