import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { saveAs } from "file-saver";

const SnapIt = props => {
    const { classNameToExport, exportFileName } = props;

    const _exportToSVG = elementToExport => {
        htmlToImage
            .toSvg(elementToExport)
            .then(function(dataUrl) {
                saveAs(dataUrl, exportFileName + ".svg");
            })
            .catch(function(error) {
                console.error("Something went wrong while generating the SVG", error);
            });
    };

    return (
        <div id="modebar">
            <button
                id="export_org_svg"
                title="Download chart as SVG"
                onClick={() => _exportToSVG(document.getElementsByClassName("mx-name-" + classNameToExport)[0])}
            >
                SVG
            </button>
        </div>
    );
};

export default hot(SnapIt);
