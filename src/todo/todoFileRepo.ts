import type { MarkdownEntity, Repo, Todo } from "./common";

export class TodoFileRepo {
  todoIndex = window.ultinotes.services.get("todo") as Repo<Todo>;

  static async listenForTodos(
    callback: (key: Map<MarkdownEntity, Todo>) => any
  ): Promise<TodoFileRepo> {
    return new Promise((resolve, reject) => {
      if (window.ultinotes.servicesLoaded) {
        console.info("services already loaded");
        const repo = new TodoFileRepo();
        repo.todoIndex.onChange(callback);
        return resolve(repo);
      }
      console.info("waiting for load");
      window.addEventListener("UltinotesLoaded", () => {
        console.info("services loaded");
        const repo = new TodoFileRepo();
        repo.todoIndex.onChange(callback);
        return resolve(repo);
      });
      // REVIEW: when do we reject?
      // TODO: reject after timeout and handle error
    });
  }

  async createTodo(name: string, todo: Record<string, any>) {
    return await this.todoIndex.createEntityFile(name, todo);
  }
}
