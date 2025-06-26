
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const teamMembers = [
  {
    name: "Freddie Rees",
    role: "Editor-in-Chief",
    bio: "Freddie is passionate about Biology and aspires to become a doctor.",
    subjects: ["Biology", "Chemistry", "Mathematics"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    specialty: "Genetics & Molecular Biology"
  },
  {
    name: "Danny Mellor",
    role: "Science Writer",
    bio: "Fascinated by ecology and environmental science. Loves exploring the connections between organisms and their environments.",
    subjects: ["Biology", "Geography", "Environmental Science"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    specialty: "Ecology & Conservation"
  },
  {
    name: "Aditi Dishpande",
    role: "Research Editor",
    bio: "Specializes in biochemistry and biotechnology. Always excited about the latest scientific breakthroughs.",
    subjects: ["Biology", "Chemistry", "Physics"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    specialty: "Biochemistry & Biotech"
  },
  {
    name: "Marcus Johnson",
    role: "Content Creator",
    bio: "Interested in human biology and medicine. Creates engaging content about health and disease.",
    subjects: ["Biology", "Psychology", "Chemistry"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    specialty: "Human Biology & Medicine"
  },
  {
    name: "Lily Roberts",
    role: "Podcast Host",
    bio: "Loves communicating science through audio. Specializes in making complex topics accessible and fun.",
    subjects: ["Biology", "English Literature", "Media Studies"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    specialty: "Science Communication"
  }
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
              className="group hover:shadow-xl transition-all duration-300 animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Avatar */}
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover ring-4 ring-background shadow-lg group-hover:ring-primary/20 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-bio-blue-500/20 to-bio-teal-500/20 group-hover:from-bio-blue-500/30 group-hover:to-bio-teal-500/30 transition-all duration-300"></div>
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
