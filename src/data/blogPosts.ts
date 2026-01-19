export type RawBlogPost = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  cover_image: string | null;
  category: string;
  author: string;
  preview: string | null;
  tags: string[] | null;
  slug: string;
};

export const rawBlogPosts: RawBlogPost[] = [
  {
    id: "0ffa7c5a-c199-4735-ac47-a09924c5710d",
    created_at: "2025-08-15T13:25:09.875Z",
    title: "CRISPR - The evolution of gene editing",
    content: `<p>CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) is a relatively new approach to gene editing discovered in 1980s in bacteria. CRISPR utilises fragments of DNA left from hostile viruses in the bacteria allowing for the recognition, removal and alteration of specific genes.</p><p><br></p><p>It utilises an enzyme known as Cas9 which cuts segments of the DNA in tandem with a guide RNA which recognises the sequence of DNA to be modified. Essentially the guide RNA finds the harmful gene we want to remove, and the Cas9 cuts the DNA to which the gene is modified</p><p><br></p><p><br></p><p>So why is this so exciting? Well CRISPR holds several benefits other gene editing methods do not possess; it is both extremely accurate and efficient in gene modification while having the added bonus of being cheaper than other methods.</p><p>The fundamental use of CRISPR could be wide spread over various industries: in particular medicine and agriculture.</p><p><br></p><p><br></p><p>Medically the obvious benefit is that we now have a tool by which we could potentially eradicate hereditary diseases. Increasingly in recent years the application towards cancer technology has also expanded, CRISPR targeting malicious tumours with increased accuracy. CRISPR could also yield greater efficiency in drug development times further emphasising its use in the cure of several currently untreatable conditions.</p><p><br></p><p>Agriculturally, genetically modified crops assist in our adaptation towards climate change, producing more drought and pest resistant crops. Similarly animals can be modified to be heathier, lead a higher quality of life, and produce a better quality produce.</p><p><br></p><p>While CRISPR does have several ethical dilemmas, such as the modification of embryos and potential bioterrorism scares, it offers an unprecedented tool for humanity to fight some of our most pressing issues, proving one of the most fascinating biological projects of recent years</p>`,
    cover_image:
      "https://static.scientificamerican.com/sciam/cache/file/18015641-8D4B-4F1B-ADEC0DEA56DDB8FC_source.jpg?w=1000",
    category: "Medicine",
    author: "Freddie Rees",
    preview:
      "What is CRISPR and how is it revolutionising modern science and medicine?",
    tags: ["DNA"],
    slug: "crispr---the-evolution-of-gene-editing",
  },
  {
    id: "65854993-e92d-4566-bbb7-3a69ddb79f65",
    created_at: "2025-09-05T17:38:49.593Z",
    title: "Assisted Dying: Rethinking the 6-Month Rule",
    content: `<p>Across the world, laws around euthanasia and assisted dying are some of the most restrictive in healthcare. For patients living with chronic or terminal illness, this creates an impossible reality: they are forced to endure daily suffering with very few choices about how their life might end. Only six countries currently permit assisted dying, and even then, many impose strict rules.</p><p>&nbsp;</p><p>Take Oregon, for example. There, assisted dying is only allowed if a doctor predicts you have six months or less to live. The UK is considering a similar model. On the surface, this seems like a cautious compromise-but in reality, it risks being deeply unfair. After all, suffering is not defined by a stopwatch. A person in relentless pain but expected to live for years still experiences unbearable suffering. Why should they be excluded?</p><p>&nbsp;</p><p>Belgium has taken a different route: assisted dying is available to anyone with "unrelievable mental or physical suffering," regardless of how long they have left. This approach recognises that autonomy, dignity, and relief from pain matter just as much as clinical timelines. It also addresses the slippery slope argument often raised in opposition-showing that safeguards can exist without being unnecessarily limiting.</p><p>&nbsp;</p><p>The current UK healthcare system adds another layer to this debate. Palliative care, which should provide comfort at the end of life, is inconsistent and underfunded. Costs range wildly between GBP 50 and GBP 2,000 per patient per year, and many people die without receiving proper support. In fact, of the 650,000 people who die each year in the UK, nearly half a million need palliative care-but more than 100,000 never receive it. It's no surprise then that some people turn to desperate measures, ending their lives alone and traumatically.</p><p>&nbsp;</p><p>Would legalising assisted dying ease this strain-or make it worse? Some argue it could free up resources. Others worry it would divert attention and money away from improving palliative care, leaving patients feeling pressured to choose death over inadequate support. There's also the risk of medical authority being misused, or vulnerable people feeling coerced.</p><p>&nbsp;</p><p>Ultimately, this debate sits at the intersection of ethics, medicine, and human rights. Life has sanctity, but so does dignity. If healthcare is truly patient-centred, then both strong palliative care and fair, well-regulated assisted dying laws need to coexist. Suffering is suffering, and patients deserve options-not restrictions based on arbitrary timelines.</p>`,
    cover_image:
      "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20240413_BRD001.jpg",
    category: "Assisted Dying",
    author: "Aditi Deshpande",
    preview:
      "Only six countries currently permit assisted dying, and even then, many impose strict rules.",
    tags: ["Assisted Dying"],
    slug: "assisted-dying-rethinking-the-6-month-rule",
  },
  {
    id: "c99e5f25-f49d-45e0-af9b-84c38009388b",
    created_at: "2025-07-02T07:59:15.258Z",
    title: "An Ozempic epidemic?",
    content: `<h1>An Ozempic epidemic?</h1><p><br></p><p>In the last year, a new medication has been taking the public by storm, however what is this miracle drug, and how could it prove and issue?</p><p><br></p><p>Ozempic is their brand name for semaflutide, it is intended as a treatment for<strong> type 2 diabetes</strong> - helping people manage their fluctuating blood sugar levels, and is intended to be taken in tandem with insulin <strong>once a week.</strong></p><p><br></p><p>Ozempic functions by increasing incretins, hormones which are naturally produced by the stomach. This hormone helps the body increase insulin concentration and helps the liver store more glucose<strong> lowering blood sugar levels.&nbsp;</strong></p><p><br></p><h2>Alternate Ozempic Use</h2><p><br></p><p>Ozempic reduces appetite and slows digestion making it an extremely effective weight loss drug. Users can lose up to <strong>10-15%</strong> of their body weight. It does have its benefits lowering the risk of heart disease, stroke and kidney failure.</p><p><br></p><p>Results remarkably only need two months to begin to show and thus, Ozempic is being treated as a sort of "miracle drug" - easy weight loss without the arduous burden of consistent exercise which holds so many back.</p><p><br></p><p>&nbsp;</p><h2>What's the issue then?</h2><p><br></p><p>If a drug can lead to both weight loss and health benefits then surely it presents very little in the way of an ethical dilemma, however whether the use of Ozempic for weight loss is far more complex.&nbsp;</p><p><br></p><p>Of course as with any drug there are risks of adverse side effects: Nausea, fatigue and in rare cases thyroid issue are known to arise.</p><p><br></p><p>However the real ethical dilemma occurs due to the very nature of Ozempic, the drug is used and endorsed by celebrities for its weight loss properties. This reinforces unrealistic body standards upon primarily the youth, leading to many leading unhealthy lifestyles to achieve such a physique potentially promoting anorexia and body dysmorphia upon vulnerable groups.</p><p><br></p><p>In the UK Ozempic costs<strong>&nbsp;GBP 180</strong> on average for four months treatment. After treatment stops, appetite returns and weight gain almost always ensues. In the US a months treatment costs upwards of a <strong>thousand dollars</strong>. People are spending extortionate sums of money to achieve such physiques, which especially amidst a cost-of-living crisis deprives people of basic necessities as they strive for an "easy-route to a better body".</p><p><br></p><p>Finally the high demand for Ozempic limits its use as a drug for its'' intended purpose - diabetes; this limits people who need the medication to live from accessing it, while wealthier people purchase huge amounts for purely cosmetic reasons.</p><h2><br></h2><h2>Should Ozempic be used?</h2><p><br></p><p>Ozempic has undoubtably changed lives, both of diabetics and people uncomfortable in their bodies. However new medications are arising that achieve the same results as Ozempic without taking the medication from those who need it.&nbsp;</p><p><br></p><p>We should not reinforce the need to take a new drug to feel good about your body, exercise and commitment remain a desirable, more long-lasting albeit far more challenging route to weight loss.</p><p><br></p><p><br></p><h3>Like what you read?</h3><p><br></p><ul><li>Log in or Sign up to like or comment.</li><li>View some other articles</li><li>Join the team - email: sam@samuelforrest.me</li></ul>`,
    cover_image:
      "https://images.ctfassets.net/4w8qvp17lo47/1zQR5yCn0GR82g3AVlC5oz/56627950bf2b2a11546dbdaa03cad4ee/ozempic_screenshot.jpg",
    category: "Drugs",
    author: "Freddie Rees",
    preview:
      "How does the rise in Ozempic affect people? Are we in an epidemic?",
    tags: ["Drugs", "Oxempic"],
    slug: "an-ozempic-epidemic",
  },
  {
    id: "d191f43a-efb3-4d0e-9b2b-e7785d768998",
    created_at: "2025-07-08T14:07:35.052Z",
    title: "The World's Largest Bacteria: the size of an Eyelash",
    content: `<h1>Thiomargarita Magnifica</h1><p><br></p><p>In 2022, within the mangrove forest of Guadeloupe, a Caribbean island, the world's largest bacterium was discovered. Thiomargarita magnifica is over a centimetre in length, visible to the naked eye. This bacterium is approximately the size of the average eyelash, easily capable of being picked up with tweezers, and over 5000 times the size of the surrounding microscopic bacterium. This unique discovery has rethought the boundaries of unicellular life and flushed a wave of shock throughout the field of biological science.</p><p><br></p><p>Previously, this record was held by a giant sulfur bacterium discovered in the Shelf Sediments of Nambia. However, T. magnifica has conquered this score by over 10 times.</p><h2><br></h2><p>Dr Jean-Marie Volland, lead author of a paper surrounding this titan bacteria states how 'most bacterial cells are microscopic, and measure around two thousandths of a millimetre in length.' This shows how this discovery is restructuring microbiology as we know it, and 'while there are some exceptionally sized bacteria which can measure several hundred micrometres, these remain within the theoretical limit of how large these organisms can grow. T. magnifica, however, is significantly above this limit. When compared to most bacteria, it would be like a human encountering another human as tall as Mount Everest.'</p><p><br></p><h2>How does it get so large?</h2><p><br></p><p>Since most prokaryotes tend to be microscopic, they can rely on diffusion to transport material for respiration and other molecular processes. However, diffusion is only effective over microscopic distances, which limits the size to which prokaryotes can grow, so how has T. magnifica overcome this limitation? Well, this is done the same way as algae. Algae is the largest unicellular eukaryote, with some cells growing up to 30 centimetres in diameter, and what do Algae and T. magnifica have in common? They both live and grow in marine environments rich with minerals and organic matter. T. magnifica accumaltes on surfaces and decays all these nurtients, producing sulphide and growing their internal structure. This is due to T. magnifica being a sulphide oxidising bacteria.</p><p><br></p><h2>Why is it so unique?</h2><p><br></p><p>Whats also interesting about this bacterium is its complexity. T. magnifica has an interesting method of storing DNA. In the majority of other microbes, DNA floats freely within the cell's cytoplasm, however, T. magnifica stores it's DNA in membrane bound compartments, similar to how animal and plant cells store their DNA in nuclei. Scientists have decided to name these organelles 'Pepins', conveying how organisms containing pepins remain prokaryotic.</p><p><br></p><h3><strong>Like what you read?</strong></h3><p><br></p><ul><li>Log in or Sign up to like or comment.</li><li>View some other articles</li><li>Join the team - email: sam@samuelforrest.me&nbsp;</li></ul>`,
    cover_image:
      "https://earthsky.org/upl/2022/06/Thiomargarita-magnifica-bacterium-filament.jpg",
    category: "Microbiology",
    author: "Danny Mellor",
    preview:
      "Thiomargarita Magnifica, found in the mangrove forests of Guadelope has broken the record for the largest bacterium, measuring over a centimetre in length and visible to the human eye.",
    tags: null,
    slug: "the-worlds-largest-bacteria-the-size-of-an-eyelash",
  },
  {
    id: "d7a63620-3c74-42e7-ba4d-6f3c4bf51d2b",
    created_at: "2025-07-02T12:41:53.799Z",
    title: "Synthetic Biology: Cellular, Organisms and Bioethics",
    content: `<h1>Synthetic Biology - Artifical Life</h1><p><br></p><p>Imagine a world where we could understand every cell completely, capable of comprehending all fundamental principles of life and survival. With this deep knowledge and experience, we would be able to not only design, but create our very own artificial organisms.</p><p><br></p><h2>Cellular Progression</h2><p><br></p><p>Let's magnify our focus down to a single minimal cell. Recently, scientists have began to realise this potential, synthesising and engineering a new and unique cell, titled JCVI-syn3A, consisting of only the most essential genes for life. Since its creation, biologists have remained persistent with research. JCVI-syn3A demonstrates a controlled and simple biological model, allowing researchers to meticulously study into myriads of cellular processes. However, this is only the start of this scientific journey, soon to sprout into and transform our understanding of protein synthesis, evolutionary analysis, and even showing potential in epigenetics.</p><p><br></p><h2>Where Can This Take Us?</h2><p><br></p><p>By combining our newfound understanding of synthetic biology with advanced technology and artificial intelligence, we are now approaching the light at the end of the tunnel of artificial life, soon to transform our world as we know it, but will this be for the better?</p><p><br></p><h2>The Ethical Debate</h2><p><br></p><p>What defines the division between 'natural' and 'artificial'? Many argue an organism should have undergone evolution to be considered natural, when others believe that we should focus more on an organisms properties than its origin. Synthetic biology also tends to raise the question; Is the human creation of life 'playing God'? Many believe synthetic life to be a form of blasphemy, reducing God's creation to mere materialistic chemical interactions. However, other counter this, conveying this intensive research purely shines light on life's complexity, rather than diminishing it.</p><p><br></p><h2>Conclusion</h2><p><br></p><p>Scientists must also consider the long-term implications, such as the effects of these artificial organisms on our plant's environment and food chains, ensuring they are careful to maintain and protect life. Looking from the opposite perspective however, new organisms could be introduced with specific niches designed to stabilise an already insecure ecosystem.</p><p><br></p><h3><strong>Like what you read?</strong></h3><p><br></p><ul><li>Log in or Sign up to like or comment.</li><li>View some other articles</li><li>Join the team - email: sam@samuelforrest.me</li></ul>`,
    cover_image:
      "https://api.army.mil/e2/c/images/2016/11/10/456840/max1200.jpg",
    category: "Bioengineering",
    author: "Danny Mellor",
    preview:
      "How close are we to creating Artificial Life? Recent progression into synthetic biology detailed.",
    tags: ["Synthetic Biology", "Artificial Life", "Bioethics"],
    slug: "synthetic-biology-cellular-organisms-and-bioethics",
  },
  {
    id: "e31dcc4a-e94a-4172-8ba6-17b05972cf55",
    created_at: "2025-09-04T18:34:20.441Z",
    title: "Will Bioluminescence light our future?",
    content: `<h1>What is Bioluminescence?</h1><p><br></p><p>Bioluminescence is a biochemical phenomenon by which living organisms produce visible light through enzyme-catalysed oxidation reactions. These typically involve a specific substrate called <strong>Luciferin</strong>, and the complimentary enzyme <strong>Luciferase</strong>. This process occurs only in the presence of oxygen, overall generating a <strong>cold light </strong>(less than 20% of energy is released as heat). Bioluminescence can be found in a diverse variety of life forms, predominantly marine life. In the ocean, you are most likely to encounter Blue or Blue-Green light, since this wavelength travels the farthest through water. On land, it's often yellow or green, shown by the iconic firefly.&nbsp;</p><p><br></p><h2>What is its Purpose?</h2><p><br></p><p>Functionally, bioluminescence serves a variety of ecological roles, including camouflage via counterillumination, defence, attracting prey, and even intraspecies communication!</p><p><br></p><h2>Can it replace modern lighting?</h2><p>Theoretically, there is strong possibility of bioluminescence replacing modern city lighting. Scientists have already created glowing plants using genes from bioluminescent organisms, as well as using glowing bacteria in temporary light installations, and on top of this, bioluminescence requires minimal energy, a perfect alternative to modern electrically powered lighting! Overall, a reduction in CO2 emissions will transpire, forming a more sustainable world. However, it's certainly not flawless. In order to occur, bioluminescence requires highly controlled temperatures and extremely low light intensity. Bioluminescence is also drastically dim, unable to safely perform the function of a modern streetlight. In addition, a challenge is finding a way to easily turn the light source on and off, and finally, the living systems containing the reaction are bound to degrade and die.</p><p><br></p><h2>Conclusion</h2><p>In conclusion, Bioluminescence is not currently a viable option for urban lighting with current technology, but its very possible that we may be seeing sustainable bioluminescent elements incorporated into urban settings in the future.</p>`,
    cover_image:
      "https://media.springernature.com/w580h326/nature-cms/uploads/collections/BILU_Hero_image-9377add4a16d25079b2aac86ab84690b.jpg",
    category: "Biochemistry",
    author: "Danny Mellor",
    preview:
      "The use of bioluminescence in humanity stretches centuries back, proving convenient for navigation and providing light. In the modern day, the cool glow of bioluminescence entangles masses of researchers from across the globe, showing extraordinary potential in replacing modern lighting.",
    tags: ["Marine Biology", "Biochemistry", "Microbiology"],
    slug: "will-bioluminescence-light-our-future",
  },
];

export default rawBlogPosts;
