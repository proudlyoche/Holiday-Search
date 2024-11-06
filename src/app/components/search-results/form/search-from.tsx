"use client";

import React, { useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";

interface PartyMember {
  adults: number;
  childAges: number[];
  infants: number;
}

const HolidaySearchForm = () => {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [dates, setDates] = useState<{
    start: Date | undefined;
    end: Date | undefined;
  }>({
    start: undefined,
    end: undefined,
  });
  const [party, setParty] = useState<PartyMember>({
    adults: 2,
    childAges: [],
    infants: 0,
  });
  const [showPartySelector, setShowPartySelector] = useState(false);

  const airports = [
    { code: "LHR", name: "London Heathrow" },
    { code: "LGW", name: "London Gatwick" },
    { code: "MAN", name: "Manchester" },
    { code: "BHX", name: "Birmingham" },
    { code: "GLA", name: "Glasgow" },
    { code: "BFS", name: "Belfast International" },
  ];

  const handleSearch = () => {
    if (!destination || !departureAirport || !dates.start) {
      alert("Please fill in all required fields");
      return;
    }

    const duration = dates.end
      ? Math.ceil(
          (dates.end.getTime() - dates.start.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 7;

    const searchParams = new URLSearchParams({
      bookingType: "holiday",
      location: destination.toLowerCase(),
      departureDate: DateTime.fromJSDate(dates.start).toFormat("dd-MM-yyyy"),
      duration: duration.toString(),
      gateway: departureAirport,
      partyCompositions: `a${party.adults}${party.childAges
        .map((age) => `c${age}`)
        .join("")}`,
    });

    router.push(`/results?${searchParams.toString()}`);
  };

  return (
    <div className=" mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              DESTINATION
            </label>
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              FLYING FROM
            </label>
            <select
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-2.5"
            >
              <option value="">Select airport</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">WHEN</label>
            <input
              type="date"
              value={
                dates.start
                  ? DateTime.fromJSDate(dates.start).toISODate() ?? ""
                  : undefined
              }
              onChange={(e) =>
                setDates({
                  ...dates,
                  start: e.target.value ? new Date(e.target.value) : undefined,
                })
              }
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              GUESTS & ROOMS
            </label>
            <div
              onClick={() => setShowPartySelector(!showPartySelector)}
              className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
            >
              {`${party.adults} adult${party.adults !== 1 ? "s" : ""}`}
              {party.childAges.length > 0 &&
                `, ${party.childAges.length} child${
                  party.childAges.length !== 1 ? "ren" : ""
                }`}
            </div>
            {showPartySelector && (
              <div className="mt-2 p-4 border rounded shadow-lg bg-white">
                <div className="flex justify-between items-center">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setParty({
                          ...party,
                          adults: Math.max(1, party.adults - 1),
                        })
                      }
                    >
                      -
                    </button>
                    <span>{party.adults}</span>
                    <button
                      onClick={() =>
                        setParty({
                          ...party,
                          adults: Math.min(6, party.adults + 1),
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Children (0-17)</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newAges = [...party.childAges];
                        newAges.pop();
                        setParty({ ...party, childAges: newAges });
                      }}
                    >
                      -
                    </button>
                    <span>{party.childAges.length}</span>
                    <button
                      onClick={() => {
                        if (party.childAges.length < 4) {
                          setParty({
                            ...party,
                            childAges: [...party.childAges, 2],
                          });
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded"
          >
            Find Holidays
          </button>
        </div>
      </div>
    </div>
  );
};

export default HolidaySearchForm;
