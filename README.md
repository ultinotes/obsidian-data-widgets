# Ultinotes - Obsidian Dataview Widgets

Ultinotes provides global JS functions that can be used with your Dataview JS queries to create boards and annotated images (more widgets coming soon).

## Links

[GitHub](https://github.com/ultinotes/obsidian-data-widgets)

## Demo

![](./docs/ultinotes-demo1.webm)

## Prerequisites

- Obsidian Dataview Plugin installed
- Familiarity with Dataview JS
- A large base of notes with consistent frontmatter properties

## Roadmap

Here is the planned roadmap for Ultinotes:

| Feature                | Status      | Description                                         |
| ---------------------- | ----------- | --------------------------------------------------- |
| Boards                 | Implemented | Create task boards grouped by frontmatter.          |
| Annotated Images       | Prototype   | Add annotations to images.                          |
| Better Ergonomics      | In Progress | Make it easier to use widget for people unfamiliar with JavaScript    |
| Additional Widgets     | Planned     | List View, Gallery   |

## Installation

Once this plugin has been approved, you can go to the Community Plugins list and install this plugin by searching for Ultinotes.

## Basic Usage

### Creating Boards

To create boards using Ultinotes, follow these steps:

1. **Set Up Your Dataview Query**  
   Create a Dataview code block in your Obsidian note. For example:

   ````markdown
   ```dataviewjs
   const pages = dv.pages('"custom/folder/with/tasks"')
     .filter(p => p.file);
   ```
   ````

   In this case we get the pages from a specific folder.

2. **Provide Tasks in the Right Format**

   Insert this into your dataview block:

   ```js
   const transformed = pages.map((p) => {
     const link = dv.fileLink(p.file.path);
     const path = p.file.path;
     const filename = path.substring(
       path.lastIndexOf("/") + 1,
       path.lastIndexOf(".")
     );

     return {
       path: path,
       id: p.id,
       title: filename,
       description: p.description || "",
       dueDate: "", // coming later
       topic: p.topic?.trim()?.toUpperCase(),
       status: p.status?.trim()?.toUpperCase(),
     };
   });
   ```

   Here we transform the pages into tasks by adding additional info like file links.

3. **Write Your Board Script**  
   In the dataview code block, use the global `createBoard()` function to define your board. Here's an example:

   ```javascript
   createBoard(this.container, transformed, {
     groupBy: "status",
     columnNames: "BACKLOG;OPEN;DOING;DONE;REJECTED",
     splitRowsBy: "topic",
     unknownColumnName: "BACKLOG",
     creationPath: "where/do/new/files/go",
     frontmatterTemplate: {
       type: "task",
       tags: ["#ultinotes"],
     },
   });
   ```

   This will group your notes by their frontmatter properties status (columns) and topic (rows)

4. **Render the Board**  
   Save the file and go to Preview Mode. You will see a board with your tasks.

5. **Customize Your Board**  
   You can customize the board's appearance and behavior by passing additional options to `createBoard()` or modifying the cards dynamically.

### Creating Annotated Images

To create an annotated image, follow these steps:


1. **Set Up Your Dataview Query**  
   Create a Dataview code block in your Obsidian note. For example:

   ````markdown
   ```dataviewjs
   const pages = dv.pages('"custom/folder/with/tasks"')
     .filter(p => p.file);
   ```
   ````

   In this case we get the pages from a specific folder.

2. **Provide Tasks in the Right Format**

   Insert this into your dataview block:

   ```js
   const transformed = pages.map((p) => {
     const link = dv.fileLink(p.file.path);
     const path = p.file.path;
     const filename = path.substring(
       path.lastIndexOf("/") + 1,
       path.lastIndexOf(".")
     );

     return {
       path: path,
       id: p.id,
       title: filename,
       description: p.description || "",
       positionX: p.x ?? 0,
		   positionY: p.y ?? 0
     };
   });
   ```

   Here we transform the pages into annotations by adding additional info like file links and position from frontmatter

3. **Load the Image and Create the Widget**  
   In the dataview code block, use the global `createGraphic()` function to define your board. Here's an example:

   ```javascript
   const imgSrc = 'image/path/to/file.png';
   const imgFile = app.metadataCache.getFirstLinkpathDest(imgSrc, "/");
   const absolutePath = app.vault.getResourcePath(imgFile);
      
   createGraphic(
    this.container, 
    absolutePath,
    annotations,
    {
     cssFilter: "invert() opacity(0.4)" // example: this will invert the image and make it semi-transparent
    }
   );
   ```

   This will group your notes by their frontmatter properties status (columns) and topic (rows)

4. **Render the Widget**  
   Save the file and go to Preview Mode. You will see a image with your annotations.

5. **Customize Your Image**  
   You can customize the board's appearance and behavior by passing additional options to `createGraphic()` or modifying the cards dynamically.

6. **Add annotations**
   If you hover over the image (long-press on mobile) you will see coordinates in the top left corner
   of the widget, like this: `17.3 x 18.05`. These are your x and y coordinates if, so if you want to create a new annotation, put this into the frontmatter:
   ```yaml
   x: 17.3
   y: 18.05
   ```
