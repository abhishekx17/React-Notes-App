import React, { useState, useRef } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [task, setTask] = useState([]);

   const detailRef = useRef(null);

  const addNote = (e) => {
    e.preventDefault();

   if (!title.trim() || !detail.trim()) return; 

    const newNote = { title, detail };
    setTask([...task, newNote]);

    setTitle("");
    setDetail("");
  };

  const handleTitle = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      detailRef.current.focus();
    }
  };

  const handleDetail = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote(e);
    }
  };

  const deleteNote = (index) => {
    const newNote = [...task];
    newNote.splice(index, 1);
    setTask(newNote);
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center px-6 py-10 hide-scrollbar overflow-y-scroll h-64">
      <h1 className="text-4xl font-bold mb-10 tracking-wide">📝 Notes App</h1>

      <div className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your Note"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
            ref={detailRef}
          onKeyDown={handleTitle}
          className="w-full p-3 rounded-2xl
                     bg-gray-800 text-gray-100 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     transition-all duration-300 ease-in-out
                     shadow-sm hover:shadow-md"
        />

        <textarea
          placeholder="Enter details here..."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
            ref={detailRef}
          onKeyDown={handleDetail}
          className="w-full h-32 p-3 rounded-2xl 
                     bg-gray-800 text-gray-100 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     transition-all duration-300 ease-in-out
                     shadow-sm hover:shadow-md resize-none"
        />

        <button
          onClick={addNote}
          className="py-3 rounded-2xl font-bold text-lg mt-6 bg-blue-500 text-white cursor-pointer
                     hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Add Note
        </button>
      </div>

      <div className="w-full max-w-md mt-10 space-y-6">
        {task.length === 0 ? (
          <p className="text-gray-400 text-center">No notes yet. Add one!</p>
        ) : (
          task.map((note, index) => (
            <div
              key={index}
              className="bg-[url(https://img.freepik.com/free-vector/leafy-patterned-note-background-vector_53876-151553.jpg?semt=ais_hybrid&w=740&q=80)] bg-cover bg-center text-gray-100 p-5 rounded-2xl shadow-lg border border-gray-700
                         hover:shadow-2xl hover:border-blue-500 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 pl-5 text-blue-400">
                {note.title}
              </h2>
              <p className="text-black leading-relaxed pl-5">{note.detail}</p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    deleteNote(index);
                  }}
                  className="px-4 py-1 bg-red-500 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
