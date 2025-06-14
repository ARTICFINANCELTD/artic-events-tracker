const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const customers = [
  { id: 1, name: "Mr Prince", dob: "1971-03-22" },
  { id: 2, name: "Mr Victor", dob: "1971-06-01" },
  { id: 3, name: "Mr Afam", dob: "1971-04-29" },
  { id: 4, name: "Nancy", dob: "1971-01-22" },
  { id: 5, name: "Orbit Montessori School (Mrs Amaka Okorie)", dob: "1972-02-14" },
  { id: 6, name: "Prayota Academy (Michael Igben)", dob: "1968-07-25" },
  { id: 7, name: "Joe Hybrid Int'l Academy (Dr Emejuobi Joseph Ikechukwu)", dob: "1974-04-20" },
  { id: 8, name: "Geomarvel Int'l School (Mrs Abaroaha Georgina)", dob: "1972-06-18" },
  { id: 9, name: "Dazzleville Int'l School (Justina Oritsemisan Omokwe)", dob: "1976-09-19" },
  { id: 10, name: "Shekinah Glory Academy (Amaefule Chinyeaka Gertrude)", dob: "1980-06-25" },
  { id: 11, name: "Dayton Model School (Emanso Udongwo)", dob: "1968-09-15" },
  { id: 12, name: "Crownec Int'l School (Okorome Chinedu)", dob: "1976-06-17" },
  { id: 13, name: "Glory Innovative Academy (Ohioma Gloria)", dob: "1969-09-26" },
  { id: 14, name: "Merecer Int'l Academy (Mr Temple E. Odoko)", dob: "1973-01-15" },
  { id: 15, name: "Amavel Intl School", dob: "1971-07-29" },
  // ✂️ Continue listing remaining customers here...
];

const events = [
  { name: "New Year’s Day", date: "01-01" },
  { name: "International Day of Education", date: "01-24" },
  { name: "Eid el-Fitr", date: "03-31" },
  { name: "Mothering Sunday", date: "03-30" },
  { name: "Good Friday", date: "04-01" },
  { name: "Easter Monday", date: "04-02" },
  { name: "Education for Sustainable Development (ESD) Day", date: "04-22" },
  { name: "Labour Day", date: "05-01" },
  { name: "International Children’s Day", date: "06-01" },
  { name: "Democracy Day", date: "06-12" },
  { name: "International Youth Day", date: "08-12" },
  { name: "World Teachers' Day", date: "10-05" },
  { name: "Independence Day", date: "10-01" },
  { name: "International Literacy Day", date: "09-08" },
  { name: "Christmas Day", date: "12-25" },
  { name: "Boxing Day", date: "12-26" }
];

module.exports = async (req, res) => {
  const today = new Date();
  const todayStr = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const todayBirthdays = customers.filter((cust) => cust.dob.slice(5) === todayStr);
  const todayEvents = events.filter((ev) => ev.date === todayStr);

  const message = `
    <h2>🎉 Today's Celebrations</h2>
    ${todayBirthdays.length ? `<h3>Birthdays:</h3><ul>${todayBirthdays.map((cust) => `<li>${cust.name}</li>`).join("")}</ul>` : ""}
    ${todayEvents.length ? `<h3>Events:</h3><ul>${todayEvents.map((ev) => `<li>${ev.name}</li>`).join("")}</ul>` : ""}
    ${!todayBirthdays.length && !todayEvents.length ? `<p>No birthdays or events today.</p>` : ""}
  `;

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "🎉 Birthday & Event Reminder",
      html: message,
    });

    res.status(200).send("Reminder sent");
  } catch (err) {
    console.error("❌ Email failed", err);
    res.status(500).send("Failed to send email");
  }
};
