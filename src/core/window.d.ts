import type {
  App,
  MarkdownRenderer,
  normalizePath,
  parseYaml,
  stringifyYaml,
} from "obsidian";

declare global {
  interface Window {
    app: App; // provided by obsidian
    ultinotes: {
      app: App;
      markdown: {
        render: typeof MarkdownRenderer.render;
        // getActivePreview: () => View | null;
      };
      normalize: typeof normalizePath;
      yaml: {
        stringify: typeof stringifyYaml;
        parse: typeof parseYaml;
      };
      config: {
        ignoreFolders: string[];
      };
      services: Map<string, any>;
      servicesLoaded: boolean;
    };
  }
}

declare module "obsidian" {
  interface App {
    isMobile: boolean;
  }
}
