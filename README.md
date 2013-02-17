jquery-orgchart
===============

JQuery Organisation Chart Plugin

This is a small JQuery plugin that generates a hierarchical orginisational chart from a nested unordered list.

HTML/CSS purists likely would not be happy with this since it uses nested tables to achieve the layout. Nevertheless, it works pretty well and you can make nice looking interactive organisational charts with it quite easily.

This has been tested on Firefox and Chrome on Linux.

Simple Example
--------------

![Organisation Chart Demo](https://github.com/caprica/jquery-orgchart/raw/master/demo/simple.png "Simple Demo")

```
$("#organisation").orgChart({container: $("#main")});
```

In this example "#organisation" is the selector for the source list and the "container" option specifies the target container for the generated chart.

[Source for Simple Demo](https://github.com/caprica/jquery-orgchart/blob/master/demo/simple.html)

Simple Stacking Example
-----------------------

![Organisation Chart Stacking Demo](https://github.com/caprica/jquery-orgchart/raw/master/demo/simple-stacking.png "Simple Stacking Demo")

$("#organisation").orgChart({container: $("#main"), stack: true, depth: 2});

Building on the previous example, the "stack" option is added with a corresponding chart "depth" of "2". This means that the chart will display two levels before stacking any remaining levels in a single list.

[Source for Simple Stacking Demo](https://github.com/caprica/jquery-orgchart/blob/master/demo/simple-stacking.html)
