import { useRef, useState } from "react";
import Icons from "./Icons";

const App = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef(null);

  const tags = [
    {
      id: 1,
      image: "https://picsum.photos/200",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      image: "https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      image: "https://picsum.photos/100",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
    },
    {
      id: 4,
      image: "https://picsum.photos/300",
      name: "Alice Brown",
      email: "alice.brown@example.com",
    },
    {
      id: 5,
      image: "https://picsum.photos/30",
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
    },
    {
      id: 6,
      image: "https://picsum.photos/40",
      name: "Eve Davis",
      email: "eve.davis@example.com",
    },
    {
      id: 7,
      image: "https://picsum.photos/80",
      name: "David Lee",
      email: "david.lee@example.com",
    },
    {
      id: 8,
      image: "https://picsum.photos/90",
      name: "Grace Turner",
      email: "grace.turner@example.com",
    },
    {
      id: 9,
      image: "https://picsum.photos/70",
      name: "Samuel Miller",
      email: "samuel.miller@example.com",
    },
    {
      id: 10,
      image: "https://picsum.photos/20",
      name: "Olivia Moore",
      email: "olivia.moore@example.com",
    },
  ];

  const filteredTags = tags.filter(
    (item) =>
      item.name
        ?.toLocaleLowerCase()
        ?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.some((selectedTag) => selectedTag.id === item.id)
  );

  return (
    <div className="bg-slate-100 h-screen grid place-items-center overflow-x-hidden">
      <div className="w-full px-4 box-content sm:w-2/3 h-96 text-sm overflow-hidden">
        <div className="card flex items-center justify-between p-2 gap-2.5 min-h-12">
          <div className="selected-tags flex overflow-x-auto">
            {selected.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center min-w-fit rounded-full border pr-1 bg-gray-200 text-gray-600 gap-1 mx-1"
              >
                <img
                  src={tag.image}
                  alt={tag.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{tag.name}</span>
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    setSelected(selected.filter((i) => i.id !== tag.id))
                  }
                >
                  <Icons.Close />
                </div>
              </div>
            ))}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Search"
            className="bg-transparent text-sm caret-blue-600 flex-1"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
          />
        </div>

        {menuOpen ? (
          <div className="card absolute sm:w-2/3 w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            <ul className="w-full min-w-fit">
              {filteredTags?.length ? (
                filteredTags.map((tag) => (
                  <li
                    key={tag.id}
                    className="p-2 cursor-pointer hover:bg-gray-200 rounded-md w-full min-w-fit"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, tag]);
                      setQuery("");
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src={tag.image}
                        alt={tag.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2 min-w-fit">{tag.name}</span>
                      <span className="ml-2">{tag.email}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No options available</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
