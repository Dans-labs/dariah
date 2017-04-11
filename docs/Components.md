# Components

## CheckboxI

Displays a *collective* checkbox for a filter with many facets.

Clicking on this box will collectively check and uncheck all associate
checkboxes.

This checkbox can have an indeterminate state, if some but not all
of the associate checkboxes are checked.

We have to resort to a [DOM](React.md#dom) manipulation after rendering to get the
indeterminate state across.

## DocMd

Component to show
[MarkDown](https://guides.github.com/features/mastering-markdown/)
text, coming from files on the server.
The conversion to HTML is done client side,
and the user gets a control to switch between MarkDown source and
formatted HTML.

A handler for links in the MarkDown source.
It makes it possible to write MarkDown documents with
internal links to this application.

A full link (with protocol `http`(`s`) is translated to a
plain HTML `a` element, so it will leave this application.

Other links are translated to Link elements for the


## EUMap

A complex component!
It is a facet filter for the field country,
and it contains a map of Europe, visualizing by means of markers,
how the filter result is distributed over the DARIAH countries.

Both ingredients of this component are brought together not by
class extension but by functional composition.

The country facet filter is a true react [component](React.md#react-components).

The map is a [Leaflet](http://leafletjs.com) module on a blank pane,
with a [geojson](../client/js/lib/europe.geo.js) file of country boundaries laid out on it.
The map is not react aware, it will be rendered in its own div.

Remember that the results of filter computation descend from a stateful
parent into the present component.
So, whenever we receive new props, we manipulate the leaflet map and adjust
the markers on it.
More precisely, since we do not have to manipulate state, we put the marker updates
in the [componentDidMount()](React.md#componentdidmount)
and [componentDidUpdate()](React.md#componentdidupdate)
[life cycle methods](React.md#life-cycle) of React.
At those moments we know that the [DOM](React.md#dom) elements that must be rendered have mounted,
so the map exists, and we can put the markers there.

### Compute Marker Radius

When we know the filter results per country, we can put markers on them
with a radius in proportion to their scores.
However, if the scores are very far apart, either the small markers get invisible,
or the big markers get too big.
We mitigate this effect, by using proportional radii only for values below a certain
threshold (LEVEL_OFF). For higher values we essentiall take the square root.

## FilterCompute

Parent component of all filters.
The filter state (`filterSettings`) are maintained here.

## ItemFiltered

Displays the list of items in the right column, but
only those that have passed all the filters, which are displayed in the
left column.

## ItemMy

## The list of "my" items

Displays the list of items of the current user in the left column,
with a details/edit view in the right column.

## ItemRecord

Displays all fields that the user is allowed to read.
With a control to edit the record.

## Login

The main task of Login is to fetch the current authentication status:
is there an authenticated user, and if so, what is his/her name?

## Notification

Component that receives notifications and displays them in a
little div with fixed position on the screen.

## Window

## Alternative

Displays one of a list of alternatives and
let the user cycle through the alternatives.

Handy for:
* show/hide a component: pass as alternatives: `[component, <div>]`
* view alternative representations of a resource, e.g.
```
[
   <div>{MarkDownSource}</div>,
   <div>{FormattedDoc}</div>
]
```

The state maintains the number of the currently chosen alternative.
It resides in `state.alt`.

@param {string} tag An extra identification, to distinguish this instance of the class from others.
The tag will be used when the state of this component must be saved or loaded.
**NB:** The tag property will be injected into Alternative by the
hoc component enhancer.
@param {Component[]} alternatives A list of components to choose from
@param {number} initial The number of the initial alternative to be displayed
@returns {void} Updates the state: increases `state.alt`
(the number saying which alternative is active).
The increase is done cyclically modulo *n* = the number of alternatives.

@param {Component[]} alternatives A list of components to choose from
@param {Fragment[]} controls A list of [DOM](React.md#dom) fragments that act as controllers.
`control[i]` corresponds to `alternative[i]` and is displayed with it.
Every individual control must be given as a function `handler => fragment`.
When the controls are placed, the control functions will be passed the
Alternative#next method in this class,
so that a click on the control eventually translates to a
call of Alternative#next|next.
@param {number} initial The number of the initial alternative to be displayed
@param {function} controlPlacement A function to put the control in place for each alternative.
In this way the caller can fine tune how exactly the control appears in relation to
the alternative component.
@returns {Fragment} The chosen alternative with its control.

## App

### Top level interface component

As far as the web page is concerned, this is the top level component.
Technically, there are only
some [router](React.md#routing) components
and ultimately the [Redux](React#redux) *Provider*
[component](React.md#react-components) above it.

### Permanent navigation widget

`App` is always in view and consists of the
* top navigation bar (with logo, [Login](#login), and [Notification](#notification))
* right navigation bar (with navigation links to the components of the app
  and documentation).

## ByValue

A widget by which the user can click the facets associated with one field.
There is also a collective checkbox, by which the user can check or uncheck all facets in one go.
All values that occur are displayed, with statistics in the form *subtotal of total*.

### Note on performance
There is a subtlety here.
When we have the facets, we want to lay them out in a grid.
That work needs only be done upon construction,
and not for state updates in response to user
events on the filters.
So we want to do the grid computation
[placeFacets](Filter.md#placefacets)
once, in an initialization stage, e.g. in the
[constructor()](React.md#constructor).
But it turns out that for the visual performance it does not matter.

This is the virtue of React: the code for rendering just constructs a
[Fragment](React.md#fragment), not the real [DOM](React.md#dom).
The computation inside [placeFacets](Filter.md#placefacets)
is just a little bit of juggling with tiny datastructures, so the fragment is constructed in no time.
See [Reconciliation](React.md#reconciliation).

## Facet

Displays a single facet. Just a checkbox and a value representation.
The clicks received by the checkbox are passed upwards by means of a callback.

Note that we use the strategy of [controlled components](React.md#controlled-component) here.

## Filter

## Filter inventory

The following types of filters are implemented.
* [FullText](#fulltext): Search in a textual field for a pattern.
  The pattern is entered by the user,
  the search is incremental, after each keystroke the results are updated.
* [ByValue](#byvalue): Faceted search for values of a specific field.
  * [EUMap](#eumap): Faceted search on country, together with a map visualization

Here we store the list of the available filter types and their characteristics.
Every entry contains a few items:
* the [component](React.md#react-components) class associated with it
* its name (as string)
* the name of the data field it is filtering
* how many columns the grid of facets may have.

This function merely selects the right filter
[component](React.md#react-components)
and calls it with the appropriate props.
Whereas the incoming props contain information for all filters,
each individual child filter is passed the relevant slice only.

## FullText

Displays a full text search input field.
The characters entered in this field are passed upwards by means of a callback.
This is incremental search.
Not only the full text search, but also all other filters are computed upon each character entered.

Note that we use the strategy of [controlled components](React.md#controlled-component) here.

## ItemField

## ItemList

Displays the list of items as a table.
Only the rows that have passed all filters.

## Pane

## SubApp

## Nearly top level interface component

This is a component just below [App](#app).

## Backoffice

## Backoffice functions

## Doc

The document types that can be handled by the Doc component.
`md` stands for MarkDown.
Displays a document. Depending of the type of document, a specialized
Doc class will be invoked.

## DocHtml

Displays an HTML document by linking to it in an IFRAME.

## DocPdf

Displays a PDF document by linking to it in an OBJECT.

**NB:** On iOS this does not work well, only the first page of the PDF gets shown,
we work around it by just displaying a link to open the PDF in a new tab.
We only do that when we detect an iOS browser.

## ItemHead

Displays an item heading in a table row.
With a control to view the whole records.
Only the fields that the user is allowed to view.

## ItemRecordPre

Prepare the way to load an item view of an item.
Needed when you want to navigate to a specific item
by means of the Router.

## NavLink

Displays a navigation link that is sensitive to routing.

## NotFound

Displays a 404 if no
[route](React.md#routing) matches.

## Root

## Stat

Displays a string of the form *subTotal* `of` *total*.
If one of the two is missing, the `of` will not display.

## Static

## Navigation links to static resources

[Previous - Me](Me.md) -
[Up](Home.md) -
[Next - Deploy](Deploy.md)

---
[repo](https://github.com/Dans-labs/dariah) -
[website](https://dariah-beta.dans.knaw.nl/)
