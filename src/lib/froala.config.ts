// export const froalaConfig = {
//   toolbarButtons: [
//     "bold",
//     "italic",
//     "underline",
//     "strikeThrough",
//     "align",
//     "fontFamily",
//     "fontSize",
//     "formatOL",
//     "formatUL",
//     "color",
//     "inlineClass",
//     "inlineStyle",
//     "paragraphFormat",
//     "paragraphStyle",
//     "lineHeight",
//     "link",
//     "unlink",
//     "undo",
//     "redo",
//     "help",
//     "selectAll",
//     "spellChecker",
//     "save",
//   ],
//   charCounterCount: true,
//   immediateReactModelUpdate: true,
//   pluginsEnabled: ["align", "link", "image", "lists", "codeView"],
//   iframe: false,
//   theme: "custom",
//   events: {
//     contentChanged: function (this: {
//       html: { get: () => string };
//       _vueModelCallback?: (content: string) => void;
//     }) {
//       if (this.html && typeof this.html.get === "function") {
//         const content = this.html.get();

//         if (typeof this._vueModelCallback === "function") {
//           this._vueModelCallback(content);
//         }
//       } else {
//         console.warn("Froala instance is not properly initialized.");
//       }
//     },
//   },
// };

export const froalaConfig = {
  toolbarButtons: [
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "|",
    "formatOL",
    "formatUL",
    "|",
    "align",
    "lineHeight",
    "|",
    "fontFamily",
    "fontSize",
    "color",
    "paragraphFormat",
    "paragraphStyle",
    "|",
    "insertLink",
    "insertImage",
    "insertVideo",
    "insertTable",
    "|",
    "undo",
    "redo",
    "|",
    "help",
    "selectAll",
    "spellChecker",
    "save",
  ],
  pluginsEnabled: [
    "align",
    "link",
    "lists",
    "image",
    "video",
    "table",
    "paragraphFormat",
    "paragraphStyle",
  ],
  width: "auto",
  heightMin: 200,
  heightMax: 400,
  iframe: false,
  theme: "custom",
  charCounterCount: true,
  immediateReactModelUpdate: true,
};
