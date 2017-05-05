create table Products(
    ID  serial primary key,
    name varchar(255),
    descr varchar(555),
    price int,
    image varchar(255),
    type varchar(255)
 );
  insert into Products(name, descr, price, image, type)
  values('Akai Professional MPK Mini MKII', 'The new MPK Mini MKII is an ultra-compact keyboard controller designed to easily fit in the laptop-toting musician''s backpack and still earn its spot on the desktop producer''s crowded table space.The MKII packs 25 slender, velocity-sensitive keys, a brand new four-way thumbstick for dynamic pitch and modulation manipulation, eight backlit velocity-sensitive MPC-style pads plus two banks, and eight assignable control knobs.', 96.15, 'https://images-na.ssl-images-amazon.com/images/I/71joFQNcjwL._SL1500_.jpg', 'keyboard');

  insert into Products(name, descr, price, image, type)
  values('AKM320 midiplus MIDI Keyboard Controller', '32-note velocity sensitive mid-size key keyboard. Pitch Wheel. Modulation Wheel. Octave Buttons(Up & Down). Transpose Buttons(Up & Down). Sustain Switch interface (sustain pedal does not include). USB B type: USB connect to Computer', 40, 'https://images-na.ssl-images-amazon.com/images/I/41oy7RP%2BghL.jpg', 'keyboard');

  insert into Products(name, descr, price, image, type)
  values('Alesis V25 | 25-Key USB MIDI Keyboard & Drum Pad Controller (8 Pads / 4 Knobs / 4 Buttons)', 'The Alesis V25 is a powerful, intuitive MIDI controller that lets you take command of your computer''s music software without giving up your capacity for dynamic performances. With 25 full-size velocity-sensitive keys and Octave Up/Down buttons, you can expand the keyboard to the full melodic range and play bass lines, chords, and melodies.', 89, 'https://images-na.ssl-images-amazon.com/images/I/71s5fPHDXoL._SL1500_.jpg', 'keyboard');

  insert into Products(name, descr, price, image, type)
  values('M-Audio Keystation 49 II', 'The Keystation 49 is a simple, powerful MIDI controller designed for sequencing music and playing virtual instruments on your Mac, PC, and iOS devices. It features 49 full-size velocity-sensitive keys and a series of controls that expand the range of playable notes, enhance your expressive capabilities, and streamline your recording workflow', 93, 'https://images-na.ssl-images-amazon.com/images/I/710KbzDJ%2BQL._SL1500_.jpg', 'keyboard');

  insert into Products(name, descr, price, image, type)
  values('Novation Launchkey 49 USB Keyboard Controller for Ableton Live, 49-Note MK2 Version', 'You just plug in via USB and the keys, faders, knobs and pads immediately spring into life, giving you hands-on control of your grid, instruments, effects and mixer. The heart of any MIDI keyboard controller is the keyboard itself. The Launchkey synth-style keyboard is lightweight, fast and very easy to play, but also velocity-sensitive so you can create truly expressive performances. You can choose between 25, 49, and 61-note versions, depending on whether you want portability or practicality.', 170, 'https://images-na.ssl-images-amazon.com/images/I/81Xg3hTDoWL._SL1500_.jpg', 'keyboard');

  insert into Products(name, descr, price, image, type)
  values('Mackie CR4BT 4" Bluetooth-Ready Multimedia Monitor Pair', 'Mackie Creative Reference Multimedia Monitors deliver studio-quality design and performance ideal for multimedia creation and entertainment. Built using only premium, high-performance components and featuring convenient front-panel controls, Mackie Creative Reference monitors deliver professional sound quality and features perfect for work, play and everything in between.', 169.99, 'https://images-na.ssl-images-amazon.com/images/I/81XHkKQdxqL._SL1500_.jpg', 'speakers');

  insert into Products(name, descr, price, image, type)
  values('Logitech Multimedia Speakers Z200 with Stereo Sound for Multiple Devices, Black', 'With 10 watts of peak power and two drivers per satellite, these modern-looking multimedia speakers pump out enough volume to fill any room with rich, balanced stereo sound plus added deep bass. You can adjust the bass to your taste thanks to a dedicated bass control wheel. Two audio inputs make it a snap to plug in your smartphone, tablet or laptop—or even two of them at the same time. Whether you’re listening to music in your bedroom, kitchen or living room, these perfectly tuned speakers add bold style and sound to any space.', 21, 'https://images-na.ssl-images-amazon.com/images/I/411AVZscfOL.jpg','speakers');

  insert into Products(name, descr, price, image, type)
  values('Yamaha HS7 100-Watt Series Monitor, Black', '6.5" cone woofer and 1" dome tweeter 43Hz - 30kHz frequency response 60W LF plus 35W HF bi-amp system 95W total ROOM CONTROL and HIGH TRIM response controls XLR and TRS phone jack inputs', 280, 'https://images-na.ssl-images-amazon.com/images/I/A10ain8TDEL._SL1500_.jpg', 'speakers');

  insert into Products(name, descr, price, image, type)
  values('Pioneer DJ DM-40 PAIR Desktop Monitors', 'Front-Loaded Bass reflex system, the DM-40''S 4-inch fiberglass woofers output a strong punchy bass from the front, while grooves on the ducts reduce air friction. The DM-40 3/4 -inch soft dome tweeters are fitted with DECO convex diffusers that channel high frequencies in every direction so you can enjoy 3D stereo sound wherever you sit or stand', 149,'https://images-na.ssl-images-amazon.com/images/I/91UxCziE3PL._SL1500_.jpg', 'speakers');

  insert into Products(name, descr, price, image, type)
  values('KRK RP5G3W-NA Rokit 5 Generation 3 Powered Studio Monitor', 'This Bundle contains 2 items: Pair of KRK RP5G3W-NA Rokit 5 Generation 3 Powered Studio Monitors - WHITE Bi-amped, class A/B amplifier offering large headroom and low distortion Proprietary waveguide optimized for superior imaging, 1 Soft-dome tweeter provides pristine clarity and extended response up to 35kHz, High-frequency adjustment tailors the system to personal taste', 299, 'https://images-na.ssl-images-amazon.com/images/I/71pKvZdcKnL._SL1500_.jpg', 'speakers');

  insert into Products(name, descr, price, image, type)
  values('Pioneer DJ DDJ-SB2 Portable 2-channel controller for Serato DJ', 'Portable 2-channel controller for Serato DJ, Tactile performance pads; Large jog wheels, Authentic and dynamic DJ play, Manual filter, MIDI controller, USB powered, Built-in soundcard, Software System Requirements: Windows 8.1 / 8 / 7 with Service Pack 1, Mac OS X 10.10/10.9/10.8', 247, 'https://images-na.ssl-images-amazon.com/images/I/715mxGtn%2BIL._SL1500_.jpg', 'djequip');

  insert into Products(name, descr, price, image, type)
  values('Pioneer DJ DDJ-WeGO4-W DJ Controller', 'Easy to connect by simply plugging the DDJ-WeGO4 into your PC Mac tablet or smartphone with a USB cable or Lightning cable, Compatible with WeDJ Pioneer''s easy-to-use DJ performance app for iPad, Free rekordbox dj license key bundled with this controller, Simple layout and advanced control with a host of professional features including Hot Cues - samplers -Pad FX and loops packed in a compact lightweight design', 297, 'https://images-na.ssl-images-amazon.com/images/I/81rdC-%2ByGUL._SL1500_.jpg', 'djequip');

  insert into Products(name, descr, price, image, type)
  values('Pioneer DJ DDJ-RZX DJ Controller', 'High-Quality Sound -Hear the true quality of your tracks thanks to AC inlets for reduced cable contact resistance and a high-performance 96 KHz/32 bit D/A converter made by Asahi Kasei, Three 7-inch touch screens give you direct access to track info, Dedicated Mic Section, 2 XLR combo input jacks give distortion-free Mic output even at loud volumes', 2999, 'https://images-na.ssl-images-amazon.com/images/I/51MyZRCFyRL.jpg', 'djequip');

  insert into Products(name, descr, price, image, type)
  values('Roland AIRA MX1 Mix Performer Control Surface', '18 channel performance mixer with step-sequenced FX, transport, and tempo controlThree kinds of step-sequenced Beat FX (Filter, Side Chain, Slicer) with TR-style buttonsSix kinds of Master FX (48 variations) with large performance control knobBeat FX and Master FX can be applied to any or all inputs; Beat FX are per channelCombi mode rhythmically alternates the Master FX using the step-sequencerFour AIRA Link USB ports support audio, MIDI, sync, and bus power (on Port 3) for AIRA gearMix mode pr', 599, 'https://images-na.ssl-images-amazon.com/images/I/716M%2B2l1dWL._SL1000_.jpg', 'djequip');

  insert into Products(name, descr, price, image, type)
  values('Pioneer Pro DJ XDJ-RX DJ System', 'All-in-one, rekordbox compatible DJ system with large, dual-deck screen and club-standard layout. XDJ-RX is a next generation, all-in-one DJ solutions that inherits the DNA from our club standard set-up', 1497, 'https://images-na.ssl-images-amazon.com/images/I/81W3Z5pEssL._SL1500_.jpg', 'djequip');

  insert into Products(name, descr, price, image, type)
  values('Audio-Technica ATH-M30x Professional Studio Monitor Headphones', 'Advanced build quality and engineering, 40 mm drivers with rare earth magnets and copper-clad aluminum wire voice coils, Tuned for enhanced detail, with excellent mid-range definition, Collapsible for space-saving portability', 65, 'https://images-na.ssl-images-amazon.com/images/I/91hcdWs6SCL._SL1500_.jpg', 'headphones');

  insert into Products(name, descr, price, image, type)
  values('Sony MDRV6 Studio Monitor Headphones with CCAW Voice Coil', 'Circum-Aural design reduces noise from the outside world. Oval ear-pads for extra isolation. 40 MM diameter drivers to provide wide surface area for superb dynamics and deep bass down to 5 Hz.', 77, 'https://images-na.ssl-images-amazon.com/images/I/813vag8o5QL._SL1500_.jpg', 'headphones');

  insert into Products(name, descr, price, image, type)
  values('Brainwavz HM5 Studio Monitor Headphones', 'Neutral sound signature - Your music will sound how it should! 1.2m and 3m detachable cables included, use with your portable rig or home rig Large, comfortable over the ear cups', 110, 'https://images-na.ssl-images-amazon.com/images/I/41SDTk-adsL.jpg', 'headphones');

  insert into Products(name, descr, price, image, type)
  values('AKG K 240 MK II Stereo Studio Headphones', 'Imported, Over-ear designfor comfort during long work sessions, Semi-open technologyfor solid bass and airy highs, Patented Varimotion 30 mm XXL transducerfor accurate signal transfer and great dynamic range', 78, 'https://images-na.ssl-images-amazon.com/images/I/81pCYdxU0BL._SL1500_.jpg', 'headphones');

  insert into Products(name, descr, price, image, type)
  values('AKG K712 Pro Over-Ear Mastering/Reference Headphones', 'Imported, Over-ear design maximum wearing comfort for long work sessions, Sophisticated open technology for spacious and airy sound without compromise,  Revolutionary flat wire voice coil for incredible impulse and treble response', 345, 'https://images-na.ssl-images-amazon.com/images/I/61vKDEfFsjL._SL1209_.jpg', 'headphones');

  insert into Products(name, descr, price, image, type)
  values('Sony Sound Forge Audio Studio 10', 'Sound Forge Audio Studio software is the easiest way to record, edit, master, and share audio on your home computer. Capture live performances in high-fidelity sound at the touch of a button-your computer"s sound card leads directly to Audio Studio.', 59, 'https://images-na.ssl-images-amazon.com/images/I/71%2Bs8dN1zZL._SL1500_.jpg', 'software');

  insert into Products(name, descr, price, image, type)
  values('Propellerhead Reason 8', 'Reason is easy to get started with, yet as deep as you want it to be. It’s the music-making software that helps you create, collaborate and discover with musicians worldwide.', 306, 'https://images-na.ssl-images-amazon.com/images/I/71J1zVjpYwL._SL1500_.jpg', 'software');

  insert into Products(name, descr, price, image, type)
  values('Image Line FL Studio 12 Producer Edition', 'FL Studio 12 totally reworks the user interface and adds exciting new features you have been asking for. FL Studio 12 is a complete software music production environment, representing more than 16 years of innovative developments and our commitment to Lifetime Updates.', 199, 'https://images-na.ssl-images-amazon.com/images/I/81eIjyQ%2BHzL._SL1500_.jpg', 'software');

  insert into Products(name, descr, price, image, type)
  values('Steinberg Cubase Artist 9 Recording Software', 'With a rich feature set tailored to instrumentalists and songwriters who put music first, Cubase Artist offers all you need to develop your songs and productions from scratch. Streamlined recording and vocal editing tools, inspirational composing features, superb virtual instruments, FX, amps, and much more', 286, 'https://images-na.ssl-images-amazon.com/images/I/41THxjQlbwL.jpg', 'software');

  insert into Products(name, descr, price, image, type)
  values('Ableton Live 9 Standard', 'Professional software for creative music production and performance including a versatile array of effects, sounds, and instruments. What is Live? Ableton Live 9 bridges the gap between studio and stage with an intuitive workflow that lets you do just about everything in real time.', 499, 'https://images-na.ssl-images-amazon.com/images/I/51eS5WM6JbL._SL1000_.jpg', 'software');


























--  insert into Products(name, descr, , productId)
--  values('')price