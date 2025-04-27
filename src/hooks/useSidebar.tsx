'use client'

import { useState } from "react";

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return {isOpen, setIsOpen};
}
