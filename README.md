jquery-orgchart
===============

JQuery Organisation Chart Plugin

This is a small JQuery plugin that generates a hierarchical orginisational chart from a nested unordered list.

HTML/CSS purists likely would not be happy with this since it uses nested tables to achieve the layout. Nevertheless, it works pretty well and you can make nice looking interactive organisational charts with it quite easily.

This has been tested on Firefox and Chrome on Linux, and Firefox and Chrome on Windows. It also works on IE8, but due to the deficient CSS support in that broken browser the chart looks quite basic.

See [jquery-orgchart-plugin](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/index.html) for more information.

There are also some [live demos](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demos.html).

There is also an [advanced live demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/advanced/index.html)
showing Bootstrap integration and one approach to navigating an interactive chart.

Features
--------

 * HTML markup, including clickable hyperlinks, inside the chart nodes;
 * All attributes from the source list get baked into the corresponding chart nodes (e.g. you can annotate the nodes with your own "data" attributes);
 * Options to limit the chart to the desired number of levels, and show remaining levels in a single stack;
 * Options to copy CSS styles, classes, HTML data attributes and title attributes (useful for tooltips or external tooltip plugins) from the source list (all enabled by default);
 * Optional callback to handle clicked chart nodes;
 * Small size, only 3K minified (7K un-minified);
 * Easy to to change the appearance of the chart by overriding a small number of CSS style rules;
 * Does exactly what it says on the tin, no feature bloat!
 
Configuration Options
---------------------

`chartClass` (string) is used to specify a CSS class to add to the created chart.

`container` (jQuery element) specifies the element that will contain the chart.

`copyClasses` (boolean) specifies whether or not CSS classes should be copied from the source list to the associated chart nodes.

`copyData` (boolean) specifies whether or not data attribute values should be copied from the source list to the associated chart nodes.

`copyStyles` (boolean) specifies whether or not the CSS "style" attribute values should be copied from the source list to the associated chart nodes.

`copyTitle` (boolean) specifies whether or not the "title" attribute values should be copied from the source list to the associated chart nodes.

`depth` (integer) is used in conjunction with `stack` to configure at what level the stacking takes effect.

`fade` (boolean) is used to enable a fading animation when showing/hiding chart nodes.

`hoverClass` (string) is used to specify the CSS class that gets dynamically added to chart nodes on mouse-over.

`interactive` (boolean) is used to enable interactive chart features, like clicking to show/hide child nodes.

`levels` (integer) specifies how many levels deep in the source list are used to create the chart.

`nodeClicked` (function) callback function invoked when a chart node is clicked: the first parameter is the underlying node element; the second parameter is the visual component that was clicked (a jQuery object).

`nodeText` (function) callback function used to extract node text context.

`replace` (boolean) true if the chart container should be emptied before generating the chart.

`showLevels` (integer) specifies how many chart levels to show initially.

`speed` (jQuery speed) specifies the animation speed if `fade` is enabled.

`stack` (boolean) is used to enable stacking.
 
Simple Example
--------------

![Organisation Chart Demo](https://github.com/caprica/jquery-orgchart/raw/master/demo/simple.png "Simple Demo")

```
$("#organisation").orgChart({container: $("#main")});
```

In this example "#organisation" is the selector for the source list and the "container" option specifies the target container for the generated chart.

[Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo1.html)

[Source for Simple Demo](https://github.com/caprica/jquery-orgchart/blob/master/demo/simple.html)

Simple Stacking Example
-----------------------

![Organisation Chart Stacking Demo](https://github.com/caprica/jquery-orgchart/raw/master/demo/simple-stacking.png "Simple Stacking Demo")

```
$("#organisation").orgChart({container: $("#main"), stack: true, depth: 2});
```

Building on the previous example, the "stack" option is added with a corresponding chart "depth" of "2". This means that the chart will display two levels before stacking any remaining levels in a single list.

[Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo2.html)

[Source for Simple Stacking Demo](https://github.com/caprica/jquery-orgchart/blob/master/demo/simple-stacking.html)

Styling Levels Example
----------------------

![Organisation Chart Styling Levels Demo](https://github.com/caprica/jquery-orgchart/raw/master/demo/styling-levels.png "Styling Levels Demo")

```
$("#organisation").orgChart({container: $("#main")});
```

```
div.orgChart div.node.level1 {
    background-color: #fbcece;
}
div.orgChart div.node.level1.special {
    background-color: white;
}
div.orgChart div.node.level2 {
    background-color: #cefbce;
}
div.orgChart div.node.level3 {
    background-color: #e0cefb;
}
```

Each node in the chart automatically gets assigned a class for its level, this can be used to style each level individually.

Any classes that are specified on items in the source list get applied to the corresponding chart node, this can also be used to customise the style for a particular node or collection of nodes. In this example the main protagonist has his own unique background colour applied, overriding the colour for his level in the chart. The root of the chart has level zero.

[Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo5.html)

[Source for Styling Levels Demo](https://github.com/caprica/jquery-orgchart/blob/master/demo/styling-levels.html)

Eating Your Own Dog Food Example
--------------------------------

![Organisation Chart Dog Food Demo](https://github.com/caprica/jquery-orgchart/raw/master/demo/dogfood.png "Dog Food Demo")

```
$("#organisation").orgChart({container: $("#main")});
```

[Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo7.html)

[Source for Dog Food Demo](https://github.com/caprica/jquery-orgchart/blob/master/demo/dogfood.html)

Other Examples
--------------

[Simple Interactive Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo3.html)  
[Links Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo4.html)  
[On-Click Live Demo](http://www.capricasoftware.co.uk/legacy/projects/jquery-orgchart/demo6.html)
