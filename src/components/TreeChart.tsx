import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "../hooks/useResizeObserver";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function TreeChart({ data }) {
    const svgRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);
    const dimensions = useResizeObserver(wrapperRef);

    // we save data to see if it changed
    const previouslyRenderedData = usePrevious(data);

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);

        // use dimensions from useResizeObserver,
        // but use getBoundingClientRect on initial render
        // (dimensions are null for the first render)
        const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

        // transform hierarchical data
        const root = hierarchy(data);
        const treeLayout = tree().size([height, width]);

        const linkGenerator:any = linkHorizontal()
            .x((link:any) => link.y)
            .y((link:any) => link.x);

        // enrich hierarchical data with coordinates
        treeLayout(root);

        console.warn("descendants", root.descendants());
        console.warn("links", root.links());

        // nodes
        svg
            .selectAll(".node")
            .data(root.descendants())
            .join(enter => enter.append("circle").attr("opacity", 0))
            .attr("class", "node")
            .attr("cx", (node:any) => node.y)
            .attr("cy", (node:any) => node.x)
            .attr("r", 3)
            .attr("fill", "orange")
            .transition()
            .duration(500)
            .delay(node => node.depth * 300)
            .attr("opacity", 1);

        // links
        const enteringAndUpdatingLinks = svg
            .selectAll(".link")
            .data(root.links())
            .join("path")
            .attr("class", "link")
            .attr("d", linkGenerator)
            .attr("stroke-dasharray", function(this:any) {
                const length = this.getTotalLength();
                return `${length} ${length}`;
            })
            .attr("stroke", "white")
            .attr("fill", "none")
            .attr("opacity", 0.5);

        if (data !== previouslyRenderedData) {
            enteringAndUpdatingLinks
                .attr("stroke-dashoffset", function(this:any) {
                    return this.getTotalLength();
                })
                .transition()
                .duration(5000)
                .delay(link => link.source.depth * 500)
                .attr("stroke-dashoffset", 0);
        }

        // labels
        svg
            .selectAll(".label")
            .data(root.descendants())
            .join(enter => enter.append("text").attr("opacity", 0))
            .attr("class", "label")
            .attr("x", (node:any) => node.y-20)
            .attr("y", (node:any) => node.x - 12)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text(node => node.data.name)
            .transition()
            .duration(500)
            .delay(node => node.depth * 300)
            .attr("opacity", 1);
    }, [data, dimensions, previouslyRenderedData]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem",height:"500px"}} >
            <svg ref={svgRef}></svg>
        </div>
);
}

export default TreeChart;