import { Holiday } from "@/types/booking";
import { Star } from "lucide-react";
import React, { memo } from "react";

const HolidayCard = memo(({ holiday }: { holiday: Holiday }) => {
  console.log(holiday.hotel.content.images[0].RESULTS_CAROUSEL);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video relative bg-gray-200">
        <img
          src={holiday.hotel.content.images[0].RESULTS_CAROUSEL.url}
          alt={holiday.hotel.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded">
          {holiday.hotel.content.hotelFacilities
            .slice(0, 3)
            .map((facility, idx) => (
              <span key={idx} className="mr-1">
                {facility}
              </span>
            ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{holiday.hotel.name}</h3>
          <div className="flex">
            {Array.from({
              length: holiday.hotel.content.vRating as number,
            }).map((_, idx) => (
              <Star key={idx} className="w-4 h-4 text-yellow-400" />
            ))}
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          {holiday.hotel.content.hotelLocation}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Price per person</p>
            <p className="text-xl font-bold">{holiday.pricePerPerson}</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

export default HolidayCard;
