
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const teamMembers = [
  {
    name: "Freddie Rees",
    role: "Editor-in-Chief",
    bio: "Freddie is truly passionate about Biology and aspires to become a doctor, or maybe a vet.",
    subjects: ["Biology", "Chemistry", "Mathematics"],
    avatar: "/freddie_pfp.jpeg",
    specialty: "Medicine",
    epqLink: "/epq/freddie-rees-epq.pdf",
    linkedinLink: "https://www.linkedin.com/in/freddie-rees-161a2a353/"
  },
  {
    name: "Danny Mellor",
    role: "Writer",
    bio: "Danny is an aspiring biologist driven by a deep fascination for understanding life and research.",
    subjects: ["Biology", "Mathematics", "Psychology"],
    avatar: "/danny_pfp.jpg",
    specialty: "Research",
    epqLink: "/epq/danny-mellor-epq.pdf",
    linkedinLink: "https://www.linkedin.com/in/daniel-mellor-8abb96366/"
  },
  {
    name: "Aditi Deshpande",
    role: "Writer",
    bio: "Aditi has dreamt of becoming a doctor since she was young. She intends to study medicine at University.",
    subjects: ["Biology", "Chemistry", "Mathematics"],
    avatar: "/aditi_pfp.jpeg",
    specialty: "Medicine",
    epqLink: "/epq/aditi-deshpande-epq.pdf",
    linkedinLink: "https://linkedin.com/in/aditi-deshpande"
  },
]

export function Team() {
  return (
    <section id="team" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Meet Our <span className="gradient-text">Student Team</span>
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Passionate A-Level students bringing fresh perspectives to biology news
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.name} 
              className="group hover:shadow-xl transition-all duration-300 animate-scale-in overflow-hidden bg-black border border-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                    />
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h3 className="text-xl text-white font-bold mb-1">{member.name}</h3>
                    <p className="text-primary text-white font-medium">{member.role}</p>
                    <p className="text-sm text-white">{member.specialty}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-white leading-relaxed">
                    {member.bio}
                  </p>

                  {/* EPQ Download Link and LinkedIn */}
                  <div className="pt-2 space-y-1">
                    <div>
                      <a 
                        href={member.epqLink} 
                        className="text-sm text-lime-500 hover:text-lime-400 underline transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download EPQ
                      </a>
                    </div>
                    <div>
                      <a 
                        href={member.linkedinLink} 
                        className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs bg-white text-black hover:bg-gray-100 transition-colors">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
