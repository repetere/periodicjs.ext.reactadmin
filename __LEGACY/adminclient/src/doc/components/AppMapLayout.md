AppMapLayout

AppMapLayout is a Javascript Object that contains all the React Components available as default in the ReactAdmin extension.

getRenderedComponent:

getRenderedComponent is a function that takes a JSON object of React Components and renders a view using React.createElement

  -asyncprops
    asyncprops is a property used to put values returned by resources onto the property of the component it is defined at. Each key represents the property to be added onto the current component's property, and each key takes an array of property names, which correspond to the properties at each level of the resources object from left to right.

  -windowprops
    windowprops grabs the defined properties from the window and puts it on the property of the current component. It takes an object, through which it traverses to find the property on window and sets it as the value of the defined key.

  -thisprops
    thisprops is used to assign properties from the layout and the current state as properties to the current component. 

  -thisDotProps

  -comparisonprops
    comparisonprops determines whether to show/hide the current component from the display by comparing properties defined on the object. Comparisonprops takes an array of objects that has 'left', 'operation', 'right' as keys. For each object, it compares the resolved value on the left with that of right using the operator defined. The 'left' and 'right' properties each take array of properties to be resolved, as well as primitives. If all conditions return true, it shows the component. If one of the conditions fails, it immediately stops the comparison and hides the current component;

  -conditionalprops
    conditionalprops takes an array of properties and determines whether to show/hide the current component based on the resolved value of the properties. If the resolved value is truthy, it will display the component otherwise, hide.

  -bindprops
    bindprops binds the properties on the current component to its children components

  -ignoreReduxProps
    ignoreReduxProps flag excludes the properties from the Redux Store from the current component's properties. This is useful when certain properties on the component conflicts with any of the properties passed down by Redux.

  -hasWindowFunc
    hasWindowFunc flag is used to assign a function from the window as a value to the corresponding key on the property. If this flag is added, getRenderedComponent function checks all the properties that are one level deep to see if any of them have string that defines a function on window and looks for the named function on window.
