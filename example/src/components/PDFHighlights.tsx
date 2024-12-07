import React, { useState, useRef, useCallback } from "react";
import { PDFHighlightsSidebar } from "./PDFHighlightsSidebar";
import { PDFViewer } from "./PDFViewer";
import type { IHighlight } from "react-pdf-highlighter";
import "react-pdf-highlighter/dist/style.css";

import "../styles/App.css";

interface PDFHighlightsProps {
    url: string;
    highlights: Array<Omit<IHighlight, 'id' | 'comment'>>;
}

/** Component to render PDF with highlights and sidebar */
export function PDFHighlights({ url, highlights }: PDFHighlightsProps) {
    const [processedHighlights, setProcessedHighlights] = useState<Array<IHighlight>>(
        () =>
            highlights.map((highlight, index) => ({
                ...highlight,
                id: `highlight-${index}`,
                comment: { text: "", emoji: "" }
            }))
    );

    const scrollViewerTo = useRef<(highlight: IHighlight) => void>(() => { });

    const scrollToHighlight = useCallback((highlight: IHighlight) => {
        scrollViewerTo.current(highlight);
    }, []);

    const resetHighlights = () => setProcessedHighlights([]);

    return (
        <div className="App" style={{ display: "flex", height: "100vh" }}>
            <PDFHighlightsSidebar
                highlights={processedHighlights}
                resetHighlights={resetHighlights}
                onHighlightClick={scrollToHighlight}
            />
            <PDFViewer
                url={url}
                highlights={processedHighlights}
                scrollViewerTo={scrollViewerTo}
            />
        </div>
    );
}