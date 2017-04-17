---
title: Components (React)
---

These are the [React](React) components, that make up the
part of the app that is visible in the browser.
They lean on the [dux](Dux) that work for them in the background.

Click on the names in the titles to view their source code on Github.

[main]({{site.appBase}}/main.jsx)
=============================================================================================
connected via [root](Dux#root)

Entry point of the client side app.
Contains the [routing](Routing), wrapped in a [Root](#root) component, that
sets up the store in which the central state lives.

[Alternative]({{site.appBase}}/state/Alternative.jsx)
=============================================================================================
connected via [alter](Dux#alter)

Displays one of a list of alternatives and
let the user cycle through the alternatives.

Handy for:
* show/hide a component: pass as alternatives: `[component, <div>]`
* view alternative representations of a resource, e.g.
```jsx
[
   <div>{MarkDownSource}</div>,
   <div>{FormattedDoc}</div>
]
```

The state maintains the number of the currently chosen alternative.

#### Props
###### `tag` string
An extra identification, to distinguish this instance of the component from others.
The current alternative is saved to the state under this key.

###### `alt` integer from [`getAlt`](Dux#getalt)
The currently chosen alternative.

###### `alternatives` array of fragments
A list of fragments to choose from.
These fragments are referred to later by their index in this array.

###### `controls` array of fragments
A list of fragments that contain controls by which the user can go to
the next alternative. The *i*-th control will be displayed together
with the *i*-th alternative.

Every individual control must be given as a function `handler => fragment`.
When the controls are placed, the control functions will be passed the
`nextAlt` callback,
which will handle the clicks on the controls.

###### `controlPlacement` function
Puts each control and alternative combination in place.
In this way the caller can fine tune how exactly the control appears in relation to
the alternative component.

###### `initial` number 
The index of the initial alternative.

[App]({{site.appBase}}/state/App.jsx)
=============================================================================================
connected via [win](Dux#win)


As far as the logic of the web page is concerned, this is the top level component.

`App` is always in view and consists of the
* top navigation bar (with logo, [Login](#login), and [Notification](#notification))
* right navigation bar (with navigation links to the components of the app
  and documentation).

#### Props
###### `height`, `width`, number from [getWinDim](Dux#getwindim)
The height and width of the main window.
It is only used to display the height and the width somewhere on the screen.

[Backoffice]({{site.appBase}}/pure/Backoffice.jsx)
=============================================================================================
presents [tables](Dux#tables)

Gives access to backoffice functions, i.e. management of tables that support the business logic of the app.

A lot has to be implemented here.

[ByValue]({{site.appBase}}/state/ByValue.jsx)
=============================================================================================
connected via [filter](Dux#filter)

A widget by which the user can click the [facet](#facet)s associated with one field.
There is also a [collective checkbox](#checkboxi), by which the user can check or uncheck all facets in one go.
All values that occur are displayed, with statistics in the form *subtotal of total*.

#### Props
###### `table` string
The name of the table that is filtered.

###### `filterId` integer
The id (array index) of the filter in question.

###### `filterLabel` string
A label to be displayed on the interface.

###### `fieldValues` object from [getFieldValues](Dux#getfieldvalues)
A mapping of ids to values, for all values that this field has in this table.

###### `filteredAmount` number, `filteredAmountOthers` object, `amounts` object
The results of [applying](Dux#getfiltersapplied) the filter.

###### `maxCols` number
The maximum number of rows in which the facets have to be stacked.

###### `expanded` bool
Whether the facets should be expanded or collapsed (hidden).

## Note on performance
There is a subtlety here.
When we have the facets, we want to lay them out in a grid.
That work needs only be done upon construction,
and not for state updates in response to user
events on the filters.
So we want to do the grid computation
[placeFacets](Filter#placefacets)
once, in an initialization stage, e.g. in the
[constructor()](React#constructor) the component.
But it turns out that for the visual performance it does not matter.

This is the virtue of React: the code for rendering just constructs a
[Fragment](React#fragment), not the real [DOM](React#dom).
The computation inside [placeFacets](Filter#placefacets)
is just a little bit of juggling with tiny datastructures, so the fragment is constructed in no time.
See [Reconciliation](React#reconciliation).

[CheckboxI]({{site.appBase}}/object/CheckboxI.jsx)
=============================================================================================
(life cycle) connected via [filter](Dux#filter)

Displays a *collective* checkbox for a [facet filter](#ByValue) with many facets.

Clicking on this box will collectively check and uncheck all associate
checkboxes.

#### Props
###### `filterSetting` object from [getFilterSetting](Dux#getfiltersetting)
The checked states of all associated individual facets.

###### `handle` function is [changeFacetAll](Dux#changefacetall)
A callback to be invoked upon clicking the checkbox.

This checkbox can have an indeterminate state, if some but not all
of the associate checkboxes are checked.

We have to resort to a [DOM](React#dom) manipulation after rendering to get the
indeterminate state across.

[Doc]({{site.appBase}}/pure/Doc.jsx)
=============================================================================================
presents [doc](Dux#doc)

Handles the display of documents.
Depending on the type of document (markdown, html, pdf) it delegates work
to specialized document components: [DocMd](#docmd), [DocHtml](#dochtml) and
[DocPdf](#docpdf).

#### Props
###### `location` object
From this object the property `pathname` will be read, which will be split
into directory, file and extension parts.
The extension is used to switch to the component for that type of documents.

[DocHtml]({{site.appBase}}/pure/DocHtml.jsx)
=============================================================================================
presents [doc](Dux#doc)

Displays an HTML document by linking to it in an IFRAME.

#### Props
###### `docDir`, `docName`, `docExt` string
The directory, filename and extension of the document container.

[DocMd]({{site.appBase}}/object/DocMd.jsx)
=============================================================================================
(life cycle) connected via [doc](Dux#doc)

Component to show
[MarkDown](https://guides.github.com/features/mastering-markdown/)
text, coming from files on the server.
The conversion to HTML is done client side,
and the user gets a control to switch between MarkDown source and
formatted HTML.

#### Props
###### `docName` string
The name of the document.

###### `text` string from [getDoc](Dux#getdoc)
The raw content of the document.

###### `fetch` function is [fetchDoc](Dux#fetchdoc)
Method to fetch the data from the server if needed.

A function `RouterLink` is defined to wrap local links into `Link` components
when transforming the markdown to html.
It makes it possible to write MarkDown documents with
internal links to this application.

A full link (with protocol `http`(`s`) is translated to a
plain HTML `a` element, so clicking it will leave this application.

[DocPdf]({{site.appBase}}/pure/DocPdf.jsx)
=============================================================================================
presents [doc](Dux#doc)

Displays a PDF document by linking to it in an OBJECT.

**NB:** On iOS this does not work well, only the first page of the PDF gets shown,
we work around it by just displaying a link to open the PDF in a new tab.
We only do that when we detect an iOS browser.

###### `docDir`, `docName`, `docExt` string
The directory, filename and extension of the document container.

[EUMap]({{site.appBase}}/object/EUMap.jsx)
=============================================================================================
(life cycle) connected via [filter](Dux#filter)

A complex component!
It is a facet filter for the field *country*, using [ByValue](#byvalue) for that.
It also contains a map of Europe, visualizing by means of markers,
how the filter result is distributed over the DARIAH countries.

#### Props
The same props as [ByValue](#byvalue) plus:

###### `tables` object from [getTables](Dux#gettables)
Access to all fetched tables, of which only the *country* table is used here.

Both ingredients of this component are brought together not by
class extension but by *functional composition*.

The map is a [Leaflet](http://leafletjs.com) module on a blank pane,
with a [geojson]({{site.libBase}}/europe.geo.js) file of country boundaries laid out on it.
The map is not react aware, it will be rendered in its own div.
The [lifecycle](React#life-cycle) methods of this component set up the map and update when new filter settings have been applied.

## Compute Marker Radius

When we know the filter results per country, we can put markers on them
with a radius in proportion to their scores.
However, if the scores are very far apart, either the small markers get invisible,
or the big markers get too big.
We mitigate this effect, by using proportional radii only for values below a certain
threshold (`LEVEL_OFF`). For higher values we essentiall take the square root.

[Facet]({{site.appBase}}/state/Facet.jsx)
=============================================================================================
connected via [filter](Dux#filter)

Displays a single facet. Just a checkbox and a value representation.
The clicks received by the checkbox are passed upwards by means of a callback.

#### Props
###### `table` string
The name of the table that is filtered.

###### `filterId` integer
The id (array index) of the filter in question.

###### `valueId` string
The id of the value that is associated to this facet.

###### `valueRep` string
The string representation of the value that is associated to this facet.

###### `filterSetting` bool from [getFilterSetting](Dux#getfiltersetting)
Whether the facet is checked or not.

###### `handle` function is [changeFacet](Dux#changefacet)
Callback to be invoked when the facet is clicked.

Note that we use the strategy of [controlled components](React#controlled-component) here.

[Filter]({{site.appBase}}/state/Filter.jsx)
=============================================================================================
connected via [filter](Dux#filter)


A control to filter a list of items.
The following types of filters are implemented.
* [FullText](#fulltext): Search in a textual field for a pattern.
  The pattern is entered by the user,
  the search is incremental, after each keystroke the results are updated.
* [ByValue](#byvalue): Faceted search for values of a specific field.
  * [EUMap](#eumap): Faceted search on country, together with a map visualization

The list of the available filter types and their characteristics are not
configured on the client, but come from the server.

This generic component merely calls the specialized filter components
with the right props for each filter associated with a table.
Whereas the incoming props contain information for all filters,
each individual specialized filter is passed only the slice that is relevant to 
that one filter.

#### Props
###### `table` string
The name of the table that is filtered.

###### `fields`, `filterList` object from [getTableFilters](Dux#gettablefilters)
Information about the fields and their filters.
This information comes from the [tables](Dux#tables) part of the state.

###### `filteredAmount` object, `filteredAmountOthers` object, `amounts` object
The results of [applying](Dux#getfiltersapplied) the filters.

[FilterCompute]({{site.appBase}}/object/FilterCompute.jsx)
=============================================================================================
(life cycle) connected via [filter](Dux#filter)

Parent component of a table and all its filters.
The table must be present.
Fetching tables is done by other components, such as
[ItemFiltered](#ItemFiltered).
This component is for processing user interaction on the filters.
The filters and the list of filtered items are shown in separate
[Pane](#pane)s.

#### Props
###### `filteredAmount` object, `filteredAmountOthers` object, `amounts` object from [getFiltersApplied](Dux#getfiltersapplied)
The results of [applying](Dux#getfiltersapplied) the filters.

###### `initialized` bool
Whether the filters have been initialized.

###### `init` function is [setupFiltering](Dux#setupfiltering)
Callback to initialize filtering.

[FullText]({{site.appBase}}/state/FullText.jsx)
=============================================================================================
connected via [filter](Dux#filter)

Displays a full text search input field.
The characters entered in this field are passed upwards by means of a callback.
This is incremental search.
Not only the full text search, but also all other filters are computed upon each character entered.

#### Props
###### `table` string
The name of the table that is filtered.

###### `filterId` integer
The id (array index) of the filter in question.

###### `filterField` string
The name of the field being filtered.

###### `filterLabel` string
A label to be displayed on the interface.

###### `filterSetting` string from [getFilterSetting](Dux#getfiltersetting)
The current value of the search string.

###### `handle` function is [changeFulltext](Dux#changefulltext)
Callback to be invoked when the user is typing the search string.

Note that we use the strategy of [controlled components](React#controlled-component) here.

[ItemField]({{site.appBase}}/state/ItemField.jsx)
=============================================================================================
connected via [tables](Dux#tables)

Manages the display and editing of a single field.

#### Props
###### `tables` object from [getTables](Dux#gettables)
Where all information that has been fetched into tables can be found.

###### `table` string
The name of the table in question.

###### `label` string
A label to be displayed on the interface.

###### `values` any
The value of the field. It can be anything, a string or number or date, an object,
or an array of multiple such things.

###### `valType` string or object
Information about the type of the value.
Either a string with the type, such as `string` or `datetime`, or an object that
contains the name of the related table where the value can be found.

###### `multiple` bool
Whether the multiple values are allowed or just a single value.

[ItemFiltered]({{site.appBase}}/object/ItemFiltered.jsx)
=============================================================================================
(life cycle) connected via [tables](Dux#tables)

Manages a table. Responsible for fetching data from the server.
The display of the (filtered) table is left to other components,
such as [FilterCompute](#filtercompute).

#### Props
###### `tables` object from [getTables](Dux#gettables)
Where all information that has been fetched into tables can be found.

###### `table` string
The name of the table in question.

###### `fetch` function is [fetchTable](Dux#fetchtable)
Callback to fetch table data and metadata from the server.

[ItemHead]({{site.appBase}}/pure/ItemHead.jsx)
=============================================================================================
presents [tables](Dux#tables)

Displays an item heading in a table row.
With a control to view the whole records.
Only the fields that the user is allowed to view.

#### Props
###### `table` string
The name of the table in question.

###### `values` object
All available field content.

###### `title` string
The name of the field that will be used as the *title* of the record.

###### `inplace` bool
Whether the title can be expanded to the full record by the user.

**N.B** No item fetching will be done if `inplace == false` or if the
records are not expanded. But if you set the initial alternative to expanded, all
records will be fetched one by one, which is hugely inefficient!

[ItemList]({{site.appBase}}/state/ItemList.jsx)
=============================================================================================
connected via [tables](Dux#tables)

Displays a list of items from a table.
If filters are active on that table, this component is meant to just display the
filtered items.

#### Props
###### `tables` object from [getTables](Dux#gettables)
Where all information that has been fetched into tables can be found.

###### `table` string
The name of the table in question.

###### `title` string
The name of the field that will be used as the *title* of the record.

###### `filteredData` array
The list of ids of the records to be shown.
The full information of the records will be looked up from `tables` in the state.

###### `inplace` bool
Whether the title can be expanded to the full record by the user.

[ItemMy]({{site.appBase}}/object/ItemMy.jsx)
=============================================================================================
(life cycle) connected via [tables](Dux#tables)

Displays the list of items of the current user in the left [Pane](#pane),
with a details/edit view in the right one.

#### Props
###### `tables` object from [getTables](Dux#gettables)
Where all information that has been fetched into tables can be found.

###### `table` string
The name of the table in question.

**NB:** The `table` prop is not directly present in `props` but in the `params` member of `props`.

###### `fetch` function is [fetchTable](Dux#fetchtable)
Callback to fetch table data and metadata from the server.

This component is very much like [ItemFiltered](#itemfiltered) as far a data fetching is concerned. It has the virtually the same props.
 
The main differences are that there is no filtering, and the list of records is
separated from the detail view.

[ItemRecord]({{site.appBase}}/object/ItemRecord.jsx)
=============================================================================================
(life cycle) connected via [tables](Dux#tables)

Displays all fields that the user is allowed to read.
Also controls editing the record.

#### Props
###### `tables` object from [getTables](Dux#gettables)
Where all information that has been fetched into tables can be found.

###### `table` string
The name of the table in question.

##### `eId` string
Entity id of this record.

###### `fetch` function is [fetchItem](Dux#fetchitem)
Callback to fetch entity data from the server.

[Login]({{site.appBase}}/object/Login.jsx)
=============================================================================================
(life cycle) connected via [me](Dux#me)

The main task of Login is to fetch the current authentication status:
is there an authenticated user, and if so, what is his/her name?

#### Props
###### `me` object from [getMe](Dux#getme)
The information about the currently logged-in user, fetched from the server.

###### `fetch` function is [fetchMe](Dux#fetchme)
Callback to fetch user information from the server.

[NavLink]({{site.appBase}}/pure/NavLink.jsx)
=============================================================================================
presents __none__

Displays a navigation link that is sensitive to routing.
That means: it is a link that can activate a component, and, when clicked,
it will become highlighted.

#### Props
###### activeClassName
The CSS class to be used when the navigation link has been clicked.

[NotFound]({{site.appBase}}/pure/NotFound.jsx)
=============================================================================================
presents __none__

Displays a 404 if no
[route](React#routing) in [main](#main) matches.

#### Props
###### `splat` string
The text to display on the 404 page.

[Notification]({{site.appBase}}/object/Notification.jsx)
=============================================================================================
(life cycle) connected via [notify](Dux#notify)

Component that receives notifications and displays them in a
little panel with fixed position on the screen.
The panel is hidden by default and pops up if there is an important notification.
The user can click it away and also clear the notifications.

There is also a progress indicator, a little circle fixed at the top right corner of the screen.
It hints at the current status of asynchronous operations. A click on it will show the notifications panel.

#### Props
###### `notifications` array of objects from [getNotifications](Dux#getnotifications)
The list of notifications that have been issued since the beginning of the session or since the last time that the user has cleared the messages.

###### `busy` from [getNotifications](Dux#getnotifications)
The amount of asynchronous actions that are still pending.

###### `show` from [getNotifications](Dux#getnotifications)
Whether the panel should be hidden. 

###### `lastMsg`, `lastNote`, `lastKind` from [getNotifications](Dux#getnotifications)
The indexes of the last message and the last notable message, and the kind of the last notable message, which is one of `error`, `warning`, `special`.
Only the kind `info` is non-special.

When the notifications are displayed, the panel will be scrolled to the last notable message if there is one,
otherwise to the last message.

###### `clear` function is [clear](Dux#clear)
Callback by which the list of notifications can be cleared.

###### `display` function is [display](Dux#display)
Callback to be invoked when the user clicks the panel or the progress indicator to hide and show the notifications panel.

[Pane]({{site.appBase}}/object/Win.jsx)
=============================================================================================
connected via [win](Dux#win)

A dedicated piece of real screen estate, with a certain formatting and a size proportional to the dimensions of the browser window. The dimensions of the pane will be adapted when the browser window is being resized.

#### Props
###### `format` string
A CSS class for formatting the pane.

###### `position`
A code indicating which portion of the screen this pane occupies.
See [columnStyle](Dux#columnstyle) for the range of possibilities here.

###### `height`, `width` number from [getWinDim](Dux#getwindim)
The current height and width of the screen.

[Root]({{site.appBase}}/pure/Root.jsx)
=============================================================================================
 presents [root](Dux#root)

Top-level wrapping component to set up the central store. It does so
by configuring the store, calling [configureStore](Dux#root), and passing
it to the special [Provider](React#redux) component of Redux.

Then it wraps the whole remaining app in a [Window](#window) component for 
detecting some global UI events.

#### Props
Except for the standard prop `children`, there are no props.

[Stat]({{site.appBase}}/pure/Stat.jsx)
=============================================================================================
 presents [filter](Dux#filter)

Displays a string of the form *subTotal* `of` *total*.
If one of the two is missing, the `of` will not display.

#### Props
###### `subtotal`, `total` number

[Static]({{site.appBase}}/pure/Static.jsx)
=============================================================================================
presents __none__

Fixed navigation links to some static resources.

#### Props
None.

[SubApp]({{site.appBase}}/state/SubApp.jsx)
=============================================================================================
presents [win](Dux#win)

This is one of the components just below [App](#app).
It contains a set of panes and navigation links to main subcomponents to
display in those panes.

#### Props
###### `table` string
The name of the table of entities that is central to the subcomponent that
is displayed in the panes.

[Window]({{site.appBase}}/object/Window.jsx)
=============================================================================================
(life cycle) connected via [win](Dux#win)

Detects window resize events and passes the resulting height and width of
the main window to the state.

On mounting an event listener is installed, and on unmounting the event handler is
removed. During resizing, the frequency of emitted events is throttled to one per
second, in order to prevent screen flicker.

#### Props
###### `resize` function is [changeWinDim](Dux#changewindim)
Callback to deliver the new height and width of the browser window upon a resize event.
