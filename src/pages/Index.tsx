import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CAR_IMAGE = "https://cdn.poehali.dev/projects/1d23cb87-dee8-4adb-8b35-cd8ddac3f88e/files/84fcbba1-edf4-45a8-b1c0-23064ec7456f.jpg";

const TARIFFS = [
  {
    name: "Городской",
    price: "от 199 ₽",
    desc: "Поездки по городу",
    features: ["Подача за 5 мин", "Кондиционер", "Безналичный расчёт"],
    icon: "MapPin",
    accent: false,
  },
  {
    name: "Комфорт",
    price: "от 350 ₽",
    desc: "Бизнес-класс в городе",
    features: ["Подача за 3 мин", "Тихий салон", "Зарядка в авто", "Вода в салоне"],
    icon: "Star",
    accent: true,
  },
  {
    name: "Межгород",
    price: "от 15 ₽/км",
    desc: "Поездки за пределы города",
    features: ["Любые расстояния", "Комфортный маршрут", "Фиксированная цена"],
    icon: "Navigation",
    accent: false,
  },
];

const SERVICES = [
  { icon: "Zap", title: "Молниеносная подача", desc: "Авто приедет за 3–7 минут — быстрее не бывает" },
  { icon: "Shield", title: "Безопасность", desc: "Все водители проходят строгий отбор и проверку" },
  { icon: "MapPin", title: "Межгород", desc: "Поездки в любой город — удобно и по фиксированной цене" },
  { icon: "BadgePercent", title: "Скидка 10%", desc: "Для новых клиентов на первые 3 поездки" },
  { icon: "Clock", title: "Круглосуточно", desc: "Работаем 24/7 — в любое время дня и ночи" },
  { icon: "CreditCard", title: "Удобная оплата", desc: "Наличные, карта или онлайн — как удобно вам" },
];

interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

const BOT_REPLIES: Record<string, string> = {
  default: "Здравствуйте! Я помогу вам с заказом такси. Напишите, откуда и куда нужно ехать.",
  цена: "Городские поездки — от 199 ₽, межгород — от 15 ₽/км. Новым клиентам скидка 10%!",
  скидка: "Скидка 10% действует для всех новых клиентов на первые 3 поездки. Назовите ваш номер — оформим!",
  привет: "Привет! Куда едем? Напишите маршрут и я рассчитаю стоимость 🚖",
  заказ: "Чтобы оформить заказ, укажите адрес подачи и пункт назначения. Подача — от 3 минут!",
};

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase();
  for (const key of Object.keys(BOT_REPLIES)) {
    if (key !== "default" && lower.includes(key)) return BOT_REPLIES[key];
  }
  return BOT_REPLIES.default;
}

export default function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "Привет! Я помогу с заказом такси Gold Line. Куда едем?" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ from: "", to: "", time: "", name: "", phone: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    const userMsg: ChatMessage = { from: "user", text: inputVal };
    const botMsg: ChatMessage = { from: "bot", text: getBotReply(inputVal) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputVal("");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
  };

  return (
    <div className="gl-root">
      {/* NAV */}
      <nav className={`gl-nav ${navScrolled ? "gl-nav--scrolled" : ""}`}>
        <div className="gl-nav__logo">
          <span className="gl-nav__logo-g">G</span>old <span className="gl-nav__logo-line">Line</span>
        </div>
        <div className="gl-nav__links">
          <button onClick={() => scrollTo("services")}>Услуги</button>
          <button onClick={() => scrollTo("tariffs")}>Тарифы</button>
          <button onClick={() => scrollTo("about")}>О нас</button>
          <button onClick={() => scrollTo("contact")}>Связь</button>
        </div>
        <button className="gl-btn gl-btn--gold gl-nav__cta" onClick={() => setBookingOpen(true)}>
          Заказать
        </button>
      </nav>

      {/* HERO */}
      <section className="gl-hero">
        <div className="gl-hero__bg">
          <img src={CAR_IMAGE} alt="Gold Line Taxi" className="gl-hero__img" />
          <div className="gl-hero__overlay" />
          <div className="gl-speed-lines">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="gl-speed-line" style={{ top: `${10 + i * 10}%`, animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
        <div className="gl-hero__content">
          <div className="gl-hero__badge">🏆 Быстрое такси #1 в городе</div>
          <h1 className="gl-hero__title">
            <span className="gl-hero__title-gold">GOLD</span>
            <span className="gl-hero__title-line"> LINE</span>
          </h1>
          <p className="gl-hero__sub">Домчим куда угодно — по городу и межгороду</p>
          <div className="gl-hero__discount">
            <span className="gl-discount-badge">−10%</span>
            <span className="gl-discount-text">скидка новым клиентам</span>
          </div>
          <div className="gl-hero__actions">
            <button className="gl-btn gl-btn--gold gl-btn--lg" onClick={() => setBookingOpen(true)}>
              <Icon name="Car" size={20} />
              Забронировать
            </button>
            <button className="gl-btn gl-btn--outline gl-btn--lg" onClick={() => scrollTo("tariffs")}>
              <Icon name="DollarSign" size={20} />
              Тарифы
            </button>
          </div>
          <div className="gl-hero__stats">
            <div className="gl-stat"><span className="gl-stat__num">3 мин</span><span className="gl-stat__label">подача</span></div>
            <div className="gl-stat__divider" />
            <div className="gl-stat"><span className="gl-stat__num">24/7</span><span className="gl-stat__label">работаем</span></div>
            <div className="gl-stat__divider" />
            <div className="gl-stat"><span className="gl-stat__num">5000+</span><span className="gl-stat__label">клиентов</span></div>
          </div>
        </div>
        <div className="gl-hero__scroll-hint" onClick={() => scrollTo("services")}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="gl-section">
        <div className="gl-container">
          <div className="gl-section__header">
            <div className="gl-section__tag">Что мы предлагаем</div>
            <h2 className="gl-section__title">Наши <span className="gl-gold">услуги</span></h2>
          </div>
          <div className="gl-services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="gl-service-card">
                <div className="gl-service-card__icon">
                  <Icon name={s.icon} size={28} />
                </div>
                <h3 className="gl-service-card__title">{s.title}</h3>
                <p className="gl-service-card__desc">{s.desc}</p>
                <div className="gl-service-card__line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFFS */}
      <section id="tariffs" className="gl-section gl-section--dark">
        <div className="gl-container">
          <div className="gl-section__header">
            <div className="gl-section__tag">Прозрачные цены</div>
            <h2 className="gl-section__title">Наши <span className="gl-gold">тарифы</span></h2>
          </div>
          <div className="gl-tariffs-grid">
            {TARIFFS.map((t) => (
              <div key={t.name} className={`gl-tariff-card ${t.accent ? "gl-tariff-card--accent" : ""}`}>
                {t.accent && <div className="gl-tariff-card__popular">Популярный</div>}
                <div className="gl-tariff-card__icon">
                  <Icon name={t.icon} size={32} />
                </div>
                <h3 className="gl-tariff-card__name">{t.name}</h3>
                <div className="gl-tariff-card__price">{t.price}</div>
                <p className="gl-tariff-card__desc">{t.desc}</p>
                <ul className="gl-tariff-card__features">
                  {t.features.map((f) => (
                    <li key={f}>
                      <Icon name="Check" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="gl-btn gl-btn--gold gl-btn--full" onClick={() => setBookingOpen(true)}>
                  Выбрать тариф
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="gl-section">
        <div className="gl-container">
          <div className="gl-about">
            <div className="gl-about__text">
              <div className="gl-section__tag">История компании</div>
              <h2 className="gl-section__title">О <span className="gl-gold">Gold Line</span></h2>
              <p className="gl-about__desc">
                Gold Line — это быстрое и надёжное такси, которое работает каждый день без выходных.
                Мы везём вас по городу и в другие города с максимальным комфортом.
              </p>
              <p className="gl-about__desc">
                Наши водители — профессионалы с большим опытом. Каждый автомобиль проходит регулярное техническое обслуживание.
                Ваша безопасность и комфорт — наш главный приоритет.
              </p>
              <div className="gl-about__metrics">
                <div className="gl-metric">
                  <span className="gl-metric__val">7+</span>
                  <span className="gl-metric__label">лет на рынке</span>
                </div>
                <div className="gl-metric">
                  <span className="gl-metric__val">50+</span>
                  <span className="gl-metric__label">водителей</span>
                </div>
                <div className="gl-metric">
                  <span className="gl-metric__val">4.9 ★</span>
                  <span className="gl-metric__label">средняя оценка</span>
                </div>
              </div>
            </div>
            <div className="gl-about__visual">
              <div className="gl-about__card">
                <div className="gl-about__card-icon">🚖</div>
                <div className="gl-about__card-title">Gold Line</div>
                <div className="gl-about__card-sub">Быстрое такси</div>
                <div className="gl-about__card-tag">−10% новым</div>
              </div>
              <div className="gl-about__deco gl-about__deco--1" />
              <div className="gl-about__deco gl-about__deco--2" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="gl-section gl-section--dark">
        <div className="gl-container">
          <div className="gl-section__header">
            <div className="gl-section__tag">Свяжитесь с нами</div>
            <h2 className="gl-section__title">Мы всегда <span className="gl-gold">на связи</span></h2>
          </div>
          <div className="gl-contact-grid">
            <div className="gl-contact-card">
              <Icon name="Phone" size={28} />
              <div>
                <div className="gl-contact-card__label">Телефон</div>
                <div className="gl-contact-card__val">+7 (999) 000-00-00</div>
              </div>
            </div>
            <div className="gl-contact-card">
              <Icon name="MessageCircle" size={28} />
              <div>
                <div className="gl-contact-card__label">Онлайн-чат</div>
                <div className="gl-contact-card__val">
                  <button className="gl-link" onClick={() => setChatOpen(true)}>Написать нам</button>
                </div>
              </div>
            </div>
            <div className="gl-contact-card">
              <Icon name="Clock" size={28} />
              <div>
                <div className="gl-contact-card__label">Режим работы</div>
                <div className="gl-contact-card__val">Круглосуточно, 24/7</div>
              </div>
            </div>
            <div className="gl-contact-card">
              <Icon name="MapPin" size={28} />
              <div>
                <div className="gl-contact-card__label">Зона работы</div>
                <div className="gl-contact-card__val">Город + межгород</div>
              </div>
            </div>
          </div>
          <div className="gl-contact__cta">
            <button className="gl-btn gl-btn--gold gl-btn--lg" onClick={() => setBookingOpen(true)}>
              <Icon name="Car" size={20} />
              Забронировать поездку
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="gl-footer">
        <div className="gl-container">
          <div className="gl-footer__inner">
            <div className="gl-nav__logo">
              <span className="gl-nav__logo-g">G</span>old <span className="gl-nav__logo-line">Line</span>
            </div>
            <div className="gl-footer__links">
              <button onClick={() => scrollTo("services")}>Услуги</button>
              <button onClick={() => scrollTo("tariffs")}>Тарифы</button>
              <button onClick={() => scrollTo("about")}>О нас</button>
              <button onClick={() => scrollTo("contact")}>Контакты</button>
            </div>
            <div className="gl-footer__copy">© 2025 Gold Line. Все права защищены.</div>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="gl-modal-overlay" onClick={() => { setBookingOpen(false); setBookingDone(false); }}>
          <div className="gl-modal" onClick={(e) => e.stopPropagation()}>
            <button className="gl-modal__close" onClick={() => { setBookingOpen(false); setBookingDone(false); }}>
              <Icon name="X" size={20} />
            </button>
            {bookingDone ? (
              <div className="gl-modal__success">
                <div className="gl-modal__success-icon">✅</div>
                <h3>Заявка принята!</h3>
                <p>Наш оператор свяжется с вами в течение 2 минут для подтверждения поездки.</p>
                <button className="gl-btn gl-btn--gold" onClick={() => { setBookingOpen(false); setBookingDone(false); }}>
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <h2 className="gl-modal__title">Бронирование <span className="gl-gold">поездки</span></h2>
                <form className="gl-booking-form" onSubmit={handleBooking}>
                  <div className="gl-form-group">
                    <label>Откуда</label>
                    <input
                      type="text"
                      placeholder="Адрес подачи"
                      value={bookingForm.from}
                      onChange={(e) => setBookingForm({ ...bookingForm, from: e.target.value })}
                      required
                    />
                  </div>
                  <div className="gl-form-group">
                    <label>Куда</label>
                    <input
                      type="text"
                      placeholder="Адрес назначения"
                      value={bookingForm.to}
                      onChange={(e) => setBookingForm({ ...bookingForm, to: e.target.value })}
                      required
                    />
                  </div>
                  <div className="gl-form-group">
                    <label>Время подачи</label>
                    <input
                      type="datetime-local"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    />
                  </div>
                  <div className="gl-form-row">
                    <div className="gl-form-group">
                      <label>Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Имя"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="gl-form-group">
                      <label>Телефон</label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="gl-btn gl-btn--gold gl-btn--full gl-btn--lg">
                    <Icon name="Car" size={18} />
                    Оформить поездку
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHAT */}
      <div className={`gl-chat ${chatOpen ? "gl-chat--open" : ""}`}>
        <div className="gl-chat__header" onClick={() => setChatOpen(!chatOpen)}>
          <div className="gl-chat__header-left">
            <div className="gl-chat__avatar">GL</div>
            <div>
              <div className="gl-chat__name">Gold Line</div>
              <div className="gl-chat__status">
                <span className="gl-online-dot" />
                онлайн
              </div>
            </div>
          </div>
          <Icon name={chatOpen ? "ChevronDown" : "ChevronUp"} size={20} />
        </div>
        {chatOpen && (
          <>
            <div className="gl-chat__messages">
              {messages.map((m, i) => (
                <div key={i} className={`gl-chat__msg gl-chat__msg--${m.from}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="gl-chat__input">
              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>
                <Icon name="Send" size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      {!chatOpen && (
        <button className="gl-chat-fab" onClick={() => setChatOpen(true)}>
          <Icon name="MessageCircle" size={24} />
          <span className="gl-chat-fab__badge">1</span>
        </button>
      )}
    </div>
  );
}
