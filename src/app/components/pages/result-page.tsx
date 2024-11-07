"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Rooms } from "@/utils/composition.service";
import { Filters, Holiday } from "@/types/booking";
import FilterPanel from "../card/side-panel-card";
import HolidayCard from "../card/holiday-card";

const ResultsComponent = ({ holidays }: { holidays: Holiday[] }) => {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000],
    facilities: [],
    starRating: null,
  });

  console.log(holidays, filters);

  const filterHolidays = useCallback(
    (holidays: Holiday[]) => {
      return holidays.filter(
        (holiday) =>
          holiday.pricePerPerson <= filters.priceRange[1] &&
          (filters.starRating === null ||
            holiday.hotel.content.vRating == filters.starRating) &&
          (filters.facilities.length === 0 ||
            filters.facilities.every((f) =>
              holiday.hotel.content.hotelFacilities.includes(f)
            ))
      );
    },
    [filters]
  );

  const filteredHolidays = useMemo(
    () => (holidays ? filterHolidays(holidays) : []),
    [holidays, filterHolidays]
  );

  return (
    <div className=" mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            minPrice={0}
            maxPrice={10000}
          />
        </div>

        <div className="md:col-span-3">
          <>
            <p className="mb-4">{filteredHolidays.length} results found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHolidays.map((holiday) => (
                <HolidayCard key={holiday.hotel.id} holiday={holiday} />
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ResultsComponent;
