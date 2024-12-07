import type { IHighlight } from "react-pdf-highlighter";
import React from "react";
interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  onHighlightClick: (highlight: IHighlight) => void;
}

export function PDFHighlightsSidebar({ highlights, onHighlightClick }: Props) {
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => onHighlightClick(highlight)}
          >
            <div>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {highlight.content.text.length > 90
                    ? `${highlight.content.text.slice(0, 90).trim()}…`
                    : highlight.content.text.trim()}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}