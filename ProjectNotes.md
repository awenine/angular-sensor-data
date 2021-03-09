## Overview

The application rendered the given data in tabular form, allowing for the user to sort the data by both time and sensor type, and including pagination. It also displays a line graph of an individual sensor (selected via the 'id' property of the data), filtering the readings for that sensor and displaying the type of data and unit of measurement along the y axis of the graph.

## Tech Stack / Libraries

The application is built in Angular 9 and uses the Material UI Components for the title bar and table, as they are reliable and come scaffolded when generated with the CLI. The graph is utilising the d3 data visualisation library (https://d3js.org/), which is well-documented and customisable. It also contains date parsing whcih was used for the ticks on the x axis.

## Future Improvements

- Currently the table takes some time to load the data (due to its size) so that should be improved (possibly by only loading a subset of the data at a time).
- The row in the table representing the currently selected box (as displayed in the graph) should maintain some visual feedback indicating its selection (ie highlighting)
- The graph itself could show multiple lines for comparison; to avoid a 'spaghetti' graph the previously selected 2-3 boxes could be shown in a less saturated colour.
- selection via the graph (some sort of click and drag highlighting function) could display a shorter time range.
- page could be layed out responsively to account for different screen dimensions, possibly placing the table and graph side by side on desktop/landscape views.
