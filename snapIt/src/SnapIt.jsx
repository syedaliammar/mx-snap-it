import { Component, createElement, useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toSvg } from "html-to-image";
import Dropdown from "react-dropdown";
import { saveAs } from "file-saver";
import "react-dropdown/style.css";

const SnapIt = props => {
    const [dropdownOptions, setDropdownOptions] = useState(false);
    const [dropdownDisabled, setDropdownDisabled] = useState(false);

    useEffect(() => {
        let arr = [];
        if (props.allowPNG) arr.push("PNG");
        if (props.allowJPEG) arr.push("JPEG");
        if (props.allowSVG) arr.push("SVG");
        setDropdownOptions(arr);
    });

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

    const _exportToPNG = props => {
        htmlToImage
            .toPng(document.getElementsByClassName(props.classNameToExport)[0])
            .then(function(dataUrl) {
                saveAs(dataUrl, props.exportFilename + ".png");
            })
            .catch(function(error) {
                console.error("Something went wrong while generating the PNG", error);
            });
    };

    const _exportToJPEG = props => {
        htmlToImage
            .toJpeg(document.getElementsByClassName(props.classNameToExport)[0], { backgroundColor: "#FFFFFF" })
            .then(function(dataUrl) {
                saveAs(dataUrl, props.exportFilename + ".jpeg");
            })
            .catch(function(error) {
                console.error("Something went wrong while generating the PNG", error);
            });
    };

    const _onSelect = option => {
        setDropdownDisabled(true);
        switch (option.label) {
            case "PNG":
                _exportToPNG(props);
                break;
            case "JPEG":
                _exportToJPEG(props);
                break;
            case "SVG":
                _exportToSVG(props);
                break;
            default:
                break;
        }
        setDropdownDisabled(false);
    };

    return (
        <Dropdown
            options={dropdownOptions}
            onChange={_onSelect}
            placeholder="Export as..."
            disabled={dropdownDisabled}
        ></Dropdown>
    );
};

export default hot(SnapIt);
