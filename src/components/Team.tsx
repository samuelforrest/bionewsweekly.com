
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const teamMembers = [
  {
    name: "Freddie Rees",
    role: "Editor-in-Chief",
    bio: "Freddie is passionate about Biology and aspires to become a doctor.",
    subjects: ["Biology", "Chemistry", "Mathematics"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialty: "Medicine",
    epqLink: "/epq/freddie-rees-epq.pdf",
    linkedinLink: "https://linkedin.com/in/freddie-rees"
  },
  {
    name: "Danny Mellor",
    role: "Writer",
    bio: "Danny is inspired by the cell side of Biology. He aspires to become a marine biologist.",
    subjects: ["Biology", "Psychology", "Mathematics"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specialty: "Cell Biology",
    epqLink: "/epq/danny-mellor-epq.pdf",
    linkedinLink: "https://linkedin.com/in/danny-mellor"
  },
  {
    name: "Aditi Deshpande",
    role: "Writer",
    bio: "Aditi has always dreamt of becoming a doctor since she was four years old.",
    subjects: ["Biology", "Chemistry", "Mathematics"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
              className="group hover:shadow-xl transition-all duration-300 animate-scale-in overflow-hidden bg-black"
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
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
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
                      <Badge key={subject} variant="secondary" className="text-xs">
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
