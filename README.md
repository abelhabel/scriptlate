Write templates in javascript that works for client and server.

Example:
Start example/app.js in node.
Go to localhost:3000 to see client rendering.
Go to localhost:3000/text to see server rendering

See example/templates for format of writing templates.

To render a template, do: scriptlate([template], [data]);
- where [template] is a function and [data] is an object

If a parent key is specified on the template object, tags
will be appended to the parent.

Nested tags will automatically be appended to the parent object in the template.

Client:
If no parent is specified for the topmost object in the template,
scriptlate() will not add the tags to the DOM.

Server
scriptlate() always returns a string of html.
