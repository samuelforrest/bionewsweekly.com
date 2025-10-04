import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Linkedin } from 'lucide-react'

const teamMembers = [
	{
		name: 'Freddie Rees',
		role: 'Editor-in-Chief',
		bio: 'Freddie is truly passionate about Biology and aspires to become a doctor, or maybe a vet.',
		subjects: ['Biology', 'Chemistry', 'Mathematics'],
		avatar: '/freddie_pfp.jpeg',
		specialty: 'Medicine',
		linkedinLink: 'https://www.linkedin.com/in/freddie-rees-161a2a353/',
	},
	{
		name: 'Danny Mellor',
		role: 'Content Writer',
		bio: 'Danny is an aspiring biologist driven by a deep fascination for understanding life and research.',
		subjects: ['Biology', 'Mathematics', 'Psychology'],
		avatar: '/danny_pfp.jpg',
		specialty: 'Research',
		linkedinLink: 'https://www.linkedin.com/in/danny-mellor-8abb96366',
	},
	{
		name: 'Aditi Deshpande',
		role: 'Editor',
		bio: 'Aditi has dreamt of becoming a doctor since she was young. She intends to study medicine at University.',
		subjects: ['Biology', 'Chemistry', 'Mathematics'],
		avatar: '/aditi_pfp.jpeg',
		specialty: 'Medicine',
		linkedinLink: 'https://www.linkedin.com/in/aditi-deshpande-176560382/',
	},
]

export function Team() {
	return (
		<section id="team" className="py-24 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background">
			<div className="container px-6 mx-auto">
				<div className="text-center mb-20">
					<div className="inline-block p-1 bg-gradient-to-r from-primary to-green-500 rounded-2xl mb-6">
						<div className="bg-background px-6 py-2 rounded-xl">
							<span className="text-sm font-semibold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
								OUR TEAM
							</span>
						</div>
					</div>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
						Meet Our{' '}
						<span className="bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent">
							Student Team
						</span>
					</h2>
					<p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						3 Passionate A-Level students bringing fresh perspectives to biology news
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
					{teamMembers.map((member, index) => (
						<Card
							key={member.name}
							className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-scale-in"
							style={{ animationDelay: `${index * 0.2}s` }}
						>
							
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							
							
							<div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							
							<CardContent className="relative z-10 p-8">
								<div className="text-center space-y-6">
									
									<div className="relative mx-auto w-32 h-32 mb-6">
										<div className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 rounded-full p-1 group-hover:animate-pulse">
											<img
												src={member.avatar}
												alt={member.name}
												className="w-full h-full rounded-full object-cover border-4 border-background shadow-lg"
											/>
										</div>
									</div>

									
									<div className="space-y-2">
										<h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
											{member.name}
										</h3>
										<div className="space-y-1">
											<p className="text-lg font-semibold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
												{member.role}
											</p>
											<p className="text-sm text-muted-foreground font-medium">
												Specialty: {member.specialty}
											</p>
										</div>
									</div>

									
									<p className="text-muted-foreground leading-relaxed text-center">
										{member.bio}
									</p>

									
									<div className="flex flex-col gap-3 pt-4">
										<div className="flex justify-center">
											<a
												href={member.linkedinLink}
												className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
												target="_blank"
												rel="noopener noreferrer"
											>
												<Linkedin className="w-4 h-4" />
												LinkedIn
											</a>
										</div>
									</div>

									
									<div className="flex flex-wrap gap-2 justify-center pt-4">
										{member.subjects.map((subject, subIndex) => (
											<Badge
												key={subject}
												variant="secondary"
												className="bg-secondary/50 hover:bg-secondary text-secondary-foreground border border-border/50 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
											>
												{subject}
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				
				<div className="mt-20 text-center">
					<div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/5 via-green-500/5 to-emerald-500/5 border border-border/50 rounded-3xl backdrop-blur-sm">
						<h3 className="text-2xl font-bold text-foreground mb-4">We Probably Want You!</h3>
						<p className="text-muted-foreground mb-6">
							We're always looking for passionate biology students to contribute to our mission of making intriguing biology news.
						</p>
						<a
							href="mailto:sam@samuelforrest.me"
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
						>
							<ExternalLink className="w-4 h-4" />
							Get in Touch
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
