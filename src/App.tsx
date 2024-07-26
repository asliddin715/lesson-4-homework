import React, { useReducer, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type Action =
  | { type: "ADD_ITEM"; title: string }
  | { type: "TOGGLE_DONE"; id: number }
  | { type: "DELETE_ITEM"; id: number };

const initialTodos: Todo[] = [
  { id: 1, title: "Learn React", done: false },
  { id: 2, title: "Read a book", done: false },
  { id: 3, title: "Exercise", done: false },
  { id: 4, title: "Cook dinner", done: false },
];

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!action.title.trim()) return state;
      return [
        ...state,
        { id: Date.now(), title: action.title, done: false },
      ];
    case "TOGGLE_DONE":
      return state.map((item) =>
        item.id === action.id ? { ...item, done: !item.done } : item
      );
    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [items, dispatch] = useReducer(todoReducer, initialTodos);

  const addItem = () => {
    dispatch({ type: "ADD_ITEM", title });
    setTitle("");
  };

  const toggleDone = (id: number) => {
    dispatch({ type: "TOGGLE_DONE", id });
  };

  const deleteItem = (id: number) => {
    dispatch({ type: "DELETE_ITEM", id });
  };

  const doneItems = items.filter((item) => item.done);
  const todoItems = items.filter((item) => !item.done);

  return (
    <div className="container mx-auto pt-2 pb-10 max-w-[583px] bg-[#1D1825] mt-[50px] rounded-[20px]">
      <div className="flex justify-center items-center mb-12 mt-20 justtify">
        <input
          type="text"
          className="p-2 mr-2 rounded-xl bg-transparent text-white"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-[#9E78CF] text-white p-1 rounded-xl rouded"
          onClick={addItem}
          disabled={!title.trim()}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="white" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center flex-col w-[432px] align">
        <h2 className="text-xl mb-4 text-white h2">
          Tasks to do - {todoItems.length}
        </h2>
        <ul className=" mr -39">
          {todoItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-3 rounded-[10px] mb-5 mt bg-[#15101C] text-[#9E78CF] max-w-[432px]"
            >
              <span className="m-0">{item.title}</span>
              <div className="m-0">
                <button className="" onClick={() => toggleDone(item.id)}>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.0487213"
                      width="30"
                      height="30"
                      rx="5"
                      fill="#15101C"
                    />
                    <path
                      d="M23.7851 10.6739L12.7851 21.6739C12.7213 21.7378 12.6455 21.7885 12.562 21.8231C12.4785 21.8577 12.3891 21.8755 12.2987 21.8755C12.2084 21.8755 12.1189 21.8577 12.0355 21.8231C11.952 21.7885 11.8762 21.7378 11.8123 21.6739L6.99982 16.8614C6.87081 16.7324 6.79834 16.5574 6.79834 16.375C6.79834 16.1926 6.87081 16.0176 6.99982 15.8886C7.12882 15.7596 7.30378 15.6871 7.48622 15.6871C7.66866 15.6871 7.84363 15.7596 7.97263 15.8886L12.2987 20.2155L22.8123 9.70109C22.9413 9.57209 23.1163 9.49962 23.2987 9.49962C23.4812 9.49962 23.6561 9.57209 23.7851 9.70109C23.9141 9.8301 23.9866 10.0051 23.9866 10.1875C23.9866 10.3699 23.9141 10.5449 23.7851 10.6739Z"

                      fill="#9E78CF" />
                  </svg>
                </button>
                <button className="" onClick={() => deleteItem(item.id)}>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.0487213"
                      width="30"
                      height="30"
                      rx="5"
                      fill="#15101C"
                    />
                    <path
                      d="M22.6112 8.125H7.48622C7.30388 8.125 7.12902 8.19743 7.00009 8.32636C6.87115 8.4553 6.79872 8.63016 6.79872 8.8125C6.79872 8.99484 6.87115 9.1697 7.00009 9.29864C7.12902 9.42757 7.30388 9.5 7.48622 9.5H8.17372V21.875C8.17372 22.2397 8.31859 22.5894 8.57645 22.8473C8.83431 23.1051 9.18405 23.25 9.54872 23.25H20.5487C20.9134 23.25 21.2631 23.1051 21.521 22.8473C21.7789 22.5894 21.9237 22.2397 21.9237 21.875V9.5H22.6112C22.7936 9.5 22.9684 9.42757 23.0974 9.29864C23.2263 9.1697 23.2987 8.99484 23.2987 8.8125C23.2987 8.63016 23.2263 8.4553 23.0974 8.32636C22.9684 8.19743 22.7936 8.125 22.6112 8.125ZM20.5487 21.875H9.54872V9.5H20.5487V21.875ZM10.9237 6.0625C10.9237 5.88016 10.9962 5.7053 11.1251 5.57636C11.254 5.44743 11.4289 5.375 11.6112 5.375H18.4862C18.6686 5.375 18.8434 5.44743 18.9724 5.57636C19.1013 5.7053 19.1737 5.88016 19.1737 6.0625C19.1737 6.24484 19.1013 6.4197 18.9724 6.54864C18.8434 6.67757 18.6686 6.75 18.4862 6.75H11.6112C11.4289 6.75 11.254 6.67757 11.1251 6.54864C10.9962 6.4197 10.9237 6.24484 10.9237 6.0625Z"

                      fill="#9E78CF" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-xl mb-4 text-white">
          Completed tasks - {doneItems.length}
        </h2>
        <ul>
          {doneItems.map((item) => (
            <li
              key={item.id}
              className=" justify-between items-center p-3 rounded-[10px] mb-5 mt bg-[#15101C] text-[#9E78CF] max-w-[432px]"
            >
              <span className="m-0 ml">{item.title}</span>
              <div className="m-0">
                <button className="" onClick={() => toggleDone(item.id)}>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.0487213"
                      width="30"
                      height="30"
                      rx="5"
                      fill="#15101C"
                    />
                    <path
                      d="M23.7851 10.6739L12.7851 21.6739C12.7213 21.7378 12.6455 21.7885 12.562 21.8231C12.4785 21.8577 12.3891 21.8755 12.2987 21.8755C12.2084 21.8755 12.1189 21.8577 12.0355 21.8231C11.952 21.7885 11.8762 21.7378 11.8123 21.6739L6.99982 16.8614C6.87081 16.7324 6.79834 16.5574 6.79834 16.375C6.79834 16.1926 6.87081 16.0176 6.99982 15.8886C7.12882 15.7596 7.30378 15.6871 7.48622 15.6871C7.66866 15.6871 7.84363 15.7596 7.97263 15.8886L12.2987 20.2155L22.8123 9.70109C22.9413 9.57209 23.1163 9.49962 23.2987 9.49962C23.4812 9.49962 23.6561 9.57209 23.7851 9.70109C23.9141 9.8301 23.9866 10.0051 23.9866 10.1875C23.9866 10.3699 23.9141 10.5449 23.7851 10.6739Z"

                      fill="#9E78CF" />
                  </svg>
                </button>
                <button className="" onClick={() => deleteItem(item.id)}>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.0487213"
                      width="30"
                      height="30"
                      rx="5"
                      fill="#15101C"
                    />
                    <path
                      d="M22.6112 8.125H7.48622C7.30388 8.125 7.12902 8.19743 7.00009 8.32636C6.87115 8.4553 6.79872 8.63016 6.79872 8.8125C6.79872 8.99484 6.87115 9.1697 7.00009 9.29864C7.12902 9.42757 7.30388 9.5 7.48622 9.5H8.17372V21.875C8.17372 22.2397 8.31859 22.5894 8.57645 22.8473C8.83431 23.1051 9.18405 23.25 9.54872 23.25H20.5487C20.9134 23.25 21.2631 23.1051 21.521 22.8473C21.7789 22.5894 21.9237 22.2397 21.9237 21.875V9.5H22.6112C22.7936 9.5 22.9684 9.42757 23.0974 9.29864C23.2263 9.1697 23.2987 8.99484 23.2987 8.8125C23.2987 8.63016 23.2263 8.4553 23.0974 8.32636C22.9684 8.19743 22.7936 8.125 22.6112 8.125ZM20.5487 21.875H9.54872V9.5H20.5487V21.875ZM10.9237 6.0625C10.9237 5.88016 10.9962 5.7053 11.1251 5.57636C11.254 5.44743 11.4289 5.375 11.6112 5.375H18.4862C18.6686 5.375 18.8434 5.44743 18.9724 5.57636C19.1013 5.7053 19.1737 5.88016 19.1737 6.0625C19.1737 6.24484 19.1013 6.4197 18.9724 6.54864C18.8434 6.67757 18.6686 6.75 18.4862 6.75H11.6112C11.4289 6.75 11.254 6.67757 11.1251 6.54864C10.9962 6.4197 10.9237 6.24484 10.9237 6.0625Z"

                      fill="#9E78CF" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
