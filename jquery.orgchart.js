/**
 * JQuery Organisation Chart Plugin.
 *
 * Author: Mark Lee
 * Copyright (C)2013 Caprica Software Limited 
 * http://www.capricasoftware.co.uk
 * 
 * Contributions by: Paul Lautman <paul.lautman at gmail.com>
 *
 * This software is licensed under the Creative Commons Attribution-ShareAlike 3.0 License,
 * see here for license terms:
 *
 *     http://creativecommons.org/licenses/by-sa/3.0
 */
(function($) {

    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);

        return this.each(function() {
            $this = $(this).clone();
            if (opts.levels > -1) {
                $this.find("ul").andSelf().filter(function() {return $(this).parents("ul").length+1 > opts.levels;}).remove();
            }
            var $container = $("<div class='" + opts.chartClass + "'/>");
            if (opts.interactive) {
                $container.addClass("interactive");
            }
            if ($this.is("ul")) {
                buildNode($this.find("li:first"), $container, 0, opts);
            }
            // Special case for any hyperlink anchor in the chart to prevent the click on the node itself from propagating
            $container.find("div.node a").click(function(evt) {
                evt.stopImmediatePropagation();
            });
            opts.container.append($container);
        });
    };

    $.fn.orgChart.defaults = {
        container  : $("body"),
        depth      : -1,
        levels     : -1,
        showLevels : -1,
        stack      : false,
        chartClass : "orgChart",
        hoverClass : "hover",
        nodeText   : function($node) {return $node.clone().children("ul,li").remove().end().html()},
        interactive: false,
        fade       : false,
        speed      : "slow",
        nodeClicked: function($node) {},
        copyClasses: true
    };

    function buildNode($node, $appendTo, level, opts) {
        var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
        var $tbody = $("<tbody/>");

        // Make this node...
        var $nodeRow = $("<tr/>").addClass("nodes");
        var $nodeCell = $("<td/>").addClass("node").attr("colspan", 2);
        var $childNodes = $node.children("ul:first").children("li");
        if ($childNodes.length > 1) {
            $nodeCell.attr("colspan", $childNodes.length*2);
        }
        
        var $heading = $("<h2>").html(opts.nodeText($node));
        $nodeDiv = $("<div>").addClass("node").addClass("level"+level).data("orgchart-level", level).data("orgchart-node", $node).append($heading);

        // Copy classes from the source list to the chart node
        if (opts.copyClasses) {
            $nodeDiv.addClass($node.attr("class"));
        }

        $nodeCell.append($nodeDiv);
        $nodeRow.append($nodeCell);
        $tbody.append($nodeRow);

        $nodeDiv.click(function() {
            var $this = $(this);
            opts.nodeClicked($this.data("orgchart-node"));
            if (opts.interactive) {
                var $row = $this.closest("tr");
                if ($row.next("tr").is(":visible")) {
                    if (opts.fade) {
                        $row.nextAll("tr").fadeOut(opts.speed);
                    }
                    else {
                        $row.nextAll("tr").hide();
                    }
                    $this.removeClass("shownChildren").addClass("hiddenChildren");
                }
                else {
                    $this.removeClass("hiddenChildren").addClass("shownChildren");
                    if (opts.fade) {
                        $row.nextAll("tr").fadeIn(opts.speed);
                    }
                    else {
                        $row.nextAll("tr").show();
                    }
                }
            }
        });

        if ($childNodes.length > 0) {
            if (opts.depth == -1 || level+1 < opts.depth) {
                var $downLineRow = $("<tr/>").addClass("lines");
                var $downLineCell = $("<td/>").attr("colspan", $childNodes.length*2);
                $downLineRow.append($downLineCell);
        
                var $downLineTable = $("<table cellpadding='0' cellspacing='0' border='0'>");
                $downLineTable.append("<tbody>");
                var $downLineLine = $("<tr/>").addClass("lines x");
                var $downLeft = $("<td>").addClass("line left");
                var $downRight = $("<td>").addClass("line right");
                $downLineLine.append($downLeft).append($downRight);
                $downLineTable.children("tbody").append($downLineLine);
                $downLineCell.append($downLineTable);

                $tbody.append($downLineRow);
                
                if ($childNodes.length > 0) {
                    $nodeDiv.addClass("hasChildren");
                    if (opts.showLevels == -1 || level < opts.showLevels-1) {
                        $nodeDiv.addClass("shownChildren");
                    }
                    else {
                        $nodeDiv.addClass("hiddenChildren");
                    }
                    if (opts.interactive) {
                        $nodeDiv.hover(function() {$(this).addClass(opts.hoverClass);}, function() {$(this).removeClass(opts.hoverClass)});
                    }
                }
            
                // Recursively make child nodes...
                var $linesRow = $("<tr/>").addClass("lines v");
                $childNodes.each(function() {
                    var $left = $("<td/>").addClass("line left top");
                    var $right = $("<td/>").addClass("line right top");
                    $linesRow.append($left).append($right);
                });
                $linesRow.find("td:first").removeClass("top");
                $linesRow.find("td:last").removeClass("top");
                $tbody.append($linesRow);
                var $childNodesRow = $("<tr/>");
                $childNodes.each(function() {
                    var $td = $("<td/>");
                    $td.attr("colspan", 2);
                    buildNode($(this), $td, level+1, opts);
                    $childNodesRow.append($td);
                });
            }
            else if (opts.stack) {
                var $stackNodes = $childNodes.clone();
                var $list = $("<ul class='stack'>").append($stackNodes);
                $nodeDiv.after($list);
            }
            $tbody.append($childNodesRow);
        }

        if (opts.showLevels > -1 && level >= opts.showLevels-1) {
            $nodeRow.nextAll("tr").hide();
        }

        $table.append($tbody);
        $appendTo.append($table);
    };
    
})(jQuery);
