import React, { useEffect, useState } from 'react';
import { format, addDays, isWithinInterval } from 'date-fns';

interface Customer {
  id: number;
  name: string;
  dob: string; // Date of Birth in YYYY-MM-DD format
}

const customers: Customer[] = [
  { id: 1, name: 'John Doe', dob: '1990-06-26' },
  { id: 2, name: 'Jane Smith', dob: '1985-07-01' },
  { id: 3, name: "ELITE NURSERY AND PRIMARY SCHOOL(MRS OKAFOR MERCY)", dob: '1971-07-04' },
  { id: 4, name: "ORBIT MONTESSORI SCHOOL(MRS AMAKA OKORIE)", dob: '1972-02-14' },
  { id: 5, name: 'PRAYOTA ACADEMY(MICHAEL IGBEN)', dob: '1968-07-25' },
  { id: 6, name: "JOE HYBRID INT'L ACADEMY(Dr EMEJUOBI JOSEPH IKECHUKWU)", dob: '1974-04-20' },
  { id: 7, name: "GEOMARVEL INT'L SCHOOL(MRS ABARAOHA GEORGINA)", dob: '1972-06-18' },
  { id: 8, name: "DAZZLEVILLE INT'L SCHOOL(JUSTINA ORITSEMISAN OMOKWE)", dob: '1976-09-19' },
  { id: 9, name: "SHEKINNAH GLORY ACADEMY(AMAEFULE CHINYEAKA GERTRUDE)", dob: '1980-06-25' },
  { id: 11, name: "DAYTON MODEL SCHOOL(EMANSO UDONGWO)", dob: '1968-09-15' },
  { id: 12, name: "CROWNEC INT'L SCHOOL(OKOROME CHINEDU)", dob: '1976-06-17' },
  { id: 13, name: "GLORY INNOVATIVE ACADEMY(OHIOMA GLORIA)", dob: '1969-09-26' },
  { id: 14, name: "MERECER INT'L ACADEMY(MR TEMPLE E. ODOKO)", dob: '1973-01-15' },
  { id: 15, name: "VINEYARD INT'L SCHOOL(Barr(Mrs) Chinwe Anekwe)", dob: '1971-09-28' },
  { id: 17, name: "UNIQUE TENDER TOUCH ACADEMY(EPHRAIM STELLA AKUCHINYEREM)", dob: '1973-02-19' },
  { id: 18, name: "GLORYLAND MONTESSORI ACADEMY(MRS BLESSING SAM EGBUSON)", dob: '1971-09-17' },
  { id: 19, name: "GLORIOUS DESTINY ACADEMY(TINA IFEOMA EMMANUEL)", dob: '1978-08-04' },
  { id: 20, name: "TINAMUND STANDARD INT'L SCHOOL(MRS FAUSTINA IWUCHUKWU)", dob: '1975-08-26' },
  { id: 21, name: "MAYA'S ARK ACADEMY(MRS FAITH OTTI)", dob: '1976-08-17' },
  { id: 22, name: "PRIQUEEN INTERNATIONAL SCHOOLS(ELDER PHILIP U. JONES)", dob: '1964-02-26' },
  { id: 23, name: "PROPER LIFE INT'L SCHOOL(Mrs Victoria Mandu Philip)", dob: '1972-02-06' },
  { id: 24, name: "THE FAIR CHILD EDUCATION CENTRE(MRS ISHAKA EZEKWUGO)", dob: '1968-02-19' },
  { id: 25, name: "DONMAY DIVINE INT'L SCHOOL(MRS UGBE VIOLET BRIGGS)", dob: '1966-01-16' },
  { id: 26, name: "DOMINICAN ROYALE INT'L SCHOOL(Dr (Mrs) Nwokedi Cynthia Ulunma)", dob: '1983-04-20' },
  { id: 27, name: "DIAMOND HILL MONTESSORRI(Mrs Esther Faith)", dob: '1966-01-16' },
  { id: 28, name: "LOVE INT'L SCH(Mr Ibikiri Obaka)", dob: '1966-07-16' },
  { id: 29, name: "ONYX MONTESSORRI(Mr Ibikiri Obaka)", dob: '1966-07-16' },
  { id: 30, name: "LORDGUARD INNOVATIVE ACADEMY(Mr Bamidele Tairu Oyedele)", dob: '1973-04-04' },
  // Add more customers here
];

const BirthdayTracker: React.FC = () => {
  const [todayBirthdays, setTodayBirthdays] = useState<Customer[]>([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Customer[]>([]);

  useEffect(() => {
    const checkBirthdays = () => {
      const today = format(new Date(), 'MM-dd');
      const nextWeek = addDays(new Date(), 7);

      const birthdaysToday = customers.filter(customer => format(new Date(customer.dob), 'MM-dd') === today);
      setTodayBirthdays(birthdaysToday);

      const upcoming = customers.filter(customer => 
        isWithinInterval(new Date(customer.dob), { start: new Date(), end: nextWeek })
      );
      setUpcomingBirthdays(upcoming);

      birthdaysToday.forEach(customer => {
        sendNotification(customer.name);
      });
    };

    checkBirthdays();
    const interval = setInterval(checkBirthdays, 24 * 60 * 60 * 1000); // Check every 24 hours

    return () => clearInterval(interval);
  }, []);

  const sendNotification = (name: string) => {
    if (Notification.permission === 'granted') {
      new Notification(`Today is ${name}'s birthday!`);
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      <h1>Today's Birthdays</h1>
      {todayBirthdays.length > 0 ? (
        todayBirthdays.map(customer => <p key={customer.id}>{customer.name}</p>)
      ) : (
        <p>No birthdays today</p>
      )}
      <h2>Upcoming Birthdays</h2>
      {upcomingBirthdays.length > 0 ? (
        upcomingBirthdays.map(customer => (
          <p key={customer.id}>
            {customer.name} - {format(new Date(customer.dob), 'MMMM dd')}
          </p>
        ))
      ) : (
        <p>No upcoming birthdays</p>
      )}
    </div>
  );
};

export default BirthdayTracker;
