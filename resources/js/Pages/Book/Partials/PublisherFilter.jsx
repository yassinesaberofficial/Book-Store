import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Checkbox, Flowbite, Label, TextInput } from "flowbite-react";

import FilterLayout from "@/Layouts/FilterLayout";
import ScrollAreaLayout from "@/Layouts/ScrollAreaLayout";
import searchFilterTheme from "@/Pages/Book/Partials/searchBarTheme";

export default function PublisherFilter({
  handleCheckbox,
  bookFilter,
  publishers,
  isMobile,
}) {
  const [publisherList, setPublisherList] = useState(publishers);
  const [searchVal, setSearchVal] = useState("");

  const handleFilter = (search) => {
    if (search === "") {
      setPublisherList(publishers);
      return;
    }

    const filterBySearch = publisherList.filter((item) => {
      if (item.publisher.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    });

    setPublisherList(filterBySearch);
  };

  const filterList = useCallback(
    debounce((search) => handleFilter(search), 500),
    []
  );

  useEffect(() => {
    filterList(searchVal);
  }, [searchVal]);

  return (
    <FilterLayout title="Publisher">
      <div className="flex flex-col">
        <div className="px-4 pt-3 bg-white dark:bg-gray-800">
          <Flowbite theme={{ theme: searchFilterTheme }}>
            <TextInput
              icon={Search}
              placeholder="Search publisher..."
              required
              type="text"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </Flowbite>
        </div>
        <ScrollAreaLayout>
          {publisherList.map((publisher, index) => (
            <div key={index} className="flex items-center gap-2 w-[200px]">
              <Checkbox
                id={`publisher-` + index + `${isMobile ? "-mobile" : ""}`}
                value={publisher.publisher}
                className="cursor-pointer"
                onChange={(e) => handleCheckbox(e, "publisher")}
                defaultChecked={
                  bookFilter.publisher &&
                  bookFilter.publisher.split(",").includes(publisher.publisher)
                }
              />
              <Label
                htmlFor={`publisher-` + index + `${isMobile ? "-mobile" : ""}`}
                className="truncate font-medium cursor-pointer"
              >
                {publisher.publisher}
              </Label>
            </div>
          ))}
        </ScrollAreaLayout>
      </div>
    </FilterLayout>
  );
}
