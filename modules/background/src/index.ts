import { initTabUrlListener } from './tasks/tab-url';

type Task = () => () => void;

function wrapTask(task: Task) {
  let dispose: (() => void) | undefined;

  return {
    start() {
      dispose?.();
      dispose = task();
    },
    stop() {
      dispose?.();
      dispose = undefined;
    },
  };
}

async function main() {
  const tabUrlTask = wrapTask(initTabUrlListener);

  tabUrlTask.start();
}

main();
