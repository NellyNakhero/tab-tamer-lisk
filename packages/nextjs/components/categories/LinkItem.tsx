"use client";

import React from "react";
import { LinkItem as LinkType } from "~~/types/link";

// Import from the new file

interface Props {
  link: LinkType;
}

const LinkItem: React.FC<Props> = ({ link }) => {
  return (
    <li>
      <a href={link.url} target="_blank" rel="noreferrer" className="link link-primary">
        {link.title || link.url}
      </a>
    </li>
  );
};

export default LinkItem;
