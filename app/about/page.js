import Image from "next/image";

const teamMembers = [
  { name: "Darshan H", role: "Student", img: "/darshan.jpeg" },
  { name: "Guru Swarupa", role: "Student", img: "/guru.jpeg" },
  { name: "Kavita Kumari", role: "Student", img: "/Kavita.jpeg" },
  { name: "Gagan Hegde", role: "Student", img: "/gagan.jpg" },
  { name: "Nikhil Kumar", role: "Student", img: "/nikhil.jpeg" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>
      <p className="text-xl text-gray-900 mb-10 max-w-2xl text-center">
        Meet the team behind Fluency! We are passionate about making language learning engaging and accessible.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center">
            <Image
              src={member.img}
              alt={member.name}
              width={120}
              height={120}
              className="rounded-full mb-4"
            />
            <h2 className="text-xl text-black font-semibold">{member.name}</h2>
            <p className="text-gray-900">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
