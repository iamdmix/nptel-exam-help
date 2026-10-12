// Imports the NPTEL "Research Methodology" course (Weeks 1-12) with the official
// accepted answers exactly as pasted by the user.
// Week 12 answers are NOT yet available -> marked unverified with empty options/answer.
// Run: node scripts/load-research-methodology.js
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'data', 'courses.json')

const NOTE = 'Accepted answer as per the official NPTEL assignment evaluation.'

const PASSAGE_ENGINEERS = `Engineers and Scientists

We live in a world that is filled with a wide range of technologies that we use and we take for granted. The speed with which new technologies appear and disappear is constantly increasing. These days many of the gadgets we buy get outdated in a time frame of two to three years. This is a short time frame since many of the technologies in use are robust enough to physically last several years. However, in terms of features and utility, they get outdated much sooner than that. This is also a short time frame relative to how long technologies were used two or three decades ago. An example is the media used to store music. While gramophone records and cassettes lasted decades, DVDs have fast disappeared. Almost any mobile phone or computer purchased these days become obsolete in two to three years.

Behind this vast moving world of technologies, is a worldwide army of scientists and engineers. They are constantly on the prowl for making advances to existing technologies. Many industries, companies, and educational institutions are filled with scientists and engineers. While there may be some similarities in the tasks they are involved in, there are also some differences.

An engineer in an industry setting usually faces several technical trouble shooting challenges. Such challenges, with stiff timelines, require substantial familiarity with information databases, and characterization techniques, to be successfully addressed. Addressing trouble shooting challenges are often based on the selection and use of the best available resources and substitutes. The types of questions the engineer is faced with include questions of the sort:

1. Is there a lighter material readily available which can replace the existing material in the product?
2. Why is a specific batch of the product not as good as another batch?
3. Will it be possible for this product to function with lesser parts than it currently has?

Answers to such questions enable the industry meet the demands of their customers at lower costs and with greater reliability.

A scientist in a university or laboratory setting faces a different kind of challenge. The questions the scientist wishes to answer are:
1. Why is the value of any specific property of a material what it is?
2. What is the fundamental science behind the property?
3. What are the limits, if any, to this property?

Answers to such questions enable one to design new materials and to push the capabilities of existing materials.

Based on the professional setting a materials specialist ends up in, he/she will likely get pulled into one of the above types of activities. However, having both - a good feel for the fundamental sciences, as well as an understanding of the engineering approach to relate to the real world, can greatly enhance the value of a materials scientist/engineer to his or her organization.

At the same time, it usually takes considerable experience to fully understand, appreciate, and make use of the linkages between fundamental science and the world of engineering. Experience and systematic studies provide us with the insight to make the connections between the real-world inventions and the science behind them. Such insight helps us truly appreciate the contributions of the scientist as well as the engineer in shaping our interactions with the world around us. Such insight also enables us to take our technical pursuits to greater heights and wider reaches, and hence is desirable.`

const PASSAGE_GLOBAL_WARMING = `Global warming refers to the idea that the temperature of the planet is, on average, increasing. It is a topic of considerable discussion and debate internationally because there are differing views on the severity of the phenomenon, the cause for the phenomenon, remedial measures to be considered and the financial impact of such remedial measures.

There is very strong experimental evidence that global warming is a real phenomenon. 10 of the hottest years recorded in history have all occurred in the last 15 years or so.

There is also strong reason to believe that the amount of carbon dioxide in the atmosphere, directly impacts the raise in temperature observed globally. This evidence can be seen in the strong correlation between temperature and atmospherical carbon dioxide data collected in the past nearly 60 years, as well as in the temperature and carbon dioxide data that can be obtained for more than 100,000 years, from ice core samples obtained from Antarctica.

Based on energy usage patterns as well as the amount of carbon dioxide released as a function of the energy usage, it is possible to see how human activity can impact carbon dioxide content in the atmosphere in a significant manner. In fact a simple calculation will show that with the present level of energy usage, assuming all of it is from crude oil, the amount of carbon dioxide in the atmosphere will double in less than 100 years.

In addition to carbon dioxide, there are other gases as well that can accelerate global warming, some much more severely than carbon dioxide. However in terms of sheer quantity in the atmosphere, carbon dioxide is the most significant contributor to global warming.

The controversy over what needs to be done to combat global warming, is purely one of short term economic impact. Nations which release the most carbon dioxide total, as well the most carbon dioxide per-capita, are both reluctant to take measures to curb the release of carbon dioxide since it impacts quality of life of their populations in the short term. However there is grave danger in assuming such a short term outlook to this issue. If this issue is not addressed urgently, the planet may become unliveable in a relatively short time and at that point, with the very existence of humanity in question, it will look completely absurd to place a few comforts above survival of the planet.

Nature controls us indirectly by causing severe weather patterns that shut down cities for days and months. It is much more prudent that we address this issue on our initiative rather than wait for nature to complete the arguments in this context.`

const PASSAGE_ETHICS = `Few research scholars collaborated to work on some specific area. They generated some data and analysed the results. Some of them published the result independently since they were the first to type it up.`

const TF = ['True', 'False']

function q(id, type, question, options, answerIdx, context) {
  return {
    id,
    type,
    question,
    options,
    answer: answerIdx.map((i) => options[i - 1]),
    explanation: NOTE,
    ...(context ? { context } : {}),
  }
}

const weeks = []

// ---------------- WEEK 1 ----------------
weeks.push({
  weekNumber: 1,
  title: 'Week 1: Overview of Research',
  questions: [
    q('w1q1', 'multiple_choice', 'What sets a PhD apart from other degrees?', [
      'Focus on practical skills and hands-on experience.',
      'Development of critical thinking and analytical abilities.',
      'Preparation to guide others in pursuing a PhD.',
      'Completion of coursework and examinations.',
    ], [2, 3]),
    q('w1q2', 'single_choice', 'What distinguishes a research-based degree from a typical undergraduate degree?', [
      'Clear and defined boundaries throughout the degree program.',
      'Opportunities for continuous discovery and learning.',
      'Graduation day marking the completion of the degree.',
      'Acquisition of expertise and recognition in a specific field.',
    ], [2]),
    q('w1q3', 'single_choice', 'What is the importance of attitude and communication in the student-advisor relationship?', [
      'Having prior knowledge is the most important factor for a student to work towards a PhD.',
      'Advisors expect students to define their own research problems without any guidance.',
      'Students should choose advisors based on their reputation and availability.',
      'Attitude, inclination to learn, and effective communication with the advisor are crucial.',
    ], [4]),
    q('w1q4', 'single_choice', 'What makes research challenging for first-time researchers?', [
      'The need to handle routine work and drudgery.',
      'The sudden shift in patterns from coursework to research.',
      'The discovery process involved in understanding the research process.',
      'The pressure to obtain a degree and complete the research process.',
    ], [2]),
    q('w1q5', 'single_choice', 'What is one advantage of research when dealing with failure?', [
      'Research allows for changing initial assumptions and exploring different approaches.',
      'Research ensures that failures are minimized and success is guaranteed.',
      'Research provides a predefined path to follow, for sure eliminating the possibility of failure.',
      'Research discourages any changes in assumptions or approaches to maintain consistency.',
    ], [1]),
    q('w1q6', 'single_choice', 'When conducting experiments and analysing results in research:', [
      'Each individual step will always lead to something significant.',
      'The familiarity with the area helps in building experiments, but the results are often insignificant.',
      'Day-to-day experiments and results are usually significant and groundbreaking.',
      'Small steps are taken, and over time they contribute to something significant.',
    ], [4]),
    q('w1q7', 'single_choice', 'Technologies in use today have life span of decades', TF, [2], PASSAGE_ENGINEERS),
    q('w1q8', 'single_choice', 'Engineers aim to reduce the number of parts in a product', TF, [1], PASSAGE_ENGINEERS),
    q('w1q9', 'single_choice', 'Global warming is only a theoretical phenomenon', TF, [2], PASSAGE_GLOBAL_WARMING),
    q('w1q10', 'single_choice', 'Carbon dioxide in the atmosphere contributes to global warming', TF, [1], PASSAGE_GLOBAL_WARMING),
  ],
})

// ---------------- WEEK 2 ----------------
weeks.push({
  weekNumber: 2,
  title: 'Week 2: Literature Survey, Experimental skills',
  questions: [
    q('w2q1', 'single_choice', 'Experimental data generated from a setup must validate the theoretical predictions or models designed for that setup', [TF[0], TF[1], 'Sometimes', 'Never'], [3]),
    q('w2q2', 'multiple_choice', 'Literature survey is important because', [
      'It helps in getting a summary of work that has been done till date in some particular research area',
      'It is helpful in ensuring that a research work is not getting repeated',
      'It is helpful in understanding the approaches taken by scientists and what are the gaps in the processes',
      'It is helpful in clarifying the controversial results that one can get',
    ], [1, 2, 3, 4]),
    q('w2q3', 'single_choice', 'Which of the following methods of searching for literature is suitable to identify the earliest contributor of a scientific outcome?', [
      'Keyword based search followed by sorting by year of publication',
      'Citation based search followed by sorting by year of publication',
      'Keyword based search followed by sorting by citations',
      'Back reference based search following a keyword based search',
    ], [4]),
    q('w2q4', 'single_choice', 'Which of the following bibliographic details is a sufficient and unique piece of information to locate an article in an archival journal?', [
      'ISSN',
      'DOI',
      'Page Number',
      'Volume Number',
    ], [2]),
    q('w2q5', 'single_choice', 'Which of the following is always true for an open access journal?', [
      'Such journals are not peer reviewed',
      'Articles in such a journal are freely available for download',
      'Such journals charge for publication of an article',
      'Such journals are of dubious reputation',
    ], [2]),
    q('w2q6', 'single_choice', 'Which of the following is NOT a recommended practice to identify publications that need to be listed under references of an article?', [
      'Relevant publications actually referred to',
      'Latest publications by the editor of the journal',
      'Original publications in the topic of the article',
      'Own publications referred in the article for further details',
    ], [2]),
    q('w2q7', 'single_choice', 'Which of the following indices is considered as a measure of the impact of a particular author in its area of his/her specialization?', [
      'Total number of articles published',
      'Hirsch index of the author',
      'Number of views of his/her latest article',
      'Number of downloads of all articles in a year',
    ], [2]),
    q('w2q8', 'multiple_choice', 'The following are categorized as primary source for literature survey', [
      'Periodicals & research reports',
      'Conference proceedings & official publications',
      'Compilations & reviews',
      'Directories & year books',
    ], [1, 2]),
    q('w2q9', 'multiple_choice', 'The abstracting databases for systematic manual searches include', [
      'INSPEC and COMPENDEX',
      'PubMed',
      'Wikipedia',
      'Chemical Abstract (CA) service',
    ], [1, 2, 4]),
    q('w2q10', 'single_choice',
      'Consider that you have collected the following resources towards your research:\n(1) A reference in a journal article that you have not referred yet\n(2) A link to the website of a professional society\n(3) A published article with journal, year, volume and page number\n(4) An article from a newly launched journal with volume number, page number but year and ISSN number are due\n(5) A newly accepted journal article with DOI link\n(6) A book with an ISBN number available\n\nWhich of the following can be considered as archival (valuable record) references for inclusion in a publication?', [
      'Only 1, 2 and 3',
      'Only 3, 5 and 6',
      'Only 3, 4 and 6',
      'Only 1, 2 and 5',
    ], [2]),
  ],
})

// ---------------- WEEK 3 ----------------
weeks.push({
  weekNumber: 3,
  title: 'Week 3: Data analysis and Modelling skills',
  questions: [
    q('w3q1', 'multiple_choice', 'Safety must be the most important discipline of our routine when we are in laboratory or industrial environment. The common sources which have potential to cause damage, available in our lab towards which we need to be careful are-', [
      'Sources of heat',
      'Chemicals (Acids, Bases etc.)',
      'Pressurized gas cylinders',
      'Electricity and water source',
    ], [1, 2, 3, 4]),
    q('w3q2', 'single_choice', 'Which of the following statistics is used to quantify errors in parameter estimates?', [
      'Mode',
      'Skewness',
      'Standard deviation',
      'Median',
    ], [3]),
    q('w3q3', 'single_choice', 'A temperature sensor is installed at the bottom of the cooling tower storage tank to measure the temperature of outlet water. The sensor did not function properly for some time and gave data with higher temperature values. The conclusion we can draw from the process is-', [
      'Since data with different values were recorded, this increased the possibility of wide analysis thus very useful for our work',
      'The data obtained cannot be reliable because these are not true data from the system but the malfunctioned one',
      'The data can be used as with good accuracy using the predictive type data analysis where we can assume the extent of error and finally subtract the error from final value',
      'None of these',
    ], [2]),
    q('w3q4', 'single_choice', 'Which of the following can be treated as deterministic signals?', [
      'Measurements of atmospheric temperature',
      'A sine wave corrupted by a rectangular pulse',
      'Estimates of signals from measurements',
      'None of the above',
    ], [2]),
    q('w3q5', 'multiple_choice', 'Identify the incorrect statement(s) among the following w.r.t. non-linear models.', [
      "Linearization involves mere discarding of the non-linear terms in a model.",
      "The standard Taylor's series-based linearized model changes with the nominal point of linearization.",
      'A non-linear model can never yield a zero-valued output to a non-zero input.',
      'Estimates of linear models have smaller errors than those of non-linear models.',
    ], [1, 3, 4]),
    q('w3q6', 'single_choice', 'Which of the following transforms are used to detect periodic (oscillatory) components in a signal?', [
      'Hilbert transform',
      'z-transform',
      'Fourier transform',
      'All of the above',
    ], [3]),
    q('w3q7', 'single_choice', 'The ratio of errors in parameter estimates of a model from two data sets with SNR 9 and 100 is', [
      '3 : 10',
      '5 : 1',
      '10 : 3',
      '10 : 0.9',
    ], [3]),
    q('w3q8', 'single_choice', 'Which of the following is true concerning a parameter estimate?', [
      'It is in general close to the true value with high probability.',
      'When averaged across a million experimental records under same operating conditions, the estimate equals the true value.',
      'Least squares method always gives the estimate with lowest error.',
      'It is a mathematical function of the observations.',
    ], [4]),
    q('w3q9', 'multiple_choice', 'Which of the following statements is true?', [
      'Deterministic phenomena produce outcomes that can be predicted accurately.',
      'Random processes occur randomly.',
      'A process can produce a mix of deterministic and stochastic effects.',
      'Signals that are random can never take negative values.',
    ], [1, 3]),
    q('w3q10', 'single_choice', 'An estimator is said to be most efficient when', [
      'The parameters can be estimated in the least possible time.',
      'The estimator provides accurate estimates with the smallest number of observations.',
      'Standard error in the parameter estimates is lowest when compared to that of all other estimators.',
      'It estimates parameters accurately even in presence of outliers.',
    ], [3]),
  ],
})

// ---------------- WEEK 4 ----------------
weeks.push({
  weekNumber: 4,
  title: 'Week 4: Technical presentation and writing',
  questions: [
    q('w4q1', 'multiple_choice', "The title of a paper is 'Battery design and its impact'. This title", [
      'Identifies the area of research clearly',
      'Indicates what is unique about the research',
      'Does not identify the area of the research clearly',
      'Does not indicate what is unique about the research',
    ], [3, 4]),
    q('w4q2', 'single_choice', 'In images', [
      'High magnification implies high resolution',
      'High magnification does not necessarily imply high resolution',
      'Low magnification implies high resolution',
      'High resolution implies low magnification',
    ], [2]),
    q('w4q3', 'single_choice', 'Tables are preferred over graphs', [
      'Always',
      'Never',
      'Only when exact values need to be indicated',
      'Only when trends in data need to be indicated',
    ], [3]),
    q('w4q4', 'multiple_choice', 'The length of a document', [
      'Indicates how much you know',
      'Indicates how little you know',
      'Does not indicate anything about your knowledge',
      "Does not indicate anything about the reader's knowledge",
    ], [3, 4]),
    q('w4q5', 'single_choice', 'The title of a paper should indicate the area of work as well as what is unique about the work.', TF, [1]),
    q('w4q6', 'single_choice', 'In scientific documents sentences should be relatively short and to the point.', TF, [1]),
    q('w4q7', 'multiple_choice', 'In an article, the image of a car engine must', [
      'Show the level of detail required for the discussion in the article',
      'Have a marker bar indicating scale',
      'Be in colour and not in black and white',
      'Be in black and white and not in colour',
    ], [1, 2]),
    q('w4q8', 'multiple_choice', 'Strategies one can use in the middle of a document include', [
      'Chronological strategy',
      'Spatial strategy',
      'Following a variable',
      'Suspense strategy',
    ], [1, 2, 3]),
    q('w4q9', 'single_choice', 'While working with electricity only the voltage poses a danger to the users', TF, [2]),
    q('w4q10', 'single_choice', '“Pouring rain results in clogged drains, and slippery roads. These clogged drains spill further water on to the roads.” Use of the word ‘these’ in the previous sentence is ambiguous.', TF, [2]),
  ],
})

// ---------------- WEEK 5 ----------------
weeks.push({
  weekNumber: 5,
  title: 'Week 5: Creativity in research',
  questions: [
    q('w5q1', 'multiple_choice', "According to Sternberg's theories of intelligence practical intelligence relates to-", [
      'How one relates to the environment around them',
      'How street smart they are',
      'How well they come up with new theories',
      'How well they solve new problems',
    ], [1, 2]),
    q('w5q2', 'single_choice', 'Few research scholars collaborated to work on some specific area. They generated some data and analysed the results. Some of them published the result independently since they were the first to type it up. Is it ethical to do so?', [
      'Yes, because they have collaborated and know each other',
      'No, all authors should know and agree with the publication',
      'Yes, if the collaborators are junior to you',
      'No, only if the authors are senior to you',
    ], [2], PASSAGE_ETHICS),
    q('w5q3', 'single_choice', 'Creativity is seen in', [
      'Drama',
      'Science fiction',
      'Engineering',
      'All of the above',
    ], [4]),
    q('w5q4', 'single_choice', 'A good researcher is often well read in many areas', TF, [1]),
    q('w5q5', 'single_choice', 'We can work to the best of our potential when we are —', [
      'Hypo stressed',
      'Eustressed',
      'Hyper stressed',
      'Distressed',
    ], [2]),
    q('w5q6', 'multiple_choice', 'The measure of a successful researcher is that the work of the researcher should be', [
      'Recognized by peers at an international level',
      'Typically published in peer reviewed Journals',
      'Mentioned in the campus magazine of the college',
      "Must be discussed in the Department meeting of the researcher's department",
    ], [1, 2]),
    q('w5q7', 'multiple_choice', 'Creative people are', [
      'More likely to follow societal restrictions',
      'Less likely to follow societal restrictions',
      'More likely to think within the limits of previous work in the area',
      'More likely to come up with a surprisingly new solution to a problem',
    ], [2, 4]),
    q('w5q8', 'single_choice', 'A PhD usually makes you', [
      'A specialist in one narrow area',
      'A person who conducts experiments fast',
      'A person who has a wide knowledge in a wide range of topics',
      'A person who makes excellent sketches',
    ], [1]),
    q('w5q9', 'multiple_choice', 'To become a good researcher, one must usually', [
      'Have good communication skills',
      'Have mastery over specific techniques',
      'Have a line of investigation',
      'Be aware of recent advances in the field',
    ], [1, 2, 3, 4]),
    q('w5q10', 'multiple_choice', 'The followings can be attributed to a fully professional researcher-', [
      'They have some fundamental concepts that their peers (international) might be interested in',
      'They have command over their area',
      'They are aware of the situation where they can make significant contribution',
      'They work without focusing on literature in the area',
    ], [1, 2, 3]),
  ],
})

// ---------------- WEEK 6 ----------------
weeks.push({
  weekNumber: 6,
  title: 'Week 6: Intellectual property',
  questions: [
    q('w6q1', 'multiple_choice', 'Which of the following falls in the category of intellectual property?', [
      'An original set of ideas or research results',
      'Ideas originating from real property',
      'Properties emanating from human creative labor',
      'All of the above',
    ], [1, 3]),
    q('w6q2', 'multiple_choice', 'Violations of Intellectual Property Rights leads to', [
      'Infringement',
      'Casual penalties',
      'No big deal as we have license of fundamental rights to do whatever we want',
      'None of the above',
    ], [1, 2]),
    q('w6q3', 'single_choice', "In order to obtain legal protection, you don't have to register which of the following types of intellectual property rights?", [
      'Copyrights',
      'Patents',
      'Designs',
      'Geographical Indications',
    ], [1]),
    q('w6q4', 'single_choice', 'A person invents a new process to capture musical performance on tape, he/she will most likely apply for—', [
      'Copyrights',
      'Trade Marks',
      'Patents',
      'Trade Secret',
    ], [3]),
    q('w6q5', 'single_choice', 'Use of an unregistered trade mark of a competitor shall amount to a tort of—', [
      'Deceit',
      'Fraud',
      'Negligence',
      'Passing off',
    ], [4]),
    q('w6q6', 'single_choice', 'What does an IP right entitle a person?', [
      'Right to file a suit in case of an infringement',
      'Right of excludability',
      'Right of commercial exploitation',
      'All of the above',
    ], [4]),
    q('w6q7', 'single_choice', 'The Reebok Delta symbol and Hyundai Logo are protected by—', [
      'Patents',
      'Trade Marks',
      'Trade dress',
      'Geographical Indications',
    ], [2]),
    q('w6q8', 'single_choice', 'Under the Patents Act, 1970, the person entitled to receive a patent on a new invention is—', [
      'The one who invented the invention first',
      'The one who commercialise the invention first',
      'The one who thought of the invention first',
      'The one who filed a patent application first',
    ], [4]),
    q('w6q9', 'single_choice', 'What is the term of a Patent in India?', [
      '20 years',
      '25 years',
      '10 years',
      '15 years',
    ], [1]),
    q('w6q10', 'single_choice', 'What is the full form of TRIPS?', [
      'Tariff Related Aspects of Intellectual Properties',
      'Trade Related Aspects of Intellectual Property Science',
      'The Registration of Intellectual Property',
      'Trade Related Aspects of Intellectual Property Rights',
    ], [4]),
  ],
})

// ---------------- WEEK 7 ----------------
weeks.push({
  weekNumber: 7,
  title: 'Week 7: Design of Experiments',
  questions: [
    q('w7q1', 'single_choice', 'In the true experimental research design:', [
      'No control on external variables',
      'Less control on external variables',
      'Control on external variables by randomization',
      'No use of randomization',
    ], [3]),
    q('w7q2', 'single_choice', 'Which of the following is an incomplete experimental research design?', [
      'Before and after with control group design',
      'Factorial design',
      'One group before-after design',
      'Latin Square design',
    ], [3]),
    q('w7q3', 'multiple_choice', 'Coefficient of Determination is said to be unity when -', [
      'Error Sum of Squares is zero',
      'Total Sum of Squares is zero',
      'Regression Sum of Squares is zero',
      'Regression Sum of Squares is same as Total Sum of Squares',
    ], [1, 4]),
    q('w7q4', 'single_choice', 'The probability density function describes the following -', [
      'Probability of a phenomenon occurring in macro scale',
      'Probability of a phenomenon occurring in micro scale',
      'Distribution of probabilities in the continuous random variable domain',
      'Distribution of probabilities in some particular set of undefined variables',
    ], [3]),
    q('w7q5', 'single_choice', "During Response Surface Methodology's Canonical Analysis involving two factors, maximum response is said to be achieved when the eigen values of the B matrix are", [
      'all positive',
      'all negative',
      'all zero',
      'such that one is positive and the other is negative',
    ], [2]),
    q('w7q6', 'single_choice', 'Experiments are conducted in laboratories to', [
      'Verify scientific predictions',
      'Obtain trends when theory is not known',
      'Find effect of different variables on the desired response',
      'All of the above',
    ], [4]),
    q('w7q7', 'single_choice', 'SPC and Design of Experiments are very closely interrelated.', TF, [1]),
    q('w7q8', 'single_choice', 'Which of these is not an application of experimental design in the field of Engineering design?', [
      'Evaluation and comparison of basic design configurations',
      'Evaluation of material alternatives',
      'Evaluation of key product design parameters that impact performance',
      'Evaluation of correct process to develop the product',
    ], [4]),
    q('w7q9', 'single_choice', 'The average estimated from a data collection is 50 cm. The quantity (quantities) which has the same units as the data is (are)', [
      'Standard deviation',
      'Median',
      'Mode',
      'All of the above',
    ], [4]),
    q('w7q10', 'single_choice', 'Sample collected from an instrument giving binary data has the following values {1, -1, -1, 1, 1, -1} Mean of the above data set is', [
      '-1',
      '0',
      '1',
      '3',
    ], [2]),
  ],
})

// ---------------- WEEK 8 ----------------
weeks.push({
  weekNumber: 8,
  title: 'Week 8: Department specific discussions',
  questions: [
    q('w8q1', 'single_choice', 'In order to pursue the research, which of the following is priorly required?', [
      'Developing a research design',
      'Formulating a research question',
      'Deciding about the data analysis procedure',
      'Formulating a research hypothesis',
    ], [2]),
    q('w8q2', 'single_choice', 'Which one among the following statements is false in the context of participatory research?', [
      'It recognizes knowledge as power',
      'It is a collective process of inquiry',
      'It emphasizes people as experts',
      'Its sole purpose is the production of knowledge',
    ], [4]),
    q('w8q3', 'single_choice', 'How to judge the depth of any research?', [
      'By research title',
      'By research duration',
      'By research objectives',
      'By total expenditure on research',
    ], [3]),
    q('w8q4', 'single_choice', 'What is the main aim of interdisciplinary research?', [
      'To over simplify the problem of research',
      'Integrating knowledge from multiple disciplines to solve a problem',
      'To create a new trend in research methodology',
      'To reduce the emphasis on a single subject in the research domain',
    ], [2]),
    q('w8q5', 'single_choice', 'Electron microscopes can be used in reverse to write in extremely small areas', TF, [1]),
    q('w8q6', 'single_choice', 'What are the core elements of a dissertation?', [
      'Introduction; Data Collection; Data Analysis; Conclusions and Recommendations',
      'Executive Summary; Literature Review; Data Gathered; Conclusions; Bibliography',
      'Research Plan; Research Data; Analysis; References',
      'Introduction; Literature Review; Research Methodology; Results; Discussions and Conclusions',
    ], [4]),
    q('w8q7', 'single_choice', 'How can we enhance the research objective?', [
      'By making it more valid',
      'By making it more reliable',
      'By making it more impartial',
      'All of the above',
    ], [4]),
    q('w8q8', 'single_choice', 'A common test in research demands much priority on', [
      'Reliability',
      'Useability',
      'Objectivity',
      'All of the above',
    ], [4]),
    q('w8q9', 'single_choice', 'An appropriate source to find out descriptive information is', [
      'Bibliography',
      'Directory',
      'Encyclopedia',
      'Dictionary',
    ], [3]),
    q('w8q10', 'single_choice', 'Mahabalipuram in south-east India, pre-eminently testimony to the __________ civilization', [
      'Pallavas',
      'Mauryas',
      'Guptas',
      'Cholas',
    ], [1]),
  ],
})

// ---------------- WEEK 9 ----------------
weeks.push({
  weekNumber: 9,
  title: 'Week 9',
  questions: [
    q('w9q1', 'multiple_choice', 'Which of the following characteristics distinguish a research programme from a regular curriculum-oriented academic programme?', [
      'The research question may itself require extensive exploration before becoming well defined.',
      'Experimental outcomes may deviate from expectations and require modification of the research approach.',
      'The programme follows a highly predictable schedule with predefined learning outcomes for every stage.',
      'The researcher may repeatedly formulate new questions as insights emerge from previous work.',
    ], [1, 2, 4]),
    q('w9q2', 'single_choice', 'The lecture compares the research journey to a roller-coaster ride primarily because:', [
      'Research requires researchers to work continuously under high pressure.',
      'Research consists of predictable stages followed by unavoidable examinations.',
      'Research involves alternating periods of progress, uncertainty, setbacks, breakthroughs, and renewed progress.',
      'Research is primarily dependent on collaboration with a large number of researchers.',
    ], [3]),
    q('w9q3', 'multiple_choice', 'According to the lecture, which factors can contribute to the overall research experience of a scholar in a laboratory?', [
      'Relationships with advisers and labmates',
      'Emotional experiences and friendships',
      'Availability and accessibility of research facilities',
      'Support received from friends and family',
    ], [1, 2, 3, 4]),
    q('w9q4', 'multiple_choice', 'Which practices are presented in the lecture as useful for maintaining a sustainable rhythm in research life?', [
      'Adequate sleep and physical activity',
      'Taking time for recreation and renewal',
      "Reflecting periodically on one's activities and decisions",
      'Working continuously for extremely long hours whenever a problem arises',
    ], [1, 2, 3]),
    q('w9q5', 'single_choice', 'A researcher receives harsh feedback from an adviser and immediately feels angry and personally inadequate. Based on the lecture, what should be the most appropriate immediate response?', [
      'Respond immediately to the adviser to defend the research.',
      'Suppress the emotion completely and continue working without reflection.',
      'Pause, recognize the emotion, regulate it through techniques such as rhythmic breathing, and then respond with greater clarity.',
      "Discuss the adviser's behaviour with all labmates immediately.",
    ], [3]),
    q('w9q6', 'multiple_choice', 'Which of the following strategies are specifically discussed in the lecture as ways of processing or reducing intense anger?', [
      'Practicing rhythmic breathing',
      'Temporarily stepping away from the situation',
      'Journaling what one is feeling',
      'Immediately confronting the person responsible for the trigger',
    ], [1, 2, 3]),
    q('w9q7', 'single_choice', "A research scholar feels discouraged after a labmate's paper is accepted while their own paper remains unpublished. Which response best reflects the approach advocated in the lecture?", [
      'Compare the two researchers and conclude that the labmate is more capable.',
      'Suppress the feeling of comparison without examining its cause.',
      "Convert the comparison into curiosity by investigating what the labmate did differently and identifying possible improvements in one's own approach.",
      "Avoid interacting with the labmate until one's own paper is accepted.",
    ], [3]),
    q('w9q8', 'multiple_choice', "According to the lecture, prolonged emotional distress or isolation can negatively affect which aspects of a researcher's life?", [
      'Research progress',
      "Only the researcher's publication record",
      'Physical health',
      'Friendships and social relationships',
    ], [1, 3, 4]),
    q('w9q9', 'single_choice', 'A researcher becomes stuck on a difficult problem and begins working for very long hours while withdrawing from friends and labmates. According to the lecture, what is the primary concern with this response?', [
      'It demonstrates insufficient commitment to independent research.',
      'Emotional isolation may worsen the situation and negatively affect research progress as well as personal well-being.',
      'Long working hours always produce incorrect experimental results.',
      'Researchers should never attempt to solve difficult problems independently.',
    ], [2]),
    q('w9q10', 'multiple_choice', 'Which of the following constitute potential support systems for a research scholar according to the lecture?', [
      'Adviser or supervisor',
      'Labmates and friends',
      'Mentor',
      'Family or old friends',
    ], [1, 2, 3, 4]),
  ],
})

// ---------------- WEEK 10 ----------------
weeks.push({
  weekNumber: 10,
  title: 'Week 10',
  questions: [
    q('w10q1', 'multiple_choice', 'Students in schools typically expect', [
      'Well defined questions',
      'Question paper patterns to be finalized in advance',
      'Clarity on the “portions” for an exam',
      'Questions outside the syllabus',
    ], [1, 2, 3]),
    q('w10q2', 'single_choice', 'From the perspective of a school student the question “How long will it take to go from Chennai to Kolkata” is', [
      'A “poorly” defined question',
      'Is a well defined question',
      'Is typically how a full question is framed in an exam',
      'Has a unique',
    ], [1]),
    q('w10q3', 'multiple_choice', 'The format of exams in schools', [
      'Helps you understand fundamentals',
      'Teaches you to breakdown a problem to parts and solve them',
      'Prepares you for a professional setting',
      'Teaches you to handle unexpected questions',
    ], [1, 2, 3]),
    q('w10q4', 'multiple_choice', 'A typical professional workplace requires you to', [
      'Handle open ended questions',
      'Solve “poorly” defined problems',
      'Focus on syllabus',
      'Work within a question paper pattern',
    ], [1, 2]),
    q('w10q5', 'multiple_choice', 'Learning in college is expected to', [
      'Prepare you for professional life',
      'Focus only on well-defined problems',
      'Teach you to handle open ended problems',
      'Follow the same approach used in school',
    ], [1, 3]),
    q('w10q6', 'single_choice', 'Applying a known theory to one additional new situation is most likely', [
      'Breakthrough research',
      'Incremental research',
      'Transformational research',
      'Important contribution to research',
    ], [2]),
    q('w10q7', 'single_choice', 'Use of a series of Experimental techniques to study the same phenomenon across different samples is typically an example of:', [
      'Systematic research',
      'Transformational research',
      'Incremental research',
      'Breakthrough research',
    ], [1]),
    q('w10q8', 'single_choice', 'In the development of phones, which of the following can be considered transformational', [
      'First deployment of the landline',
      'First deployment of the cordless phone',
      'The improvement from cordless phone to mobile phone',
      'Making the first-generation mobile phones smaller and more colorful',
    ], [3]),
    q('w10q9', 'single_choice', 'In the development of bicycles, which of the following can be considered transformational', [
      'Improvement from wooden seat to cushioned seat',
      'Making the seat more ergonomic',
      'Adding a carrier',
      'Adding gears to a bicycle',
    ], [4]),
    q('w10q10', 'single_choice', 'In the development of airplanes, we can associate imagination with', [
      'Designing fixed wings even though birds have flapping wings',
      'Adding seats inside an airplane',
      'Creating a cargo version of the airplane',
      'Adding more engines to the airplane',
    ], [1]),
  ],
})

// ---------------- WEEK 11 ----------------
weeks.push({
  weekNumber: 11,
  title: 'Week 11',
  questions: [
    q('w11q1', 'multiple_choice', "The lecture uses the example of Arthur Samuel's checkers program to illustrate an early form of learning by machines. Which of the following statements are correct?", [
      'The machine was explicitly programmed with every possible checkers strategy.',
      'The machine learned through experience by repeatedly playing the game.',
      'The example is associated with an early instance of reinforcement learning.',
      'The example demonstrates that AI-based learning is a phenomenon that began only with generative AI.',
    ], [2, 3]),
    q('w11q2', 'multiple_choice', "Which of the following statements correctly reflect the lecture's discussion of classical AI and generative AI?", [
      'Generative AI is the only appropriate approach for solving modern research problems.',
      'Classical AI methods can still provide effective solutions for domain-specific problems.',
      'Researchers should select an AI approach according to the problem rather than assuming that generative AI must always be used.',
      'Classical AI became irrelevant after the emergence of LLMs.',
    ], [2, 3]),
    q('w11q3', 'multiple_choice', 'Consider an LLM that predicts the next token from the context provided to it. Which of the following statements are correct?', [
      'The probability of a token can depend on the preceding context.',
      'A token with the highest probability must always be generated.',
      'Different contexts can result in different probability distributions for the next token.',
      'The model can repeatedly predict tokens to construct a longer response.',
    ], [1, 3, 4]),
    q('w11q4', 'multiple_choice', 'Which of the following correctly distinguish token size, context size, and parameter count in an LLM?', [
      'Token size is related to the vocabulary of words or subwords that the model can generate.',
      'Context size refers to the amount of previous token information considered by the model.',
      'Parameter count refers to the number of tokens that can be stored in the prompt.',
      'Parameter count is related to how the learned probability distributions are represented in the model.',
    ], [1, 2, 4]),
    q('w11q5', 'multiple_choice', 'Which statements correctly describe the role of vector representations in the LLM framework explained in the lecture?', [
      'A very large probability matrix can be represented through a comparatively smaller-dimensional vector space.',
      'Different contexts may be projected to nearby locations in the vector space.',
      'Such compression can contribute to variability and errors because information from different contexts may influence generation.',
      'Every possible context is retained as a completely independent point with no overlap.',
    ], [1, 2, 3]),
    q('w11q6', 'multiple_choice', "Which of the following statements are consistent with the lecture's explanation of alignment?", [
      'Alignment can modify model behaviour so that generated probabilities better correspond to desired outcomes.',
      'Alignment may be directed towards objectives such as factuality, bias reduction or local context.',
      'Alignment guarantees that all outputs produced by an LLM are factually correct.',
      'Reinforcement learning from human preferences is associated with the alignment process.',
    ], [1, 2, 4]),
    q('w11q7', 'multiple_choice', 'A researcher asks a small language model a question whose meaning is ambiguous. Relevant information is retrieved from an internal repository and added to the original question before generating the answer. Which statements correctly describe this approach?', [
      'The approach is consistent with Retrieval-Augmented Generation (RAG).',
      'The retrieved information provides additional context to the model.',
      'The approach necessarily requires retraining the entire language model.',
      "Additional context can make the model's response more focused.",
    ], [1, 2, 4]),
    q('w11q8', 'multiple_choice', 'The lecture uses the example of the 2011 ICC World Cup to explain the effect of retrieval-augmented generation. Which of the following correctly captures the idea?', [
      'Additional retrieved information can contextualize an otherwise ambiguous query.',
      'The original question can be effectively shifted toward a more appropriate contextual representation.',
      'RAG works primarily by increasing the number of parameters in the LLM.',
      'A richer context can increase the probability of producing the intended',
    ], [1, 2, 4]),
    q('w11q9', 'multiple_choice', 'Which of the following statements about hallucination are correct according to the lecture?', [
      'A model may produce a plausible answer even when the generated information does not match the ground truth.',
      'Hallucination can occur when the model has insufficiently represented information or context.',
      'Hallucination can be reduced through techniques such as providing larger context, but it cannot necessarily be eliminated completely.',
      'Hallucination means that the model has deliberately decided to provide false information.',
    ], [1, 2, 3]),
    q('w11q10', 'multiple_choice', 'A language model produces a misleading recommendation because a false or deliberately misleading article was present in information from which the model learned. Which statements are appropriate?', [
      'The problem is necessarily an example of hallucination.',
      'AI systems can potentially propagate misinformation present in their information sources.',
      'A response may be misleading even when it is not simply an invented fact by the model.',
      'Independent verification of important AI-generated information remains necessary.',
    ], [2, 3, 4]),
  ],
})

// ---------------- WEEK 12 (UNVERIFIED — answer key pending) ----------------
weeks.push({
  weekNumber: 12,
  title: 'Week 12 (answer key pending)',
  verified: false,
  questions: [
    'Which of the following statements correctly distinguish course-based education from research-based education as discussed in the lecture?',
    'A research scholar is beginning a PhD and expects the research guide to provide a complete step-by-step procedure for the entire research programme. Which responses are consistent with the lecture?',
    'A researcher proposes a hypothesis based on existing knowledge and experience. Which conditions, according to the lecture, are relevant to treating it as a scientific hypothesis?',
    'Consider the hypothesis: “All swans are white.” Based on the falsifiability example in the lecture, which statements are correct?',
    'A student starts a PhD after being given a broad research topic. According to the lecture, which actions are appropriate before arriving at a testable hypothesis?',
    'In the obesity and eating-habit example, observations from the literature and study were used to identify an anomaly and develop a hypothesis. Which statements are supported by the lecture?',
    "According to the Revised Bloom’s Taxonomy discussed in the lecture, which statements are correct?",
    "A PhD scholar collects experimental data, examines unfamiliar patterns, considers alternative hypotheses, and develops a new research idea. Which Bloom’s levels are most directly represented by these activities?",
    "Which statements correctly reflect the lecture’s discussion of the role of higher-order thinking in PhD research?",
    "Which statements are consistent with the lecture’s discussion of creativity and functional fixedness?",
  ].map((question, i) => ({
    id: `w12q${i + 1}`,
    type: 'multiple_choice',
    question,
    options: [],
    answer: [],
    explanation: 'Question transcribed from the NPTEL assignment. Options and the accepted answer key are pending — they will be added once the official solutions are released.',
    unverified: true,
  })),
})

const data = {
  courses: [
    {
      id: 'nptel-research-methodology',
      title: 'Research Methodology',
      code: 'NPTEL · SWAYAM',
      weeks,
    },
  ],
}

writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')

// ---- Sanity checks ----
let errs = 0
for (const course of data.courses) {
  for (const w of course.weeks) {
    for (const qq of w.questions) {
      if (w.verified === false) continue
      if (qq.options.length !== 4) {
        console.error(`! ${qq.id}: ${qq.options.length} options`)
        errs++
      }
      for (const a of qq.answer) {
        if (!qq.options.includes(a)) {
          console.error(`! ${qq.id}: answer "${a}" not in options`)
          errs++
        }
      }
      if (qq.answer.length === 0) {
        console.error(`! ${qq.id}: empty answer`)
        errs++
      }
    }
  }
}
const nq = data.courses[0].weeks.reduce((n, w) => n + w.questions.length, 0)
console.log(`Wrote ${OUT}: ${data.courses.length} course(s), ${data.courses[0].weeks.length} weeks, ${nq} questions. Issues: ${errs}`)
