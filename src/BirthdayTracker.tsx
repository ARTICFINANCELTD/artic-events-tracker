import React, { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';

interface Customer {
  id: number;
  name: string;
  dob: string; // Date of Birth in YYYY-MM-DD format
}

interface Event {
  name: string;
  date: string; // Date in MM-DD format
}

const events: Event[] = [
  { name: 'New Year’s Day', date: '01-01' },
  { name: 'International Day of Education', date: '01-24' },
  { name: 'Eid el-Fitr', date: '03-31' },
  { name: 'Mothering Sunday', date: '03-30' },
  { name: 'Good Friday', date: '04-01' },
  { name: 'Easter Monday', date: '04-02' },
  { name: 'Global Action Week for Education', date: '04-Last week' },
  { name: 'Education for Sustainable Development (ESD) Day', date: '04-22' },
  { name: 'Labour Day', date: '05-01' },
  { name: 'International Children’s Day', date: '06-01' },
  { name: 'Democracy Day', date: '06-12' },
  { name: 'International Youth Day', date: '08-12' },
  { name: 'World Teachers\' Day', date: '10-05' },
  { name: 'Independence Day', date: '10-01' },
  { name: 'International Literacy Day', date: '09-08' },
  { name: 'Christmas Day', date: '12-25' },
  { name: 'Boxing Day', date: '12-26' },
];

const customers: Customer[] = [
  { id: 1, name: "Mr Prince", dob: '1971-03-22' },
  { id: 2, name: "Mr Victor", dob: '1971-06-01' },
  { id: 3, name: "Mr Afam", dob: '1971-04-29' },
  { id: 4, name: "Nancy", dob: '1971-01-22' },
  { id: 5, name: "Orbit Montessori School (Mrs Amaka Okorie)", dob: '1972-02-14' },
  { id: 6, name: 'Prayota Academy (Michael Igben)', dob: '1968-07-25' },
  { id: 7, name: "Joe Hybrid Int'l Academy (Dr Emejuobi Joseph Ikechukwu)", dob: '1974-04-20' },
  { id: 8, name: "Geomarvel Int'l School (Mrs Abaroaha Georgina)", dob: '1972-06-18' },
  { id: 9, name: "Dazzleville Int'l School (Justina Oritsemisan Omokwe)", dob: '1976-09-19' },
  { id: 10, name: "Shekinah Glory Academy (Amaefule Chinyeaka Gertrude)", dob: '1980-06-25' },
  { id: 11, name: "Dayton Model School (Emanso Udongwo)", dob: '1968-09-15' },
  { id: 12, name: "Crownec Int'l School (Okorome Chinedu)", dob: '1976-06-17' },
  { id: 13, name: "Glory Innovative Academy (Ohioma Gloria)", dob: '1969-09-26' },
  { id: 14, name: "Merecer Int'l Academy (Mr Temple E. Odoko)", dob: '1973-01-15' },
  { id: 15, name: "Amavel Intl School", dob: '1971-07-29' },
  { id: 16, name: "Arinze Prince", dob: '1971-10-16' },
  { id: 17, name: "Assumpt Chiaka", dob: '1971-08-15' },
  { id: 18, name: "Baridoo Sam-Joel Intl Sch", dob: '1971-12-07' },
  { id: 19, name: "Bestow Intl School", dob: '1971-12-07' },
  { id: 20, name: "Brain Builder School", dob: '1971-07-25' },
  { id: 21, name: "Brianforte Intl School", dob: '1971-10-05' },
  { id: 22, name: "Brilliant Intl School", dob: '1971-04-18' },
  { id: 23, name: "Cais Academy", dob: '1971-08-12' },
  { id: 24, name: "Dayton Model School", dob: '1971-02-23' },
  { id: 25, name: "De Famous Intl School", dob: '1971-10-07' },
  { id: 26, name: "De Shalom School", dob: '1971-04-10' },
  { id: 27, name: "Fair Child School", dob: '1971-02-19' },
  { id: 28, name: "Fruitful Star Academy", dob: '1971-03-30' },
  { id: 29, name: "Gd Academy", dob: '1971-08-04' },
  { id: 30, name: "Giant Star Academy", dob: '1971-04-20' },
  { id: 31, name: "Glorious Child Intl School", dob: '1971-12-25' },
  { id: 32, name: "Gloryland School", dob: '1971-09-17' },
  { id: 33, name: "God's Word Intl School", dob: '1971-08-23' },
  { id: 34, name: "Gold Stream Intl School", dob: '1971-11-23' },
  { id: 35, name: "Goldstar Intl School", dob: '1971-08-29' },
  { id: 36, name: "Graceful Cherith Model School", dob: '1971-06-18' },
  { id: 37, name: "Herald Pedagogical School", dob: '1971-04-02' },
  { id: 38, name: "Holy Priesthood Sch", dob: '1971-05-06' },
  { id: 39, name: "Intellectual Education Academy", dob: '1971-07-04' },
  { id: 40, name: "Kamza Allwell", dob: '1971-05-25' },
  { id: 41, name: "Love Intl Sch", dob: '1971-04-24' },
  { id: 42, name: "Onyx Montessori School", dob: '1971-07-10' },
  { id: 43, name: "Point De Perere", dob: '1971-02-10' },
  { id: 44, name: "Stride Right School", dob: '1971-08-26' },
  { id: 45, name: "Woodgate Intl School", dob: '1971-08-01' },
  { id: 46, name: "Avidminds International School", dob: '1971-04-14' },
  { id: 47, name: "Glojoy Int'l Sch", dob: '1971-12-31' },
  { id: 48, name: "Greater Lilies Int'l Sch", dob: '1971-07-20' },
  { id: 49, name: "Lighthouse Royal Academy", dob: '1971-11-25' },
  { id: 50, name: "De Sunrise", dob: '1971-05-24' },
  { id: 51, name: "Lordguard Innovative", dob: '1971-01-01' },
  { id: 52, name: "Preschood Sch", dob: '1971-04-04' },
  { id: 53, name: "Prequeen Int'l", dob: '1971-02-26' },
  { id: 54, name: "Maya's Ark Academy", dob: '1971-08-17' },
  { id: 55, name: "Sinny Weli Nig Ltd", dob: '1971-03-06' },
  { id: 56, name: "Unique Tender Touch Academy", dob: '1971-02-19' },
  { id: 57, name: "Vineyard Int'l Sch", dob: '1971-09-28' },
  { id: 58, name: "Truimph Academy", dob: '1971-07-24' },
  { id: 59, name: "Tinamund Standard International", dob: '1971-08-26' },
  { id: 60, name: "Valentine Ezie", dob: '1971-04-05' },
  { id: 61, name: "Uchenna Ohadugha", dob: '1971-07-27' },
  { id: 62, name: "Sotami Academy", dob: '1971-02-02' },
  { id: 63, name: "Fecund Energy", dob: '1971-08-08' },
  { id: 64, name: "Kadus Academy", dob: '1971-01-10' },
  { id: 65, name: "Blessed Covenant", dob: '1971-03-13' },
  { id: 66, name: "Elite School", dob: '1971-07-04' },
  { id: 67, name: "Dominican Royal Sch", dob: '1971-01-16' },
  { id: 68, name: "King's Bride Int'l", dob: '1971-06-16' },
];



const EventList: React.FC = () => {
  const [todayBirthdays, setTodayBirthdays] = useState<Customer[]>([]);
  const [todayEvents, setTodayEvents] = useState<Event[]>([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Customer[]>([]);
  const [pastBirthdays, setPastBirthdays] = useState<Customer[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [showEvents, setShowEvents] = useState<boolean>(false);

  const today = new Date();
  const todayStr = format(today, 'MM-dd');
  const currentYear = today.getFullYear();

  const sortedEvents = events.sort((a, b) => {
    return parse(a.date, 'MM-dd', new Date(currentYear, 0, 1)).getTime() -
      parse(b.date, 'MM-dd', new Date(currentYear, 0, 1)).getTime();
  });

  useEffect(() => {
    const todayBD = customers.filter((customer) => {
      const dobThisYear = new Date(currentYear, new Date(customer.dob).getMonth(), new Date(customer.dob).getDate());
      return format(dobThisYear, 'MM-dd') === todayStr;
    });
    setTodayBirthdays(todayBD);

    const todayEvs = events.filter((event) => event.date === todayStr);
    setTodayEvents(todayEvs);

    const upcomingBD = customers.filter((customer) => {
      const dobThisYear = new Date(currentYear, new Date(customer.dob).getMonth(), new Date(customer.dob).getDate());
      return dobThisYear > today;
    });
    setUpcomingBirthdays(upcomingBD);

    const pastBD = customers
      .filter((customer) => {
        const dobThisYear = new Date(currentYear, new Date(customer.dob).getMonth(), new Date(customer.dob).getDate());
        return dobThisYear < today && format(dobThisYear, 'MM-dd') !== todayStr;
      })
      .sort((a, b) => {
        const aDate = new Date(currentYear, new Date(a.dob).getMonth(), new Date(a.dob).getDate());
        const bDate = new Date(currentYear, new Date(b.dob).getMonth(), new Date(b.dob).getDate());
        return bDate.getTime() - aDate.getTime();
      });
    setPastBirthdays(pastBD);

    const upcomingEv = events.filter((event) => {
      const eventDate = parse(event.date, 'MM-dd', today);
      return eventDate > today;
    });
    setUpcomingEvents(upcomingEv);
  }, [todayStr, currentYear]);

  const handleSeeEventsClick = () => {
    setShowEvents(!showEvents);
  };

  return (
    <div className="events-container">
      <section className={`today-events ${showEvents ? 'visible' : ''}`}>
        <h2>Today's Events & Birthdays</h2>
        <div className="events-today">
          <div className="today-birthdays">
            <h3>Today's Birthdays</h3>
            {todayBirthdays.length > 0 ? (
              todayBirthdays.map((customer) => (
                <p key={customer.id}>{customer.name} - {format(new Date(customer.dob), 'MMMM dd')}</p>
              ))
            ) : (
              <p>No birthdays today</p>
            )}
          </div>
          <div className="today-events-list">
            <h3>Today's Events</h3>
            {todayEvents.length > 0 ? (
              todayEvents.map((event, index) => (
                <p key={index}>{event.name} - {event.date}</p>
              ))
            ) : (
              <p>No events today</p>
            )}
          </div>
        </div>
        <button className="see-events-btn" onClick={handleSeeEventsClick}>See Events</button>
      </section>

      <section className="upcoming-section">
        <h2>Upcoming Events & Birthdays</h2>
        <div className="upcoming-cards">
          <div className="upcoming-birthdays">
            <h3>Upcoming Birthdays</h3>
            {upcomingBirthdays.length > 0 ? (
              upcomingBirthdays.map((customer) => (
                <div className="card" key={customer.id}>
                  <p>{customer.name} - {format(new Date(customer.dob), 'MMMM dd')}</p>
                </div>
              ))
            ) : (
              <p>No upcoming birthdays</p>
            )}
          </div>

          <div className="upcoming-events">
            <h3>Upcoming Events</h3>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div className="card" key={index}>
                  <p>{event.name} - {event.date}</p>
                </div>
              ))
            ) : (
              <p>No upcoming events</p>
            )}
          </div>
        </div>
      </section>

      <section className="past-events">
        <h2>Past Events</h2>
        <div className="past-events-list">
          {sortedEvents.map((event, index) => {
            const eventDate = parse(event.date, 'MM-dd', today);
            return eventDate < today ? (
              <div className="card" key={index}>
                <p>{event.name} - {event.date}</p>
              </div>
            ) : null;
          })}
        </div>
      </section>

      <section className="past-birthdays">
        <h2>Past Birthdays</h2>
        <div className="past-birthdays-list">
          {pastBirthdays.length > 0 ? (
            pastBirthdays.map((customer) => (
              <div className="card" key={customer.id}>
                <p>{customer.name} - {format(new Date(customer.dob), 'MMMM dd')}</p>
              </div>
            ))
          ) : (
            <p>No past birthdays</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventList;
