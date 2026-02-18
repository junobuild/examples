import { getDoc, setDoc, deleteDoc, type Doc } from "@junobuild/core";
import { nanoid } from "nanoid";

interface Task {
  description: string;
  done: boolean;
}

let taskRecord: Doc<Task> | undefined;
let taskKey: string | undefined;

const setTask = async () => {
  const description =
    (document.querySelector("#taskDesc") as HTMLInputElement)?.value || "";
  const done =
    (document.querySelector("#taskDone") as HTMLInputElement)?.checked || false;

  taskKey = nanoid();

  taskRecord = await setDoc<Task>({
    collection: "tasks",
    doc: {
      key: taskKey,
      data: { description, done },
      ...(taskRecord !== undefined && { updated_at: taskRecord.updated_at }),
    },
  });

  console.log("Task set", taskRecord);
};

const getTask = async () => {
  if (taskKey === undefined) {
    return;
  }

  taskRecord = await getDoc<Task>({
    collection: "tasks",
    key: taskKey,
  });

  console.log("Task get", taskRecord);

  const result = document.querySelector("#result");
  if (result && taskRecord) {
    result.textContent = `Task: ${taskRecord.data.description} (${taskRecord.data.done ? "done" : "pending"})`;
  }
};

const delTask = async () => {
  if (taskRecord === undefined) {
    return;
  }

  await deleteDoc<Task>({
    collection: "tasks",
    doc: taskRecord,
  });

  taskRecord = undefined;
  console.log("Task deleted");
};

export const initTasks = () => {
  document
    .querySelector("#setTask")
    ?.addEventListener("click", setTask, { passive: true });
  document
    .querySelector("#getTask")
    ?.addEventListener("click", getTask, { passive: true });
  document
    .querySelector("#deleteTask")
    ?.addEventListener("click", delTask, { passive: true });
};
