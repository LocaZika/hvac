import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";
import { Id } from "react-toastify";

interface ISearchProps {
  placeholder?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<Id | undefined>;
}

export default function Search({ placeholder, handleSubmit }: ISearchProps) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex rounded-md border-2"
    >
      <input
        type="text"
        name="search"
        placeholder={placeholder ?? "Search..."}
        className="flex-auto p-2 outline-none"
      />
      <button className="border-none p-2 outline-none">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-300" />
      </button>
    </form>
  );
}
