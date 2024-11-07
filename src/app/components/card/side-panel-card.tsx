"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import {
  Wifi,
  UtensilsCrossed,
  Wine,
  Car,
  LockKeyhole,
  Dumbbell,
  Shirt,
  Gamepad2,
  Bus,
  Droplet,
  Ban,
  BellRing,
  ParkingCircle,
  Waves,
  Star,
} from "lucide-react";
import { Filters } from "@/types/booking";

const FACILITIES = [
  {
    id: "Restaurant",
    label: "Restaurant",
    icon: <UtensilsCrossed className="w-4 h-4" />,
  },
  {
    id: "Bar",
    label: "Bar",
    icon: <Wine className="w-4 h-4" />,
  },
  {
    id: "Free Parking",
    label: "Free Parking",
    icon: <Car className="w-4 h-4" />,
  },
  {
    id: "Valet Parking",
    label: "Valet Parking",
    icon: <ParkingCircle className="w-4 h-4" />,
  },
  {
    id: "Safety Deposit Box",
    label: "Safety Deposit Box",
    icon: <LockKeyhole className="w-4 h-4" />,
  },
  {
    id: "Laundry Service",
    label: "Laundry Service",
    icon: <Shirt className="w-4 h-4" />,
  },
  {
    id: "Games Room",
    label: "Games Room",
    icon: <Gamepad2 className="w-4 h-4" />,
  },
  {
    id: "Internet Access",
    label: "Internet Access",
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    id: "Free transport to theme parks",
    label: "Free transport to theme parks",
    icon: <Bus className="w-4 h-4" />,
  },
  {
    id: "Swimming Pool",
    label: "Swimming Pool",
    icon: <Waves className="w-4 h-4" />,
  },
  {
    id: "No Smoking",
    label: "No Smoking",
    icon: <Ban className="w-4 h-4" />,
  },
  {
    id: "Room Service",
    label: "Room Service",
    icon: <BellRing className="w-4 h-4" />,
  },
  {
    id: "Fitness Centre/Gym",
    label: "Fitness Centre/Gym",
    icon: <Dumbbell className="w-4 h-4" />,
  },
  {
    id: "Hot tub/Whirlpool",
    label: "Hot tub/Whirlpool",
    icon: <Droplet className="w-4 h-4" />,
  },
];

const FilterPanel = memo(
  ({
    filters,
    onFilterChange,
    minPrice,
    maxPrice,
  }: {
    filters: Filters;
    onFilterChange: (newFilters: Filters) => void;
    minPrice: number;
    maxPrice: number;
  }) => {
    const [localPrice, setLocalPrice] = useState(filters.priceRange[1]);

    const debouncedPriceChange = useMemo(
      () =>
        debounce((value: number) => {
          onFilterChange({
            ...filters,
            priceRange: [minPrice, value],
          });
        }, 300),
      [filters, minPrice, onFilterChange]
    );

    React.useEffect(() => {
      return () => {
        debouncedPriceChange.cancel();
      };
    }, [debouncedPriceChange]);

    const handlePriceChange = (value: number) => {
      setLocalPrice(value);
    };

    const handlePriceChangeComplete = () => {
      debouncedPriceChange(localPrice);
    };

    const handleFacilityChange = useCallback(
      (facilityId: string, checked: boolean) => {
        const newFacilities = checked
          ? [...filters.facilities, facilityId]
          : filters.facilities.filter((f) => f !== facilityId);
        onFilterChange({ ...filters, facilities: newFacilities });
      },
      [filters, onFilterChange]
    );
    const handleStarRatingChange = useCallback(
      (rating: number) => {
        const newRating = filters.starRating === rating ? null : rating;
        onFilterChange({
          ...filters,
          starRating: newRating,
        });
      },
      [onFilterChange]
    );

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Price Range</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={localPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              onMouseUp={handlePriceChangeComplete}
              onTouchEnd={handlePriceChangeComplete}
              className="w-full"
            />
            <span>£{localPrice}</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Facilities</label>
          <div className="space-y-2">
            {FACILITIES.map((facility) => (
              <label
                key={facility.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.facilities.includes(facility.id)}
                  onChange={(e) =>
                    handleFacilityChange(facility.id, e.target.checked)
                  }
                  className="rounded"
                />
                {facility.icon}
                <span>{facility.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Star Rating</label>
          <div className="flex gap-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleStarRatingChange(rating)}
                className={`p-2 rounded transition-colors ${
                  filters.starRating === rating
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                aria-label={`${rating} stars`}
              >
                {rating} <Star className="w-4 h-4 inline" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

FilterPanel.displayName = "FilterPanel";

export default FilterPanel;
