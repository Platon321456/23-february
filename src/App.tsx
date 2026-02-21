import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fish, Heart, ArrowLeft, ArrowRight, Sparkles, PartyPopper, CheckCircle2 } from 'lucide-react';

// ============================================================================
// БЛОК ДЛЯ ЗАПОЛНЕНИЯ ПОЛЬЗОВАТЕЛЕМ (СЮДА ВСТАВЛЯЙ ССЫЛКИ НА ФОТО И ТЕКСТЫ)
// ============================================================================
const CONTENT = {
  // Аудио
  audio: {
    main: "https://image2url.com/r2/default/audio/1771697018951-53f38852-6034-4ba5-b03b-45f1ae118143.mp3",
    beauty: "https://image2url.com/r2/default/audio/1771697165169-af5a158e-fc6c-4e32-b1c9-c526239e7e8d.mp3", // Музыка для вкладки "В красоту"
    fun: "https://image2url.com/r2/default/audio/1771697018702-f17dfa30-7cf3-481c-94cb-af5dd5c8e83d.mp3",    // Музыка для вкладки "В веселье"
    love: "https://image2url.com/r2/default/audio/1771697004423-daae9ce0-fd07-4c31-aa9b-624ac648fc80.mp3"    // Музыка для вкладки "В любовь"
  },
  
  // Начальные фоны
  introImages: {
    fishing: "https://i.postimg.cc/KcdNjsc0/Rybalka.jpg",
    family: "https://i.postimg.cc/V62jSdwd/Семья.jpg",
    slideshow: [
      "https://i.postimg.cc/brXtyW0t/Sem'a-rybalka-(1).jpg",
      "https://i.postimg.cc/QN574Nsv/Sem'a-rybalka-(2).jpg",
      "https://i.postimg.cc/cJNvK2r5/Foto-(3).jpg"
    ]
  },

  // Вкладка "В красоту"
  beauty: {
    introText: "Красота всегда с тобой даже если ты её не замечаешь, куда бы ты не посмотрел она будет либо за твоей спиной либо прямо под рукой, а может даже под ногой! Хотя чего говорить самый красивый человек это ты!",
    slides: [
      { image: "https://i.postimg.cc/d1rZNFgJ/Foto-(9).jpg", text: "Вот это машина!!" },
      { image: "https://i.postimg.cc/yYg4MNv9/Foto-(31).jpg", text: "Вот это ты далеко.." },
      { image: "https://i.postimg.cc/QMxrnJPB/Foto-(21).jpg", text: "хм.. А это где ты?" },
      { image: "https://i.postimg.cc/T1m8W7yg/Foto-(15).jpg", text: "Смотри не упади!!" },
      { image: "https://i.postimg.cc/fbKRVL4f/Foto-(20).jpg", text: "Море!" },
      { image: "https://i.postimg.cc/LsrNZHjw/Foto-(38).jpg", text: "Ветряки!!" },
      { image: "https://i.postimg.cc/fRyK23CZ/Foto-(22).jpg", text: "Ура! Снег!" },
      { image: "https://i.postimg.cc/8PJcZNW1/Foto-(37).jpg", text: "Ловись рыбка большая.." },
      { image: "https://i.postimg.cc/7LxxrkCL/Foto-(34).jpg", text: "Берёзки!" },
      { image: "https://i.postimg.cc/qqnRMGpT/Foto-(27).jpg", text: "Ну рыбак!" }
    ]
  },

  // Вкладка "В веселье"
  fun: {
    introText: "Ты весёлый даже когда не пьян, твоя улыбка это нечто! Пусть она также будет оставаться яркой и святить нам вместо солнца. Пусть этот день принесёт тебе такуюже улыбку как и тогда!",
    slides: [
      { image: "https://i.postimg.cc/7hjN5zfP/Фото_(25).jpg", text: "Это же мы!" },
      { image: "https://i.postimg.cc/9fSNtPjQ/Foto-(16).jpg", text: "Ой устал" },
      { image: "https://i.postimg.cc/B6rg6D86/Foto-(12).jpg", text: "Да ты богатырь!!" },
      { image: "https://i.postimg.cc/Y9539g4c/Foto-(14).jpg", text: "Что-то здесь не тааак" },
      { image: "https://i.postimg.cc/zBb78pGP/Sema-rybalka-(3).jpg", text: "Ну и как же без друзей!" },
      { image: "https://i.postimg.cc/7h42dNGT/Foto-(17).jpg", text: "Буль буль буль" },
      { image: "https://i.postimg.cc/3RmGtqwn/Foto-(23).jpg", text: "Розовую или белую.." },
      { image: "https://i.postimg.cc/9QQGc1xM/Foto-(7).jpg", text: "Ой какая улыбка :D" },
      { image: "https://i.postimg.cc/kX12vCc2/Foto-(13).jpg", text: "Оп ещё друзья!" },
      { image: "https://i.postimg.cc/pL3y3B3N/Foto-(8).jpg", text: "Куда летишь??" },
      { image: "https://i.postimg.cc/FHw1wxwL/Foto-(33).jpg", text: "Оп оп пивасек" },
      { image: "https://i.postimg.cc/Hx9xc1ng/Foto-(1).jpg", text: "Лодочка!!" }
    ]
  },

  // Вкладка "Семья"
  love: {
    introText: "Семья - это самое главное в жизни. Да бывают моменты когда мы тебя не поймём, но всегда поддержим. И пусть эти моменты согревают твое сердце! Мы любим тебя Саша!",
    slides: [
      { image: "https://i.postimg.cc/d3XKD52M/Foto-(10).jpg", text: "Лесочек" },
      { image: "https://i.postimg.cc/NGPtNjWJ/Foto-(11).jpg", text: "Поцелуйчик!" },
      { image: "https://i.postimg.cc/FsM44nF8/Foto-(36).jpg", text: "И ещё один!" },
      { image: "https://i.postimg.cc/xjFQs1wk/Foto-(28).jpg", text: "Мои родители!" },
      { image: "https://i.postimg.cc/pdZbKWQM/Foto-(19).jpg", text: "Ого ещё мы!" },
      { image: "https://i.postimg.cc/7LYDsJZD/Foto-(30).jpg", text: "Ну красивые" },
      { image: "https://i.postimg.cc/dQ7WRQv5/Sem-(1).jpg", text: "Сестрёнка! " },
      { image: "https://i.postimg.cc/c1KD710y/Sem-(2).jpg", text: "Великая троица!" },
      { image: "https://i.postimg.cc/Kcd00X87/Sem-(4).jpg", text: "Опять мы!!" },
      { image: "https://i.postimg.cc/2Snf8FVm/Foto-(35).jpg", text: "Ну красивые не спорю" },
      { image: "https://i.postimg.cc/9Q2JjG96/Sem-(5).jpg", text: "Кто то скоро упадёт :D" },
      { image: "https://i.postimg.cc/wBT21g0D/Sem-(6).jpg", text: "Ваа какая рыбаа" },
      { image: "https://i.postimg.cc/BvQpj4Md/Sem-(7).jpg", text: "Ну рыбакии!!" },
      { image: "https://i.postimg.cc/B6jCCNWD/Sem-(8).jpg", text: "Вжууух!" },
      { image: "https://i.postimg.cc/65JKsmpL/Foto-(26).jpg", text: "А я зелёненький :)" },
      { image: "https://i.postimg.cc/CMfNBvsz/Sem-(11).jpg", text: "Класс!" },
      { image: "https://i.postimg.cc/ryvff6wq/Sem-(3).jpg", text: "Ну и как же без нас!" },
    ]
  },

  // Мини-игра "Рыбалка"
  game: {
    bgRiver: "https://i.postimg.cc/63VbJyPp/pixellab-Image-to-pixel-art-1771687749583.png",       // Фон реки
    rodAndHand: "https://i.postimg.cc/y8kRSx0b/019c80d9-8917-7e71-98e0-88aa6f950ce9.png",    // Рука с удочкой
    secondHand: "",    // Вторая рука (снимает рыбу)
    fishTexture: "https://i.postimg.cc/nL4CvJ5Y/pixellab-gold-fish-1771687300709.png",   // Текстура рыбы
    bucketStates: [    // Ссылки на ведро с разным количеством рыб (от 0 до 5)
      "https://i.postimg.cc/ryJxBSfx/pixellab-an-empty-bucket-for-fish-1771685709846-(1).png", // 0 рыб
      "https://i.postimg.cc/wMwt1YvP/Chat-GPT-Image-21-fevr-2026-g-(1).png", // 1 рыба
      "https://i.postimg.cc/CxhgvncN/019c80e9-2a75-7d20-811c-a5484409.png", // 2 рыбы
      "https://i.postimg.cc/TwCmDDNk/019c80f0-a026-7401-94e4-5affbf74.png", // 3 рыбы
      "https://i.postimg.cc/tRcnGyK6/019c80f4-020f-78a3-8cee-fe78417d.png", // 4 рыбы
      "https://i.postimg.cc/j2yDhnMR/019c80f6-2c30-7e62-92c6-b4f1fa09.png"  // 5 рыб (полное)
    ],
    gamePhotos: [      // Фотографии после каждой пойманной рыбы (5 штук)
      "https://i.postimg.cc/jqB6Qzd8/Foto-(18).jpg", "https://i.postimg.cc/hvvCzgs7/Rybka-(2).jpg", "https://i.postimg.cc/mD8XghYr/Rybka-(3).jpg", "https://i.postimg.cc/yNhp2LW0/Rybka-(1).jpg", "https://i.postimg.cc/FR9Cv0Lh/Rybka-(4).jpg"
    ],
    finalPhoto: "https://i.postimg.cc/KcdNjsc0/Rybalka.jpg"     // Финальная вылетающая фотография
  }
};
// ============================================================================

type Phase = 'intro' | 'rejected' | 'tabs' | 'tab_intro' | 'slideshow' | 'pre_game' | 'game';
type TabId = 'beauty' | 'fun' | 'love';

export default function App() {
  // Global State
  const [phase, setPhase] = useState<Phase>('intro');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Intro State
  const [hoveredOption, setHoveredOption] = useState<'none' | 'fishing' | 'family'>('none');
  const [isQuestionHovered, setIsQuestionHovered] = useState(false);
  const [introSlide, setIntroSlide] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  // Tabs State
  const [completedTabs, setCompletedTabs] = useState<TabId[]>([]);
  const [activeTab, setActiveTab] = useState<TabId | null>(null);
  
  // Audio Playlist State
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const playlist = CONTENT.audio.main.split(',').map(url => url.trim()).filter(url => url !== "");
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Slideshow State
  const [slideIndex, setSlideIndex] = useState(0);

  // Pre-game State
  const [preGameStep, setPreGameStep] = useState(0);

  // Game State
  const [fishPos, setFishPos] = useState(50);
  const [progress, setProgress] = useState(0);
  const [gamePhase, setGamePhase] = useState<'playing' | 'caught' | 'reveal' | 'final'>('playing');
  const [fishCaughtCount, setFishCaughtCount] = useState(0);
  const [gameCountdown, setGameCountdown] = useState(5);
  const [showGameInstructions, setShowGameInstructions] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const isActionPressed = useRef(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Intro Slideshow & Button Timer
  useEffect(() => {
    if (phase === 'rejected') {
      const slideInterval = setInterval(() => {
        setIntroSlide((prev) => (prev + 1) % CONTENT.introImages.slideshow.length);
      }, 4000);
      
      const btnTimer = setTimeout(() => {
        setShowNextButton(true);
      }, 10000);

      return () => {
        clearInterval(slideInterval);
        clearTimeout(btnTimer);
      };
    }
  }, [phase]);

  // Tab Intro Timer (15 seconds)
  useEffect(() => {
    if (phase === 'tab_intro') {
      const timer = setTimeout(() => {
        setPhase('slideshow');
        setSlideIndex(0);
      }, 15000); // 15 секунд (было 30)
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Tab Slideshow Timer
  useEffect(() => {
    if (phase === 'slideshow' && activeTab) {
      const slides = CONTENT[activeTab].slides;
      if (slides.length === 0) {
        finishTab();
        return;
      }

      const timer = setTimeout(() => {
        if (slideIndex < slides.length - 1) {
          setSlideIndex(prev => prev + 1);
        } else {
          finishTab();
        }
      }, 6000); // 6 секунд на фото (было 4)
      return () => clearTimeout(timer);
    }
  }, [phase, slideIndex, activeTab]);

  const finishTab = () => {
    if (activeTab && !completedTabs.includes(activeTab)) {
      const newCompleted = [...completedTabs, activeTab];
      setCompletedTabs(newCompleted);
      
      // Return to main music
      playTrack(playlist[currentAudioIndex]);

      if (newCompleted.length === 3) {
        setPhase('pre_game');
      } else {
        setPhase('tabs');
      }
    }
  };

  // Pre-game Sequence
  useEffect(() => {
    if (phase === 'pre_game') {
      const t1 = setTimeout(() => setPreGameStep(1), 3000); // "А теперь..."
      const t2 = setTimeout(() => setPreGameStep(2), 6000); // "Время игры!"
      const t3 = setTimeout(() => {
        setPreGameStep(3);
        setShowGameInstructions(true);
      }, 9000); // Countdown start
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [phase]);

  // Game Countdown Timer
  useEffect(() => {
    if (phase === 'pre_game' && preGameStep === 3 && gameCountdown > 0) {
      const timer = setTimeout(() => setGameCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'pre_game' && preGameStep === 3 && gameCountdown === 0) {
      setPhase('game');
    }
  }, [phase, preGameStep, gameCountdown]);

  // Game Loop
  useEffect(() => {
    if (phase !== 'game' || gamePhase !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => { if (e.code === 'Space') isActionPressed.current = true; };
    const handleKeyUp = (e: KeyboardEvent) => { if (e.code === 'Space') isActionPressed.current = false; };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let currentFishPos = 50;
    let currentProgress = 0;

    const interval = setInterval(() => {
      // Update fish position (Spacebar pushes up, gravity pulls down)
      currentFishPos = isActionPressed.current ? currentFishPos - 3 : currentFishPos + 2;
      currentFishPos = Math.max(0, Math.min(100, currentFishPos));
      setFishPos(currentFishPos);

      // Update game time for instruction hiding
      setGameTime(prev => prev + 0.05);

      // Check if fish is in green zone
      const zoneWidth = 40 - (fishCaughtCount * 7);
      const zoneStart = 50 - (zoneWidth / 2);
      const zoneEnd = 50 + (zoneWidth / 2);

      if (currentFishPos >= zoneStart && currentFishPos <= zoneEnd) {
        currentProgress += 1; // 100 ticks = 5 seconds
        if (currentProgress >= 100) {
          currentProgress = 100;
          setGamePhase('caught');
        }
      } else {
        currentProgress = Math.max(0, currentProgress - 0.5);
      }
      setProgress(currentProgress);
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval);
    };
  }, [phase, gamePhase]);

  // Game Win Sequence
  useEffect(() => {
    if (gamePhase === 'caught') {
      const timer = setTimeout(() => {
        setGamePhase('reveal');
        setFishCaughtCount(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gamePhase]);

  // Reset for next fish or finish game
  useEffect(() => {
    if (gamePhase === 'reveal') {
      const timer = setTimeout(() => {
        if (fishCaughtCount < 5) {
          setGamePhase('playing');
          setProgress(0);
          setFishPos(50);
        } else {
          setGamePhase('final');
          // Trigger confetti
          import('canvas-confetti').then(confetti => {
            confetti.default({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });
          });
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [gamePhase, fishCaughtCount]);

  const handleInitialOptionClick = (option: 'fishing' | 'family') => {
    if (isTouchDevice) {
      if (hoveredOption === option) {
        startRejection();
      } else {
        setHoveredOption(option);
        setIsQuestionHovered(true);
      }
    } else {
      startRejection();
    }
  };

  const playTrack = (url: string, forceImmediate = false) => {
    if (!audioRef.current || !url) return;
    
    const audio = audioRef.current;

    // Clear any existing fade intervals
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    // If it's already playing this track, just ensure it's audible
    if (audio.src === url && !audio.paused) {
      let vol = audio.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (vol < 0.95) {
          vol += 0.05;
          audio.volume = vol;
        } else {
          audio.volume = 1;
          clearInterval(fadeIntervalRef.current!);
        }
      }, 50);
      return;
    }

    // For mobile: if audio is paused or we need immediate play (user gesture context)
    if (forceImmediate || audio.paused || !audio.src) {
      audio.pause();
      audio.src = url;
      audio.load();
      audio.volume = 0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          let fadeInVolume = 0;
          fadeIntervalRef.current = setInterval(() => {
            if (fadeInVolume < 0.95) {
              fadeInVolume += 0.05;
              audio.volume = fadeInVolume;
            } else {
              audio.volume = 1;
              clearInterval(fadeIntervalRef.current!);
            }
          }, 50);
        }).catch(e => {
          console.error("Audio play failed", e);
          audio.volume = 1;
        });
      }
      return;
    }
    
    // Smooth fade out for track switching (when already playing)
    let volume = audio.volume;
    fadeIntervalRef.current = setInterval(() => {
      if (volume > 0.1) {
        volume -= 0.1;
        audio.volume = Math.max(0, volume);
      } else {
        clearInterval(fadeIntervalRef.current!);
        audio.pause();
        audio.src = url;
        audio.load();
        audio.volume = 0;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            let fadeInVolume = 0;
            fadeIntervalRef.current = setInterval(() => {
              if (fadeInVolume < 0.95) {
                fadeInVolume += 0.05;
                audio.volume = fadeInVolume;
              } else {
                audio.volume = 1;
                clearInterval(fadeIntervalRef.current!);
              }
            }, 50);
          }).catch(e => {
            console.error("Audio play failed", e);
            audio.volume = 1;
          });
        }
      }
    }, 50);
  };

  const handleTabSelect = (tabId: TabId) => {
    setActiveTab(tabId);
    setPhase('tab_intro');
    
    const tabAudio = CONTENT.audio[tabId];
    if (tabAudio) {
      playTrack(tabAudio, true); // Force immediate play for mobile gesture
    }
  };

  const startRejection = () => {
    setPhase('rejected');
    playTrack(playlist[0], true); // Force immediate play for mobile gesture
  };

  const handleAudioEnded = () => {
    if (phase === 'rejected' || phase === 'tabs') {
      if (currentAudioIndex < playlist.length - 1) {
        const nextIndex = currentAudioIndex + 1;
        setCurrentAudioIndex(nextIndex);
        playTrack(playlist[nextIndex]);
      } else {
        // Loop main playlist
        setCurrentAudioIndex(0);
        playTrack(playlist[0]);
      }
    }
  };

  // --- Render Helpers ---

  const renderIntro = () => (
    <motion.div
      key="intro"
      exit={{ y: -1000, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center w-full max-w-5xl px-4 z-20"
    >
      <div 
        className="relative flex flex-col items-center justify-center w-full"
        onMouseEnter={() => !isTouchDevice && setIsQuestionHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsQuestionHovered(false)}
        onClick={() => isTouchDevice && setIsQuestionHovered(true)}
      >
        <motion.h1
          animate={{ y: isQuestionHovered ? -60 : 0, scale: isQuestionHovered ? 0.9 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-2xl cursor-default"
        >
          Что ты больше всего любишь?
        </motion.h1>

        <AnimatePresence>
          {isQuestionHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute top-full mt-8 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 w-full"
            >
              <div
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => !isTouchDevice && setHoveredOption('fishing')}
                onMouseLeave={() => !isTouchDevice && setHoveredOption('none')}
                onClick={(e) => { e.stopPropagation(); handleInitialOptionClick('fishing'); }}
              >
                <motion.div 
                  animate={{ x: hoveredOption === 'fishing' ? -10 : 0 }}
                  className="flex items-center gap-3 text-3xl md:text-5xl transition-colors text-white/80 group-hover:text-blue-300"
                >
                  <ArrowLeft className="w-8 h-8 md:w-12 md:h-12 animate-pulse" />
                  <span className="tracking-wider">Рыбалка</span>
                  <AnimatePresence>
                    {hoveredOption === 'fishing' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0, rotate: -30 }} 
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, rotate: 30 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <Fish className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => !isTouchDevice && setHoveredOption('family')}
                onMouseLeave={() => !isTouchDevice && setHoveredOption('none')}
                onClick={(e) => { e.stopPropagation(); handleInitialOptionClick('family'); }}
              >
                <motion.div 
                  animate={{ x: hoveredOption === 'family' ? 10 : 0 }}
                  className="flex items-center gap-3 text-3xl md:text-5xl transition-colors text-white/80 group-hover:text-pink-300 flex-row-reverse"
                >
                  <ArrowRight className="w-8 h-8 md:w-12 md:h-12 animate-pulse" />
                  <span className="tracking-wider">Семья</span>
                  <AnimatePresence>
                    {hoveredOption === 'family' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0, rotate: 30 }} 
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, rotate: -30 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <Heart className="w-8 h-8 md:w-10 md:h-10 text-pink-400 fill-pink-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const renderRejected = () => (
    <motion.div
      key="rejected"
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -200, opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      className="text-center px-4 flex flex-col items-center z-20"
    >
      <AnimatePresence>
        {showNextButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2, ease: "easeOut" }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('tabs')}
            className="mb-8 px-8 py-3 bg-white/20 backdrop-blur-md border border-white/50 rounded-full text-xl md:text-2xl font-medium tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Нажми
          </motion.button>
        )}
      </AnimatePresence>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
        Не правда!
      </h1>
      <p className="mt-8 text-3xl md:text-5xl lg:text-6xl font-medium text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
        Ты любишь когда это всё вместе!
      </p>
    </motion.div>
  );

  const renderTabs = () => {
    let title = "Куда ты хочешь отправится из воспоминаний?";
    if (completedTabs.length === 1) title = "Куда теперь?";
    if (completedTabs.length === 2) title = "А теперь посетим последнее!!";

    const tabs: { id: TabId, label: string, icon: any, color: string }[] = [
      { id: 'beauty', label: 'В красивые', icon: Sparkles, color: 'text-yellow-300' },
      { id: 'fun', label: 'В веселые', icon: PartyPopper, color: 'text-green-300' },
      { id: 'love', label: 'В семейные', icon: Heart, color: 'text-red-400' }
    ];

    return (
      <motion.div
        key="tabs"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center w-full max-w-4xl px-4 z-20"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-center">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCompleted = completedTabs.includes(tab.id);
            return (
              <motion.button
                key={tab.id}
                whileHover={!isCompleted ? { scale: 1.05 } : {}}
                whileTap={!isCompleted ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!isCompleted) {
                    handleTabSelect(tab.id);
                  }
                }}
                disabled={isCompleted}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-lg md:text-2xl font-medium backdrop-blur-md transition-all border ${
                  isCompleted 
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : 'bg-white/10 border-white/30 hover:bg-white/20'
                }`}
              >
                <span>{tab.label}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                ) : (
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 ${tab.color} ${tab.id === 'love' ? 'fill-current' : ''}`} />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderTabIntro = () => (
    <motion.div
      key="tab_intro"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="w-[95%] max-w-4xl h-[70vh] md:h-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden px-4 md:px-8 text-center z-20"
    >
      {activeTab === 'beauty' && <Sparkles className="absolute opacity-10 w-48 h-48 md:w-64 md:h-64 text-yellow-200" />}
      {activeTab === 'fun' && <PartyPopper className="absolute opacity-10 w-48 h-48 md:w-64 md:h-64 text-green-200" />}
      {activeTab === 'love' && <Heart className="absolute opacity-10 w-48 h-48 md:w-64 md:h-64 text-red-200 fill-current" />}
      
      <div className="w-full max-h-full overflow-y-auto custom-scrollbar flex items-center justify-center py-6">
        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide opacity-90 z-10 drop-shadow-lg leading-relaxed max-w-full break-words">
          {activeTab ? CONTENT[activeTab].introText : ''}
        </p>
      </div>
    </motion.div>
  );

  const renderSlideshow = () => {
    if (!activeTab) return null;
    const slides = CONTENT[activeTab].slides;
    const currentSlideData = slides[slideIndex];

    return (
      <motion.div
        key="slideshow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black"
      >
        <AnimatePresence>
          {slideIndex === 0 && (
            <motion.h2 
              key="intro-title"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -100 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-40 text-center px-4"
            >
              Ого это твои воспоминания!
            </motion.h2>
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {currentSlideData && (
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="relative w-full h-full flex flex-col items-center justify-center px-4"
            >
              {currentSlideData.image ? (
                <img src={currentSlideData.image} alt="slide" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-900 flex items-center justify-center opacity-60">
                  <span className="text-gray-500 text-xl md:text-2xl">Нет фото</span>
                </div>
              )}
              
              <motion.div
                animate={{ 
                  y: slideIndex === 0 ? 0 : -window.innerHeight / 2 + (isTouchDevice ? 60 : 80),
                  opacity: 1
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="relative z-10 max-w-4xl w-full text-center"
              >
                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] bg-black/40 px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/10">
                  {currentSlideData.text}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderPreGame = () => (
    <motion.div
      key="pre_game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 bg-black flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {preGameStep === 1 && (
          <motion.h1
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-widest"
          >
            А теперь...
          </motion.h1>
        )}
        {preGameStep === 2 && (
          <motion.h1
            key="step2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]"
          >
            Время игры!
          </motion.h1>
        )}
        {preGameStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="text-8xl font-bold text-white animate-pulse">
              {gameCountdown}
            </div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-md text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-300 uppercase tracking-widest">Инструкция</h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                Удерживай рыбу в <span className="text-green-400 font-bold">зелёной зоне</span>, нажимая ПРОБЕЛ или касаясь экрана. 
                Заполни шкалу прогресса, чтобы выловить рыбу. Тебе нужно поймать 5 рыб!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderGame = () => (
    <motion.div
      key="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-gray-900 overflow-hidden"
      onPointerDown={() => { isActionPressed.current = true; }}
      onPointerUp={() => { isActionPressed.current = false; }}
    >
      {/* Background River */}
      {CONTENT.game.bgRiver && (
        <img src={CONTENT.game.bgRiver} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="River" />
      )}

      {/* Rod and Hand */}
      {CONTENT.game.rodAndHand && (
        <img src={CONTENT.game.rodAndHand} className="absolute bottom-0 right-0 w-1/2 md:w-1/3 object-contain z-20" alt="Rod" />
      )}

      {/* Bucket */}
      <div className="absolute bottom-4 left-4 w-32 h-32 md:w-48 md:h-48 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={fishCaughtCount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full h-full"
          >
            {CONTENT.game.bucketStates[fishCaughtCount] ? (
              <img src={CONTENT.game.bucketStates[fishCaughtCount]} className="w-full h-full object-contain" alt={`Bucket with ${fishCaughtCount} fish`} />
            ) : (
              <div className="w-full h-full bg-gray-700/50 rounded-b-2xl border-x-4 border-b-4 border-gray-400 flex items-end justify-center pb-4">
                <div className="text-xs font-bold text-gray-400 uppercase">Ведро ({fishCaughtCount})</div>
              </div>
            )}
            {/* Fish count indicator */}
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-lg">
              {fishCaughtCount}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Game UI */}
      {gamePhase === 'playing' && (
        <>
          {/* Fishing Bar (Horizontal at top) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[90%] md:w-1/2 h-10 md:h-16 bg-blue-900/80 rounded-full overflow-hidden border-2 md:border-4 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] backdrop-blur-sm z-30">
            {/* Green Zone (Dynamic width) */}
            {(() => {
              const zoneWidth = 40 - (fishCaughtCount * 7);
              return (
                <div 
                  className="absolute h-full bg-green-500/60 border-x-2 md:border-x-4 border-green-300 shadow-[0_0_20px_rgba(34,197,94,0.8)]" 
                  style={{ 
                    width: `${zoneWidth}%`,
                    left: `${50 - (zoneWidth / 2)}%`
                  }}
                />
              );
            })()}
            
            {/* Fish Indicator */}
            <div
              className="absolute w-8 h-8 md:w-14 md:h-14 top-0 transition-all duration-75 flex items-center justify-center"
              style={{ left: `calc(${fishPos}% - 16px)` }}
            >
              {CONTENT.game.fishTexture ? (
                <img src={CONTENT.game.fishTexture} className="w-full h-full object-contain" alt="fish" />
              ) : (
                <Fish className="w-full h-full text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
              )}
            </div>
          </div>

          {/* Progress Bar (Vertical at right) */}
          <div className="absolute right-2 md:right-16 top-1/2 -translate-y-1/2 w-4 md:w-8 h-1/2 bg-gray-800/80 rounded-full overflow-hidden border border-gray-500 backdrop-blur-sm z-30">
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-green-300 transition-all duration-75"
              style={{ height: `${progress}%` }}
            />
          </div>

          {/* Instructions */}
          <AnimatePresence>
            {gameTime < 5 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-10 left-0 w-full text-center px-4 pointer-events-none z-30"
              >
                <div className="bg-black/60 backdrop-blur-md border border-white/20 inline-block px-6 py-3 rounded-2xl shadow-2xl">
                  <p className="text-lg md:text-3xl font-bold text-white drop-shadow-lg">
                    Удерживай рыбу в зелёной зоне!!
                  </p>
                  <p className="text-sm md:text-xl font-normal text-gray-300 mt-1">
                    {isTouchDevice ? 'Касайся экрана' : 'Жми пробел'}, чтобы выловить её
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Caught Animation */}
      <AnimatePresence>
        {gamePhase === 'caught' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-40"
          >
            <h2 className="text-6xl md:text-8xl font-bold text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,1)]">
              ПОЙМАЛ!
            </h2>
            {CONTENT.game.secondHand && (
              <motion.img 
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                src={CONTENT.game.secondHand} 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 object-contain" 
                alt="Second Hand" 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Reveal */}
      <AnimatePresence>
        {gamePhase === 'reveal' && (
          <motion.div
            initial={{ y: '100vh', scale: 0.1, rotate: -180 }}
            animate={{ y: 0, scale: 1, rotate: 45 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-64 h-64 md:w-96 md:h-96 shadow-[0_0_50px_rgba(255,255,255,0.5)] border-8 border-white bg-white flex items-center justify-center"
          >
            {CONTENT.game.gamePhotos[fishCaughtCount - 1] ? (
              <img src={CONTENT.game.gamePhotos[fishCaughtCount - 1]} className="w-full h-full object-cover" alt="Caught Fish Photo" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Fish className="w-24 h-24 text-blue-500" />
                <span className="text-black text-2xl font-bold">РЫБА {fishCaughtCount}</span>
              </div>
            )}
            
            {/* Splash effect */}
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-blue-400 rounded-full mix-blend-screen pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Celebration */}
      <AnimatePresence>
        {gamePhase === 'final' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ y: 300, scale: 0.5 }}
              animate={{ y: 0, scale: 1.5 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mb-32"
            >
              {CONTENT.game.bucketStates[5] ? (
                <img src={CONTENT.game.bucketStates[5]} className="w-48 h-48 md:w-64 md:h-64 object-contain" alt="Full Bucket" />
              ) : (
                <div className="w-48 h-48 bg-gray-600 rounded-b-2xl border-x-4 border-b-4 border-gray-300 flex items-center justify-center">
                  <Fish className="w-24 h-24 text-yellow-400" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-center px-4"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] mb-8">
                С 23 февраля, папа!
              </h1>
              <p className="text-2xl md:text-4xl text-blue-300 font-light tracking-widest uppercase">
                Ты лучший рыбак и лучший отец!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-serif">
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        preload="auto" 
      />

      {/* Backgrounds for Intro & Tabs */}
      <AnimatePresence>
        {phase === 'intro' && hoveredOption === 'fishing' && (
          <motion.div
            key="bg-fishing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url("${CONTENT.introImages.fishing}")` }}
          />
        )}
        {phase === 'intro' && hoveredOption === 'family' && (
          <motion.div
            key="bg-family"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url("${CONTENT.introImages.family}")` }}
          />
        )}
        {(phase === 'rejected' || phase === 'tabs') && CONTENT.introImages.slideshow.map((img, index) => (
          index === introSlide && (
            <motion.div
              key={`slide-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${img}")` }}
            />
          )
        ))}
      </AnimatePresence>

      {/* Main Content Router */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {phase === 'intro' && renderIntro()}
          {phase === 'rejected' && renderRejected()}
          {phase === 'tabs' && renderTabs()}
          {phase === 'tab_intro' && renderTabIntro()}
        </AnimatePresence>
      </div>

      {/* Fullscreen Overlays */}
      {phase === 'slideshow' && renderSlideshow()}
      {phase === 'pre_game' && renderPreGame()}
      {phase === 'game' && renderGame()}
    </div>
  );
}
