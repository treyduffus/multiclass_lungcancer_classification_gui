import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileText } from "lucide-react";

const teamMembers = [
  {
    name: "Arley Peter",
    linkedin: "https://linkedin.com/in/arley-peter",
    initials: "AP",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEgto920xEzYw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718930409146?e=1747872000&v=beta&t=XMpGGJDPLIgIAq1_cjtw96nPp1_AoX1HykVs_XmbwsY"
  },
  {
    name: "Kadeem Mighty",
    linkedin: "https://www.linkedin.com/in/kmighty/",
    initials: "KM",
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQFPTbLOMPZq8g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1603827114149?e=1747872000&v=beta&t=sOUWrpkVOj6FjVu0CugUIF4im02x4GLpjg5AxwKMVaU"
  },
  {
    name: "Tremayne Duffus",
    linkedin: "https://www.linkedin.com/in/tremayne-duffus/",
    initials: "TD",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQFvWpjJV35lTQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703268763801?e=1747872000&v=beta&t=YcGfdLyq4MICuJrnb1_okxUhOrL4lEnuXccl1NVFfc0"
  },
  {
    name: "Alejandro Munoz",
    linkedin: "https://www.linkedin.com/in/bs-cs-alejandro-m/",
    initials: "AM",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGqQZ7RwP4rHA/profile-displayphoto-shrink_800_800/B56ZTi6BfwGsAk-/0/1738973650375?e=1747872000&v=beta&t=plZjZZrCT_uAXn3TTk-lSY8AhXs1UQ2xi5dZpGSSn04"
  },
  {
    name: "Elisheva El-Gad",
    linkedin: "www.linkedin.com/in/elisheva-el-gad-525162251",
    initials: "EE",
    avatar: ""
  }
];

const repositories = [
  {
    name: "Web Application",
    url: "https://github.com/treyduffus/multiclass_lungcancer_classification_gui",
  },
  {
    name: "ML Models",
    url: "https://github.com/treyduffus/multiclass_lungcancer_classification_models",
  }
];

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.fau.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.fau.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.fau.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/fau_owl.svg"
            alt="Globe icon"
            width={32}
            height={32}
          />
          Go to fau.edu →
        </a>
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 hover:underline hover:underline-offset-4">
            <Image
              aria-hidden
              src="/team.svg"
              alt="Team icon"
              width={25}
              height={25}
            />
            Our Team
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm mb-3">Team Members</h4>
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <a
                    key={member.initials}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate">{member.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 hover:underline hover:underline-offset-4">
            <Image
              aria-hidden
              src="/github.svg"
              alt="GitHub icon"
              width={16}
              height={16}
            />
            GitHub
          </PopoverTrigger>
          <PopoverContent className="w-59 p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm mb-3">Project Repositories</h4>
              <div className="flex flex-col gap-3">
                {repositories.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{repo.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </footer>
  )
}