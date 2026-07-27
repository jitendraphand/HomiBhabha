/* =====================================================================
   Practice Test 01 — SOUND
   Dr. Homi Bhabha Balvaidnyanik Competition · Standard 9
   ---------------------------------------------------------------------
   Syllabus base : Maharashtra State Board Std 9 Science & Technology,
                   Chapter 12 "Study of Sound"
   Cross-mapped  : CBSE Class 9 Science Ch. 11 "Sound",
                   CBSE Class 8 Ch. 13, ICSE/CISCE Class 8-9 Sound
   Pattern       : 100 MCQs · 90 minutes · no negative marking
   ---------------------------------------------------------------------
   Schema for each item
     id          unique question id
     topic       used for the topic-wise performance breakdown
     difficulty  easy | medium | hard   (used in the analysis report)
     q           question text
     options     array of exactly 4 option strings
     answer      index (0-3) of the correct option in `options`
     explanation shown in the review screen after submission

   NOTE: option order is shuffled at runtime, so `answer` being an index
   here has no bearing on what the student sees.
   ===================================================================== */

window.TEST_SOUND = {
  id: "sound-01",
  name: "Practice Test 1 — Sound",
  subject: "Physics",
  standard: 9,
  durationMinutes: 90,
  marksPerQuestion: 1,
  negativeMarking: 0,
  questions: [

    /* ---------- 1. PRODUCTION & PROPAGATION OF SOUND (Q1-Q10) ---------- */
    {
      id: "S001", topic: "Production of Sound", difficulty: "easy",
      q: "Sound is produced by a body that is",
      options: ["vibrating", "rotating uniformly", "heated strongly", "at rest"],
      answer: 0,
      explanation: "Every source of sound is a vibrating body. The vibration disturbs the particles of the surrounding medium and the disturbance travels outwards as a sound wave."
    },
    {
      id: "S002", topic: "Production of Sound", difficulty: "easy",
      q: "Sound is a form of",
      options: ["electric charge in motion", "energy that produces the sensation of hearing", "matter made of tiny particles", "light of very low frequency"],
      answer: 1,
      explanation: "Sound is a form of energy. It travels from the source to our ears and produces the sensation of hearing; it carries no matter from the source to the listener."
    },
    {
      id: "S003", topic: "Production of Sound", difficulty: "easy",
      q: "When you speak, the part of your body that vibrates to produce sound is the",
      options: ["tongue", "eardrum", "vocal cords in the larynx", "wind pipe"],
      answer: 2,
      explanation: "Air forced out of the lungs makes the vocal cords (in the voice box or larynx) vibrate. Muscles change the tension of the cords, which changes the pitch of the voice."
    },
    {
      id: "S004", topic: "Production of Sound", difficulty: "easy",
      q: "In a tabla or a drum, sound is produced by the vibration of",
      options: ["a stretched string", "a metal plate", "an air column", "a stretched membrane"],
      answer: 3,
      explanation: "In percussion instruments such as the tabla, dholak and drum, the stretched membrane vibrates when struck. Tightening the membrane raises its frequency and hence the pitch."
    },
    {
      id: "S005", topic: "Production of Sound", difficulty: "easy",
      q: "In a flute, sound is produced by the vibration of",
      options: ["an air column", "the player's lips only", "a stretched string", "the metal body of the flute"],
      answer: 0,
      explanation: "Wind instruments such as the flute, shehnai and trumpet produce sound by setting an air column vibrating. Covering different holes changes the length of the vibrating air column and hence the pitch."
    },
    {
      id: "S006", topic: "Production of Sound", difficulty: "easy",
      q: "In a sitar or a veena, the vibrating part that produces sound is",
      options: ["a wooden board", "a stretched string", "a stretched membrane", "an air column"],
      answer: 1,
      explanation: "String instruments produce sound by vibrating strings. A shorter, thinner or tighter string vibrates faster and gives a higher pitch."
    },
    {
      id: "S007", topic: "Propagation of Sound", difficulty: "medium",
      q: "In the bell-jar experiment, as air is gradually removed from the jar by a vacuum pump, the sound of the ringing electric bell",
      options: ["changes into a high-pitched whistle", "becomes louder and louder", "becomes fainter and finally cannot be heard", "remains exactly the same"],
      answer: 2,
      explanation: "The bell is still seen vibrating but the sound fades away as the air is removed. This proves that sound needs a material medium to travel; it cannot travel through vacuum."
    },
    {
      id: "S008", topic: "Propagation of Sound", difficulty: "easy",
      q: "Sound CANNOT travel through",
      options: ["carbon dioxide gas", "water", "steel", "vacuum"],
      answer: 3,
      explanation: "Sound is a mechanical wave. It needs particles of a medium to pass on the disturbance, so it can travel through solids, liquids and gases but never through vacuum."
    },
    {
      id: "S009", topic: "Propagation of Sound", difficulty: "medium",
      q: "Two astronauts standing close together on the surface of the Moon cannot talk to each other directly. They must use radio sets because",
      options: ["the Moon has no atmosphere, so there is no medium for sound", "sound travels too slowly on the Moon", "the Moon's gravity is too weak to carry sound", "their space suits block all sound"],
      answer: 0,
      explanation: "The Moon has practically no atmosphere. With no material medium, sound cannot propagate. Radio waves are electromagnetic waves and travel through vacuum, so radio sets work."
    },
    {
      id: "S010", topic: "Propagation of Sound", difficulty: "medium",
      q: "If you place your ear on a long steel railway track, you hear an approaching train earlier than through air. This is because",
      options: ["the track carries the sound as light", "sound travels faster in steel than in air", "the track amplifies the sound many times", "sound in steel has a much lower frequency"],
      answer: 1,
      explanation: "Sound travels much faster in solids (about 5960 m/s in steel) than in air (about 344 m/s), because solids are far more elastic. So the sound through the rail reaches you first."
    },

    /* ---------- 2. NATURE OF SOUND WAVES (Q11-Q24) ---------- */
    {
      id: "S011", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "Sound waves travelling through air are",
      options: ["stationary waves", "transverse waves", "longitudinal waves", "electromagnetic waves"],
      answer: 2,
      explanation: "In air, the particles of the medium vibrate to and fro along the same direction in which the wave travels. Such a wave is called a longitudinal wave."
    },
    {
      id: "S012", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "In a longitudinal wave, the particles of the medium vibrate",
      options: ["in circles about their mean position", "randomly in all directions", "perpendicular to the direction of propagation", "parallel to the direction of propagation"],
      answer: 3,
      explanation: "That is the defining property of a longitudinal wave: particle vibration is parallel (along) the direction in which the wave energy moves."
    },
    {
      id: "S013", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "The region of a sound wave in which the particles of the medium are crowded together is called a",
      options: ["compression", "node", "crest", "rarefaction"],
      answer: 0,
      explanation: "A compression is a region of high density and high pressure. In the region where particles are spread apart, the density and pressure are low; that is a rarefaction."
    },
    {
      id: "S014", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "In a sound wave, a rarefaction is a region of",
      options: ["high pressure and high density", "low pressure and low density", "high pressure and low density", "low pressure and high density"],
      answer: 1,
      explanation: "In a rarefaction the particles of the medium move apart, so both the density and the pressure of the medium fall below their normal values."
    },
    {
      id: "S015", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "The distance between the centres of two consecutive compressions in a sound wave is equal to",
      options: ["the amplitude", "half the wavelength", "one wavelength", "twice the wavelength"],
      answer: 2,
      explanation: "One compression plus the following rarefaction makes one complete wave. Hence the distance between two consecutive compressions (or two consecutive rarefactions) is one wavelength."
    },
    {
      id: "S016", topic: "Nature of Sound Waves", difficulty: "medium",
      q: "The distance between a compression and the immediately neighbouring rarefaction in a sound wave is",
      options: ["one quarter of a wavelength", "two wavelengths", "one wavelength", "half a wavelength"],
      answer: 3,
      explanation: "A compression and the adjacent rarefaction together make half of one complete wave, so the distance between their centres is half the wavelength (lambda/2)."
    },
    {
      id: "S017", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "The time taken by a vibrating particle to complete one full oscillation is called the",
      options: ["time period", "amplitude", "wavelength", "frequency"],
      answer: 0,
      explanation: "The time period T is the time for one complete oscillation. It is measured in seconds and is the reciprocal of frequency: T = 1/f."
    },
    {
      id: "S018", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "The SI unit of frequency, the hertz (Hz), is named in honour of",
      options: ["Robert Hooke", "Heinrich Hertz", "Isaac Newton", "Christiaan Huygens"],
      answer: 1,
      explanation: "The unit is named after the German physicist Heinrich Rudolf Hertz. One hertz means one complete vibration (or one complete wave) per second."
    },
    {
      id: "S019", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "The maximum displacement of a particle of the medium from its mean position is called the",
      options: ["frequency", "wavelength", "amplitude", "time period"],
      answer: 2,
      explanation: "Amplitude measures how far the particle swings from its rest position. For sound it decides the loudness of the sound."
    },
    {
      id: "S020", topic: "Nature of Sound Waves", difficulty: "hard",
      q: "A sound wave passes from air into water. Which of its properties remains unchanged?",
      options: ["Both speed and wavelength", "Speed", "Wavelength", "Frequency"],
      answer: 3,
      explanation: "Frequency is decided by the source, not by the medium. On entering water the speed rises sharply and the wavelength increases in the same proportion (v = f x lambda), but the frequency stays the same."
    },
    {
      id: "S021", topic: "Nature of Sound Waves", difficulty: "medium",
      q: "The number of compressions that cross a fixed point in the medium in one second is equal to the",
      options: ["frequency of the wave", "speed of the wave", "amplitude of the wave", "wavelength of the wave"],
      answer: 0,
      explanation: "Each complete wave carries one compression. So the number of compressions passing a point per second is exactly the number of waves per second, that is, the frequency."
    },
    {
      id: "S022", topic: "Nature of Sound Waves", difficulty: "medium",
      q: "A sound wave in air is often drawn as a graph of density (or pressure) against distance. On such a graph, the crests represent",
      options: ["rarefactions", "compressions", "nodes", "points of zero pressure"],
      answer: 1,
      explanation: "Density and pressure are maximum at a compression, so the peaks (crests) of a density-distance graph are compressions and the troughs are rarefactions."
    },
    {
      id: "S023", topic: "Nature of Sound Waves", difficulty: "easy",
      q: "Sound waves are called mechanical waves because they",
      options: ["always travel in straight lines", "are produced by machines", "require a material medium to travel", "can travel through vacuum"],
      answer: 2,
      explanation: "Waves that need a material medium for their propagation are called mechanical waves. Sound, waves on a string and water waves are all mechanical waves."
    },
    {
      id: "S024", topic: "Nature of Sound Waves", difficulty: "hard",
      q: "When a sound wave travels from a loudspeaker to your ear, what actually travels from the speaker to you?",
      options: ["Both air particles and energy", "Neither particles nor energy", "Particles of air", "Energy of vibration"],
      answer: 3,
      explanation: "The air particles only oscillate to and fro about their own mean positions; they are not carried forward. What travels forward through the medium is the energy of the disturbance."
    },

    /* ---------- 3. SPEED OF SOUND & v = f x lambda (Q25-Q36) ---------- */
    {
      id: "S025", topic: "Speed of Sound", difficulty: "easy",
      q: "The correct relation between speed (v), frequency (f) and wavelength (L) of a wave is",
      options: ["v = f x L", "v = L / f", "v = f x L x L", "v = f / L"],
      answer: 0,
      explanation: "In one time period the wave advances by one wavelength, so v = lambda / T. Since f = 1/T, this becomes v = f x lambda."
    },
    {
      id: "S026", topic: "Speed of Sound", difficulty: "medium",
      q: "A sound wave has a frequency of 500 Hz and a wavelength of 0.68 m. Its speed is",
      options: ["0.00136 m/s", "340 m/s", "500 m/s", "680 m/s"],
      answer: 1,
      explanation: "v = f x lambda = 500 x 0.68 = 340 m/s."
    },
    {
      id: "S027", topic: "Speed of Sound", difficulty: "medium",
      q: "The speed of sound in air is 340 m/s. The wavelength of a note of frequency 170 Hz is",
      options: ["170 m", "0.5 m", "2 m", "20 m"],
      answer: 2,
      explanation: "lambda = v / f = 340 / 170 = 2 m."
    },
    {
      id: "S028", topic: "Speed of Sound", difficulty: "medium",
      q: "Taking the speed of sound in air as 344 m/s, the wavelength of the lowest audible frequency (20 Hz) is about",
      options: ["0.058 m", "6880 m", "1.72 cm", "17.2 m"],
      answer: 3,
      explanation: "lambda = v / f = 344 / 20 = 17.2 m. Notice that this is also the minimum distance of a reflector needed to hear a distinct echo."
    },
    {
      id: "S029", topic: "Speed of Sound", difficulty: "medium",
      q: "Taking the speed of sound in air as 344 m/s, the wavelength of the highest audible frequency (20 000 Hz) is about",
      options: ["1.72 cm", "17.2 cm", "1.72 m", "17.2 m"],
      answer: 0,
      explanation: "lambda = v / f = 344 / 20000 = 0.0172 m = 1.72 cm."
    },
    {
      id: "S030", topic: "Speed of Sound", difficulty: "medium",
      q: "A tuning fork vibrates with a frequency of 250 Hz. Its time period is",
      options: ["250 s", "0.004 s", "0.04 s", "2.5 s"],
      answer: 1,
      explanation: "T = 1/f = 1/250 = 0.004 s, that is 4 milliseconds."
    },
    {
      id: "S031", topic: "Speed of Sound", difficulty: "easy",
      q: "The speed of sound is greatest in",
      options: ["gases", "liquids", "solids", "it is the same in all three"],
      answer: 2,
      explanation: "Speed of sound depends mainly on the elasticity of the medium. Solids are far more elastic than liquids, and liquids more than gases, so sound is fastest in solids and slowest in gases."
    },
    {
      id: "S032", topic: "Speed of Sound", difficulty: "medium",
      q: "The speed of sound in dry air at 0 degrees Celsius is about",
      options: ["344 m/s", "1498 m/s", "5960 m/s", "331 m/s"],
      answer: 3,
      explanation: "At 0 degrees Celsius sound travels at about 331 m/s in dry air. The value rises to about 344 m/s at 22 degrees Celsius."
    },
    {
      id: "S033", topic: "Speed of Sound", difficulty: "medium",
      q: "As the temperature of air rises, the speed of sound in it",
      options: ["increases", "remains constant", "first increases and then decreases", "decreases"],
      answer: 0,
      explanation: "Speed of sound in air increases by roughly 0.61 m/s for every 1 degree Celsius rise in temperature, because the air molecules move faster and pass the disturbance on more quickly."
    },
    {
      id: "S034", topic: "Speed of Sound", difficulty: "hard",
      q: "At a constant temperature, if the pressure of the air is increased, the speed of sound in it will",
      options: ["decrease", "remain practically unchanged", "become zero", "increase"],
      answer: 1,
      explanation: "Increasing the pressure at constant temperature increases the density in the same proportion. The two effects cancel, so the speed of sound in air is practically independent of pressure."
    },
    {
      id: "S035", topic: "Speed of Sound", difficulty: "medium",
      q: "Among the following, sound travels fastest through",
      options: ["air at 22 degrees Celsius", "water", "steel", "carbon dioxide"],
      answer: 2,
      explanation: "Approximate speeds: air 344 m/s, water about 1498 m/s, steel about 5960 m/s. Steel, being a highly elastic solid, gives the greatest speed."
    },
    {
      id: "S036", topic: "Speed of Sound", difficulty: "medium",
      q: "Taking the speed of sound in air as 344 m/s, the time taken by sound to travel 1 kilometre in air is approximately",
      options: ["3.44 s", "29 s", "0.34 s", "2.9 s"],
      answer: 3,
      explanation: "t = distance / speed = 1000 / 344 = 2.9 s (approximately). This is why thunder is heard several seconds after the lightning flash is seen."
    },

    /* ---------- 4. CHARACTERISTICS OF SOUND (Q37-Q48) ---------- */
    {
      id: "S037", topic: "Characteristics of Sound", difficulty: "easy",
      q: "The pitch of a sound depends on its",
      options: ["frequency", "speed", "quality", "amplitude"],
      answer: 0,
      explanation: "Pitch is the characteristic by which we tell a shrill sound from a flat one, and it is decided by frequency. Higher frequency means higher pitch."
    },
    {
      id: "S038", topic: "Characteristics of Sound", difficulty: "easy",
      q: "If the frequency of a sound is increased while the amplitude is kept the same, the sound becomes",
      options: ["softer", "shriller (higher pitched)", "flatter (lower pitched)", "louder"],
      answer: 1,
      explanation: "Frequency controls pitch only. Raising the frequency makes the note shriller; the loudness, which depends on amplitude, is unchanged."
    },
    {
      id: "S039", topic: "Characteristics of Sound", difficulty: "easy",
      q: "The loudness of a sound depends mainly on its",
      options: ["time period", "frequency", "amplitude", "wavelength"],
      answer: 2,
      explanation: "The larger the amplitude of vibration, the more energy the wave carries and the louder the sound. Frequency does not affect loudness."
    },
    {
      id: "S040", topic: "Characteristics of Sound", difficulty: "hard",
      q: "The loudness of a sound is proportional to the",
      options: ["square root of the amplitude", "reciprocal of the amplitude", "amplitude", "square of the amplitude"],
      answer: 3,
      explanation: "Loudness is proportional to the square of the amplitude. So if the amplitude of a vibrating body is doubled, the loudness becomes about four times as great."
    },
    {
      id: "S041", topic: "Characteristics of Sound", difficulty: "medium",
      q: "A flute and a violin play the same note equally loudly, yet we can still tell them apart. The characteristic that lets us do this is",
      options: ["quality (timbre)", "speed", "pitch", "loudness"],
      answer: 0,
      explanation: "Quality, or timbre, is the characteristic that distinguishes two sounds of the same pitch and the same loudness produced by different sources."
    },
    {
      id: "S042", topic: "Characteristics of Sound", difficulty: "medium",
      q: "The voice of a small child is shriller than that of an adult man because the child's vocal cords produce sound of",
      options: ["greater amplitude", "higher frequency", "greater speed", "longer wavelength"],
      answer: 1,
      explanation: "A child's vocal cords are shorter and thinner, so they vibrate faster. Higher frequency means higher pitch, which we hear as a shriller voice."
    },
    {
      id: "S043", topic: "Characteristics of Sound", difficulty: "easy",
      q: "The loudness or sound level is commonly measured in",
      options: ["watt", "hertz", "decibel", "newton"],
      answer: 2,
      explanation: "Sound level is expressed in decibels (dB). Zero dB is roughly the faintest sound a healthy human ear can detect."
    },
    {
      id: "S044", topic: "Characteristics of Sound", difficulty: "medium",
      q: "The sound level of a normal conversation is about",
      options: ["120 dB", "200 dB", "10 dB", "60 dB"],
      answer: 3,
      explanation: "Normal conversation is around 60 dB, a whisper about 30 dB, heavy traffic about 80 dB and a jet engine close by about 120 dB."
    },
    {
      id: "S045", topic: "Characteristics of Sound", difficulty: "medium",
      q: "Continuous exposure to sound above roughly which level is considered harmful and causes noise pollution?",
      options: ["80 dB", "0 dB", "20 dB", "40 dB"],
      answer: 0,
      explanation: "Sound above about 80 dB is physically damaging on continuous exposure; around 120 dB the sound becomes painful to the ear."
    },
    {
      id: "S046", topic: "Characteristics of Sound", difficulty: "hard",
      q: "The intensity of sound is defined as the",
      options: ["number of vibrations per second", "sound energy passing per second through unit area", "total energy of the source", "maximum displacement of the particles"],
      answer: 1,
      explanation: "Intensity is the amount of sound energy passing per unit time through unit area held perpendicular to the direction of the wave. Its SI unit is watt per square metre."
    },
    {
      id: "S047", topic: "Characteristics of Sound", difficulty: "hard",
      q: "Two listeners sit at different distances from the same source. Compared with intensity, loudness is",
      options: ["independent of the distance from the source", "a purely physical quantity, same for both", "a sensation that also depends on the listener's ear", "always numerically equal to intensity"],
      answer: 2,
      explanation: "Intensity is an objective physical quantity that can be measured. Loudness is the sensation produced in the ear, so it depends both on the intensity and on the sensitivity of the listener's ear."
    },
    {
      id: "S048", topic: "Characteristics of Sound", difficulty: "medium",
      q: "A sound produced by a tuning fork is called a pure note because it",
      options: ["travels faster than other sounds", "cannot produce an echo", "is always very loud", "consists of a single frequency"],
      answer: 3,
      explanation: "A tuning fork vibrates at just one frequency, so it gives a single pure note. Most other sources produce a main frequency together with several others."
    },

    /* ---------- 5. REFLECTION OF SOUND & ECHO (Q49-Q62) ---------- */
    {
      id: "S049", topic: "Reflection of Sound & Echo", difficulty: "easy",
      q: "When sound is reflected from a surface,",
      options: ["the angle of incidence is equal to the angle of reflection", "the angle of reflection is always 90 degrees", "there is no fixed relation between the two angles", "the angle of incidence is greater than the angle of reflection"],
      answer: 0,
      explanation: "Sound obeys the same laws of reflection as light: the angle of incidence equals the angle of reflection, and the incident ray, the reflected ray and the normal all lie in the same plane."
    },
    {
      id: "S050", topic: "Reflection of Sound & Echo", difficulty: "hard",
      q: "Unlike light, sound can be reflected well even from a rough surface such as a rough plastered wall. This is because",
      options: ["sound travels much faster than light", "the wavelength of sound is very large compared with the roughness of the surface", "sound is a transverse wave", "sound carries much more energy"],
      answer: 1,
      explanation: "Audible sound has wavelengths from about 1.7 cm to 17 m. The bumps on an ordinary rough wall are far smaller than this, so the wall behaves as a smooth reflector for sound though not for light."
    },
    {
      id: "S051", topic: "Reflection of Sound & Echo", difficulty: "easy",
      q: "The repetition of the original sound caused by its reflection from a distant obstacle is called",
      options: ["refraction", "reverberation", "an echo", "resonance"],
      answer: 2,
      explanation: "An echo is a distinctly separate repetition of the original sound produced by reflection from a large obstacle such as a cliff, hill or high wall."
    },
    {
      id: "S052", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "The sensation of a sound persists in the human brain for about",
      options: ["1 s", "10 s", "0.01 s", "0.1 s"],
      answer: 3,
      explanation: "This is called the persistence of hearing. The reflected sound must reach the ear at least 0.1 s after the original sound for the two to be heard as separate sounds."
    },
    {
      id: "S053", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "Taking the speed of sound in air as 344 m/s, the minimum distance of a reflecting surface needed to hear a distinct echo is",
      options: ["17.2 m", "34.4 m", "344 m", "8.6 m"],
      answer: 0,
      explanation: "The sound must cover the distance to the wall and back in at least 0.1 s. So 2d = v x t = 344 x 0.1 = 34.4 m, giving d = 17.2 m."
    },
    {
      id: "S054", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "A man claps and hears the echo from a cliff after 3 s. If the speed of sound is 340 m/s, the cliff is at a distance of",
      options: ["340 m", "510 m", "1020 m", "113 m"],
      answer: 1,
      explanation: "The sound travels to the cliff and back, a total of v x t = 340 x 3 = 1020 m. The distance to the cliff is half of this, that is 510 m."
    },
    {
      id: "S055", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "A boy stands 85 m from a high wall and shouts. If the speed of sound is 340 m/s, he hears the echo after",
      options: ["2 s", "0.25 s", "0.5 s", "1 s"],
      answer: 2,
      explanation: "Total path = 2 x 85 = 170 m. Time = 170 / 340 = 0.5 s."
    },
    {
      id: "S056", topic: "Reflection of Sound & Echo", difficulty: "hard",
      q: "A girl standing 330 m from a cliff hears the echo of her shout 2 s later. The speed of sound in air is",
      options: ["660 m/s", "1320 m/s", "165 m/s", "330 m/s"],
      answer: 3,
      explanation: "Total distance travelled by the sound = 2 x 330 = 660 m in 2 s. So v = 660 / 2 = 330 m/s."
    },
    {
      id: "S057", topic: "Reflection of Sound & Echo", difficulty: "hard",
      q: "On a hot summer day, compared with a cold day, the minimum distance required to hear a distinct echo",
      options: ["increases", "decreases", "remains exactly the same", "becomes zero"],
      answer: 0,
      explanation: "Speed of sound increases with temperature. Since the minimum distance is v x 0.1 / 2, a larger v means the reflector must be farther away."
    },
    {
      id: "S058", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "We do not normally hear an echo of our voice inside an ordinary classroom because",
      options: ["the walls do not reflect sound at all", "the walls are less than 17.2 m away, so the reflected sound merges with the original", "the sound is too loud", "the air inside the room absorbs all the sound"],
      answer: 1,
      explanation: "The reflected sound returns in less than 0.1 s. Because of the persistence of hearing, it merges with the original sound instead of being heard as a separate echo."
    },
    {
      id: "S059", topic: "Reflection of Sound & Echo", difficulty: "easy",
      q: "Bats fly safely in complete darkness and catch insects by using",
      options: ["infrared radiation from the insects", "their sharp eyesight", "echoes of the ultrasonic squeaks they emit", "the Earth's magnetic field"],
      answer: 2,
      explanation: "This is echolocation. The bat emits high-frequency ultrasonic waves, and from the echoes reflected by obstacles and prey it judges direction and distance."
    },
    {
      id: "S060", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "The rolling rumble of thunder that continues for several seconds is caused by",
      options: ["the very high speed of sound in clouds", "refraction of sound in cold air", "several separate lightning strokes", "repeated reflection of the sound from clouds, hills and the ground"],
      answer: 3,
      explanation: "The sound of the discharge is reflected again and again from clouds, hills and the land surface. These successive reflections reach the ear at slightly different times and produce a prolonged rumble."
    },
    {
      id: "S061", topic: "Reflection of Sound & Echo", difficulty: "medium",
      q: "The depth of the sea below a ship can be found by the echo method using the formula (v = speed of sound, t = time between sending the sound and receiving the echo)",
      options: ["d = v x t / 2", "d = 2 x v x t", "d = v / (2t)", "d = v x t"],
      answer: 0,
      explanation: "The sound travels down to the sea bed and back, so it covers twice the depth in time t. Hence 2d = v x t, giving d = v x t / 2."
    },
    {
      id: "S062", topic: "Reflection of Sound & Echo", difficulty: "hard",
      q: "For appreciable reflection of a sound wave to take place, the size of the obstacle must be",
      options: ["much smaller than the wavelength of the sound", "comparable to or larger than the wavelength of the sound", "exactly equal to the amplitude", "of no importance at all"],
      answer: 1,
      explanation: "A small obstacle lets the long sound waves bend around it. Only an obstacle whose size is comparable to or greater than the wavelength reflects the sound appreciably, which is why echoes come from cliffs and large walls."
    },

    /* ---------- 6. REVERBERATION & ACOUSTICS (Q63-Q70) ---------- */
    {
      id: "S063", topic: "Reverberation & Acoustics", difficulty: "easy",
      q: "The persistence of sound in a large hall due to repeated reflection from its walls and ceiling is called",
      options: ["an interference pattern", "an echo", "reverberation", "resonance"],
      answer: 2,
      explanation: "In reverberation the reflected sounds arrive so close together that they cannot be separated. The sound seems to linger on, growing steadily weaker."
    },
    {
      id: "S064", topic: "Reverberation & Acoustics", difficulty: "medium",
      q: "The essential difference between an echo and reverberation is that",
      options: ["an echo occurs only indoors, reverberation only outdoors", "an echo needs no reflecting surface", "reverberation travels faster than an echo", "an echo is heard as a distinctly separate sound, reverberation is not"],
      answer: 3,
      explanation: "An echo is a single clearly separated repetition (time gap of at least 0.1 s). Reverberation is the overlapping of many closely spaced reflections that cannot be told apart."
    },
    {
      id: "S065", topic: "Reverberation & Acoustics", difficulty: "easy",
      q: "Excessive reverberation in an auditorium is undesirable because it",
      options: ["makes the speech unclear and confused", "makes the sound too soft to hear", "raises the pitch of the speaker's voice", "damages the walls of the hall"],
      answer: 0,
      explanation: "The lingering reflections of one syllable overlap the next syllable, so speech and music become blurred and indistinct."
    },
    {
      id: "S066", topic: "Reverberation & Acoustics", difficulty: "easy",
      q: "Reverberation in a large hall is reduced by covering its walls and ceiling with",
      options: ["polished marble", "sound-absorbing materials such as compressed fibre board and curtains", "sheets of glass", "smooth metal panels"],
      answer: 1,
      explanation: "Soft porous materials such as compressed fibre board, rough plaster, heavy curtains and carpets absorb sound energy instead of reflecting it, so the reverberation dies away quickly."
    },
    {
      id: "S067", topic: "Reverberation & Acoustics", difficulty: "medium",
      q: "Which of the following is the POOREST absorber of sound?",
      options: ["Heavy curtain cloth", "Thick carpet", "Polished marble wall", "Upholstered seat"],
      answer: 2,
      explanation: "Hard smooth surfaces such as polished marble reflect nearly all the sound that falls on them. Soft porous materials absorb sound well."
    },
    {
      id: "S068", topic: "Reverberation & Acoustics", difficulty: "hard",
      q: "The reverberation in a cinema hall is noticeably less when the hall is full than when it is empty. This is because",
      options: ["people raise the temperature of the hall", "the loudspeakers are turned down when the hall is full", "sound travels more slowly in a crowded hall", "the audience absorbs a large part of the sound energy"],
      answer: 3,
      explanation: "Clothing, hair and human bodies are good absorbers of sound. A full hall therefore absorbs much more sound energy, and the reverberation time drops."
    },
    {
      id: "S069", topic: "Reverberation & Acoustics", difficulty: "medium",
      q: "The branch of science that deals with the design of halls so that sound is heard clearly everywhere is called",
      options: ["acoustics", "electronics", "aerodynamics", "optics"],
      answer: 0,
      explanation: "Acoustics of buildings deals with controlling reflection, absorption and reverberation so that speech and music are heard clearly in every part of the hall."
    },
    {
      id: "S070", topic: "Reverberation & Acoustics", difficulty: "medium",
      q: "The ceiling of a concert hall is often made curved so that",
      options: ["the hall looks attractive", "sound after reflection reaches all parts of the hall", "the hall stays cool", "the echo time is increased"],
      answer: 1,
      explanation: "A suitably curved ceiling reflects the sound and spreads it evenly, so that listeners in every corner of the hall receive sound of nearly the same loudness."
    },

    /* ---------- 7. MULTIPLE REFLECTION - APPLICATIONS (Q71-Q76) ---------- */
    {
      id: "S071", topic: "Applications of Multiple Reflection", difficulty: "easy",
      q: "A megaphone or a loudhailer has a conical tube because it",
      options: ["converts sound into an electrical signal", "increases the frequency of the sound", "sends the sound in a particular direction without spreading it in all directions", "reduces the speed of sound"],
      answer: 2,
      explanation: "Repeated reflection inside the horn keeps the sound from spreading out. The energy is channelled forward in one direction, so it can be heard much farther away."
    },
    {
      id: "S072", topic: "Applications of Multiple Reflection", difficulty: "medium",
      q: "In a doctor's stethoscope, the sound of the patient's heartbeat reaches the doctor's ears mainly by",
      options: ["amplification by an electronic circuit", "conduction through the doctor's body", "refraction of sound in the tube", "multiple reflection of sound inside the tube"],
      answer: 3,
      explanation: "The faint sounds picked up by the chest piece undergo repeated reflection from the inner walls of the rubber tube, so almost none of the energy is lost sideways."
    },
    {
      id: "S073", topic: "Applications of Multiple Reflection", difficulty: "medium",
      q: "A soundboard placed behind the speaker in a large hall is",
      options: ["a curved (concave) surface with the speaker near its focus", "a sound-absorbing curtain", "an electronic amplifier", "a flat mirror-like sheet of glass"],
      answer: 0,
      explanation: "The concave soundboard collects the sound going backwards and reflects it towards the audience as a nearly parallel beam, so the speaker's voice reaches the whole hall."
    },
    {
      id: "S074", topic: "Applications of Multiple Reflection", difficulty: "medium",
      q: "An old-fashioned ear trumpet (hearing aid) helps a partially deaf person because it",
      options: ["increases the frequency of the sound", "collects sound from a large area and directs it into the ear canal", "slows the sound down", "converts ultrasound into audible sound"],
      answer: 1,
      explanation: "Its wide mouth gathers sound energy from a large area, and reflection inside the narrowing tube funnels that energy into the ear, so the sound reaching the eardrum is much louder."
    },
    {
      id: "S075", topic: "Applications of Multiple Reflection", difficulty: "hard",
      q: "In the whispering gallery of Gol Gumbaz at Bijapur, a whisper at one point can be heard clearly far away along the wall because of",
      options: ["absorption of sound by the wall", "refraction of sound in warm air", "repeated reflection of sound along the curved wall", "resonance of the dome"],
      answer: 2,
      explanation: "The sound undergoes repeated reflection from the smooth curved wall of the gallery and travels along it with very little loss of energy, so even a whisper stays audible over a long distance."
    },
    {
      id: "S076", topic: "Applications of Multiple Reflection", difficulty: "easy",
      q: "The horn of a bus, a trumpet and a shehnai all have a flared (widening) end so that",
      options: ["the pitch of the sound is lowered", "the sound is absorbed quickly", "they look decorative", "the sound is sent out mainly in one direction"],
      answer: 3,
      explanation: "The flared tube uses multiple reflection to guide the sound out in a particular direction instead of letting it spread uniformly in all directions."
    },

    /* ---------- 8. RANGE OF HEARING, INFRASOUND & ULTRASOUND (Q77-Q86) ---------- */
    {
      id: "S077", topic: "Range of Hearing", difficulty: "easy",
      q: "The audible range of frequency for a normal healthy human being is",
      options: ["20 Hz to 20 000 Hz", "200 Hz to 2000 Hz", "20 000 Hz to 200 000 Hz", "2 Hz to 200 Hz"],
      answer: 0,
      explanation: "Sounds between about 20 Hz and 20 000 Hz (20 kHz) can be heard by the human ear. Outside this range the ear does not respond."
    },
    {
      id: "S078", topic: "Range of Hearing", difficulty: "easy",
      q: "Sound of frequency less than 20 Hz is called",
      options: ["ultrasound", "infrasound", "supersonic sound", "audible sound"],
      answer: 1,
      explanation: "Infrasound (or infrasonic sound) lies below the audible range. Vibrations of a simple pendulum and the drumming of a large drum can produce infrasound."
    },
    {
      id: "S079", topic: "Range of Hearing", difficulty: "easy",
      q: "Sound of frequency greater than 20 000 Hz is called",
      options: ["shock wave", "infrasound", "ultrasound", "audible sound"],
      answer: 2,
      explanation: "Ultrasound (ultrasonic sound) lies above the audible range. It has a short wavelength, travels in a well-defined direction and is widely used in industry and medicine."
    },
    {
      id: "S080", topic: "Range of Hearing", difficulty: "medium",
      q: "Which of these animals can BOTH produce and hear ultrasound?",
      options: ["Whale", "Elephant", "Rhinoceros", "Dolphin"],
      answer: 3,
      explanation: "Dolphins, bats and porpoises produce and detect ultrasound and use it for navigation and for locating food. Elephants, rhinoceroses and whales use infrasound to communicate over long distances."
    },
    {
      id: "S081", topic: "Range of Hearing", difficulty: "medium",
      q: "Rhinoceroses communicate with one another using sound of frequency around 5 Hz. This sound is",
      options: ["infrasonic", "ultrasonic", "a shock wave", "audible to humans"],
      answer: 0,
      explanation: "5 Hz is below the lower limit of 20 Hz, so it is infrasound. Humans cannot hear it, but such low-frequency sound travels very long distances."
    },
    {
      id: "S082", topic: "Range of Hearing", difficulty: "hard",
      q: "Some animals become uneasy and start moving away well before an earthquake strikes. A likely reason is that they",
      options: ["can see the ground cracking early", "can detect the infrasonic waves produced before the main shock", "can hear ultrasound from the Earth's core", "are disturbed by the change in air pressure only"],
      answer: 1,
      explanation: "The main shock of an earthquake is preceded by low-frequency infrasonic waves. Many animals can detect these, though humans cannot."
    },
    {
      id: "S083", topic: "Range of Hearing", difficulty: "medium",
      q: "As a person grows older, the upper limit of the audible range of frequency generally",
      options: ["becomes infinite", "increases", "decreases", "stays exactly at 20 000 Hz"],
      answer: 2,
      explanation: "The ear becomes less sensitive to high frequencies with age. Many elderly people cannot hear frequencies above about 12 000 to 15 000 Hz."
    },
    {
      id: "S084", topic: "Range of Hearing", difficulty: "hard",
      q: "Certain moths can escape from bats in the dark because they",
      options: ["reflect no sound at all", "produce infrasound that confuses the bats", "fly faster than bats", "can hear the ultrasonic squeaks emitted by the bats"],
      answer: 3,
      explanation: "These moths have ears sensitive to the ultrasonic frequencies used by hunting bats. On hearing the squeaks they take evasive action."
    },
    {
      id: "S085", topic: "Range of Hearing", difficulty: "easy",
      q: "A sound wave has a frequency of 15 Hz. A human being will",
      options: ["not hear it, because it is infrasonic", "not hear it, because it is ultrasonic", "hear it as a very shrill sound", "hear it as a very deep sound"],
      answer: 0,
      explanation: "15 Hz is below 20 Hz, the lower limit of hearing. Such infrasonic sound is not heard by the human ear."
    },
    {
      id: "S086", topic: "Range of Hearing", difficulty: "easy",
      q: "A vibrating body produces sound of frequency 25 kHz. This sound is",
      options: ["infrasonic", "ultrasonic", "not a sound wave at all", "audible"],
      answer: 1,
      explanation: "25 kHz = 25 000 Hz, which is above 20 000 Hz. Hence it is ultrasound and is inaudible to humans."
    },

    /* ---------- 9. USES OF ULTRASOUND & SONAR (Q87-Q94) ---------- */
    {
      id: "S087", topic: "Ultrasound & SONAR", difficulty: "medium",
      q: "Ultrasound is used to clean parts such as spiral tubes and oddly shaped machine components because",
      options: ["it magnetises the dirt particles", "it dissolves the dirt chemically", "the high-frequency vibrations shake the dust and grease off even from hard-to-reach parts", "it heats the parts strongly"],
      answer: 2,
      explanation: "The object is placed in a cleaning solution and ultrasound is passed through it. The intense high-frequency vibrations detach the particles of dust, grease and dirt, which then fall away."
    },
    {
      id: "S088", topic: "Ultrasound & SONAR", difficulty: "medium",
      q: "Ultrasound is used to detect cracks and flaws in metal blocks because",
      options: ["ultrasound changes colour at a crack", "cracks emit their own ultrasound", "ultrasound cannot pass through metals at all", "ultrasound is reflected back from a crack instead of passing straight through"],
      answer: 3,
      explanation: "Ultrasonic waves are sent through the block and detectors record the transmitted waves. A crack or air gap reflects the waves, so the detector receives less signal and the defect is located."
    },
    {
      id: "S089", topic: "Ultrasound & SONAR", difficulty: "easy",
      q: "The technique that uses ultrasound to obtain moving images of the working heart is called",
      options: ["echocardiography", "electrocardiography", "radiography", "endoscopy"],
      answer: 0,
      explanation: "In echocardiography, ultrasonic waves reflected from different parts of the heart are used to build up a live image of the beating heart."
    },
    {
      id: "S090", topic: "Ultrasound & SONAR", difficulty: "easy",
      q: "Ultrasonography (sonography) is commonly used to examine all of the following EXCEPT",
      options: ["the growth of a foetus in the womb", "broken bones inside plaster", "the liver and gall bladder", "the kidney and uterus"],
      answer: 1,
      explanation: "Ultrasound images soft tissues and organs such as the liver, gall bladder, kidney, uterus and the developing foetus. Bone fractures are examined with X-rays, not ultrasound."
    },
    {
      id: "S091", topic: "Ultrasound & SONAR", difficulty: "medium",
      q: "Ultrasound is used in medicine to break small stones formed in the kidney into fine grains, which are then",
      options: ["absorbed into the blood", "removed by surgery", "flushed out with urine", "dissolved by medicines only"],
      answer: 2,
      explanation: "In lithotripsy, focused ultrasound shatters the kidney stone. The resulting fine grains pass out of the body with the urine, avoiding an operation."
    },
    {
      id: "S092", topic: "Ultrasound & SONAR", difficulty: "easy",
      q: "SONAR stands for",
      options: ["Solar Navigation and Radar", "Sonic Number and Range", "Sound Numbering and Recording", "Sound Navigation and Ranging"],
      answer: 3,
      explanation: "SONAR is an acronym for Sound Navigation And Ranging. It uses ultrasonic waves to find the distance, direction and speed of underwater objects."
    },
    {
      id: "S093", topic: "Ultrasound & SONAR", difficulty: "hard",
      q: "A SONAR device on a ship sends an ultrasonic pulse straight down and receives the echo after 4 s. If the speed of sound in sea water is 1500 m/s, the depth of the sea is",
      options: ["3000 m", "6000 m", "375 m", "1500 m"],
      answer: 0,
      explanation: "Total distance travelled = v x t = 1500 x 4 = 6000 m. This is twice the depth, so depth = 6000 / 2 = 3000 m."
    },
    {
      id: "S094", topic: "Ultrasound & SONAR", difficulty: "medium",
      q: "SONAR is NOT used for",
      options: ["finding shoals of fish", "measuring the temperature of the atmosphere", "measuring the depth of the sea", "locating submarines and sunken ships"],
      answer: 1,
      explanation: "SONAR locates underwater objects: the sea bed, icebergs, submarines, sunken ships and shoals of fish. It is not a device for measuring atmospheric temperature."
    },

    /* ---------- 10. STRUCTURE & WORKING OF THE HUMAN EAR (Q95-Q100) ---------- */
    {
      id: "S095", topic: "Human Ear", difficulty: "easy",
      q: "The outer part of the ear, the pinna, functions to",
      options: ["amplify sound about twenty times", "maintain the balance of the body", "collect the sound from the surroundings", "convert sound into electrical signals"],
      answer: 2,
      explanation: "The pinna gathers sound from the surroundings and directs it into the auditory canal, which carries it to the eardrum."
    },
    {
      id: "S096", topic: "Human Ear", difficulty: "easy",
      q: "The eardrum (tympanic membrane) is a",
      options: ["fluid-filled coiled tube", "bundle of nerve fibres", "hard bony plate", "thin stretched membrane that vibrates when sound falls on it"],
      answer: 3,
      explanation: "Sound waves reaching the eardrum make it vibrate to and fro in step with the compressions and rarefactions of the wave."
    },
    {
      id: "S097", topic: "Human Ear", difficulty: "medium",
      q: "The three tiny bones of the middle ear, in the correct order from the eardrum inwards, are",
      options: ["hammer, anvil, stirrup", "anvil, hammer, stirrup", "hammer, stirrup, anvil", "stirrup, anvil, hammer"],
      answer: 0,
      explanation: "The hammer (malleus) rests on the eardrum, and passes the vibrations to the anvil (incus) and then to the stirrup (stapes), which presses on the oval window. Together they amplify the vibrations."
    },
    {
      id: "S098", topic: "Human Ear", difficulty: "medium",
      q: "The part of the ear that converts the pressure variations of sound into electrical signals is the",
      options: ["eardrum", "cochlea", "Eustachian tube", "pinna"],
      answer: 1,
      explanation: "The cochlea is a coiled, fluid-filled tube in the inner ear. The vibrations set up pressure variations in this fluid, which the sensitive cells convert into electrical signals."
    },
    {
      id: "S099", topic: "Human Ear", difficulty: "easy",
      q: "The electrical signals produced in the inner ear are carried to the brain by the",
      options: ["Eustachian tube", "optic nerve", "auditory nerve", "spinal cord only"],
      answer: 2,
      explanation: "The auditory nerve carries the electrical signals from the cochlea to the brain, where they are interpreted as sound."
    },
    {
      id: "S100", topic: "Human Ear", difficulty: "hard",
      q: "The Eustachian tube, which connects the middle ear to the throat, serves to",
      options: ["amplify the vibrations of the eardrum", "convert sound into nerve impulses", "collect sound from the surroundings", "equalise the air pressure on the two sides of the eardrum"],
      answer: 3,
      explanation: "It keeps the air pressure inside the middle ear equal to the pressure outside. This is why the ears feel blocked and then 'pop' when an aeroplane climbs or descends."
    }
  ]
};
