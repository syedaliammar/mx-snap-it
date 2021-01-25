import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { saveAs } from "file-saver";

const SnapIt = props => {
    const _exportToSVG = props => {
        htmlToImage
            .toSvg(document.getElementsByClassName(props.classNameToExport)[0])
            .then(function(dataUrl) {
                saveAs(dataUrl, props.exportFilename + ".svg");
            })
            .catch(function(error) {
                console.error("Something went wrong while generating the SVG", error);
            });
    };

    return (
        <div id="modebar">
            <button id="export_svg" title="Download chart as SVG" onClick={() => _exportToSVG(props)}>
                SVG
            </button>
        </div>
    );
};

export default hot(SnapIt);
