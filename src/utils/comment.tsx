import React from "react";

export const MAX_COMMENT_LENGTH = 500;

export const renderWithMentions = (text: string): React.ReactNode[] => {
  return text.split(/(\s+)/).map((word, index) => {
    if (word.startsWith("@")) {
      return (
        <strong key={index} className="text-violet800">
          {word}
        </strong>
      );
    }
    return word;
  });
};

export const extractMentionedNickname = (text: string): string => {
  const match = text.trim().match(/^@(\S+)/);
  return match ? match[1] : "";
};

export const removeMentionPrefix = (text: string): string =>
  text.replace(/^@\S+\s*/, "");

export const limitTextLength = (
  text: string,
  maxLength: number = MAX_COMMENT_LENGTH,
): string => {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
};
