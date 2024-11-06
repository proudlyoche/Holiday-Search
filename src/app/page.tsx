import { BookingRequest, PartyComposition } from "@/types/booking";
import { DateTime } from "luxon";
import styles from "./page.module.css";
import { DATE_FORMATS } from "@/utils/constants";
import Link from "next/link";
import { Rooms } from "@/utils/composition.service";
import HolidaySearchForm from "./components/search-results/form/search-from";

export default function Home() {
  const samples: BookingRequest[] = [
    {
      bookingType: "holiday",
      location: "orlando",
      departureDate: DateTime.now()
        .plus({ days: 7, months: 1 })
        .toFormat(DATE_FORMATS.URL_DATE),
      direct: false,
      duration: "7",
      gateway: "LHR",
      partyCompositions: [
        {
          adults: 2,
          childAges: [],
          infants: 2,
        },
      ],
    },
    {
      bookingType: "holiday",
      location: "new-york",
      departureDate: DateTime.now()
        .plus({ days: 14, months: 1 })
        .toFormat(DATE_FORMATS.URL_DATE),
      direct: false,
      duration: "14",
      gateway: "MAN",
      partyCompositions: [
        {
          adults: 2,
          childAges: [],
          infants: 0,
        },
      ],
    },
  ];

  return (
    <main className={`wrapper`}>
      {/* <ul className={styles.list}>
        {samples?.map((sample: BookingRequest, idx: number) => {
          return (
            <li key={idx} className={styles.listItem}>
              <Link
                href={`/results?bookingType=${sample?.bookingType}&location=${
                  sample?.location
                }&gateway=${sample?.gateway}&departureDate=${
                  sample?.departureDate
                }&duration=${sample?.duration}${sample?.partyCompositions
                  ?.map(
                    (party: PartyComposition, i: number) =>
                      `&partyCompositions=a${party?.adults}`
                  )
                  .join("&")}`}
              >
                {`
                    ${sample?.location} from ${sample?.gateway} (${
                  sample?.duration
                } nights, ${Rooms.prettyFormat(sample?.partyCompositions)}) 
                  `}
              </Link>
            </li>
          );
        })}
      </ul> */}
      <HolidaySearchForm />
    </main>
  );
}
