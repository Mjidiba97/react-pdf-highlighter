import React from "react";
import {
    PdfLoader,
    PdfHighlighter,
    Highlight,
    AreaHighlight
} from "react-pdf-highlighter";
import type { IHighlight } from "react-pdf-highlighter";
import { PDFLoadingSpinner } from "./PDFLoadingSpinner";

/** Renders the PDF document with highlights */
export function PDFViewer({
    url,
    highlights,
    scrollViewerTo
}: {
    url: string;
    highlights: Array<IHighlight>;
    scrollViewerTo: React.MutableRefObject<(highlight: IHighlight) => void>;
}) {
    return (
        <div style={{ height: "100vh", width: "75vw", position: "relative" }}>
            <PdfLoader url={url} beforeLoad={<PDFLoadingSpinner />}>
                {(pdfDocument) => (
                    <PdfHighlighter
                        pdfDocument={pdfDocument}
                        enableAreaSelection={(event) => event.altKey}
                        highlightTransform={(
                            highlight,
                            index,
                            setTip,
                            hideTip,
                            viewportToScaled,
                            screenshot,
                            isScrolledTo
                        ) => (
                            <Highlight
                                key={highlight.id}
                                isScrolledTo={isScrolledTo}
                                position={highlight.position}
                                comment={highlight.comment}
                            />
                        )}
                        onScrollChange={() => { }}
                        scrollRef={(scrollTo) => {
                            scrollViewerTo.current = scrollTo;
                        }}
                        onSelectionFinished={() => null}
                        highlights={highlights}
                    />
                )}
            </PdfLoader>
        </div>
    );
}
