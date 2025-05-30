import React from "react";

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
