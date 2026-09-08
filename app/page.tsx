/* oxlint-disable next/no-img-element -- vinext's next/image shim currently fails at runtime. */
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { MobileNav } from './mobile-nav';
import { IntelligencePlatform } from './intelligence-platform';
import { BriefingForm } from './briefing-form';

const reportUrl =
  'https://www.deloitte.com/content/dam/assets-zone3/us/en/docs/services/consulting/2026/deloitte-building-the-lunar-economy-report.pdf';

const team = [
  {
    name: 'Jacob Matthews',
    role: 'Chief Executive Officer',
    detail: 'U.S. Army veteran · Former co-founder & CTO, Zeno Power',
  },
  {
    name: 'Kevin Cirilli',
    role: 'Head of Explorer',
    detail: 'Former Chief Washington Correspondent, Bloomberg',
  },
  {
    name: 'Cole Duffner',
    role: 'Head of Terminal',
    detail: 'Lockheed Martin',
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src="/potomac-logo.webp" alt="" width={240} height={240} />
    </span>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#intelligence-platform">
        Skip to the platforms
      </a>
      <header className="masthead">
        <a className="brand" href="#top" aria-label="Potomac home">
          <BrandMark />
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#pathfinder">Pathfinder</a>
          <a className="platform-link" href="#intelligence-platform">
            Intelligence Platform
          </a>
          <a href="#company">Company</a>
        </nav>

        <a className="nav-cta" href="#briefing">
          <span className="desktop-briefing-label">Request a </span>briefing
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.7} />
        </a>
        <MobileNav />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="signal-dot" />
            Lunar intelligence / mission-ready
          </div>

          <div className="hero-title-wrap">
            <p className="chapter-label">Leaders of the Lunar Data Market</p>
            <h1>
              Before you build the Moon,
              <em>scout the ground.</em>
            </h1>
            <p className="hero-summary">
              Potomac collects proprietary data from the Moon&apos;s surface to
              better inform space industrialists financing, building, and
              securing the Moon.
            </p>
          </div>

          <div className="hero-actions">
            <a className="button-primary" href="#briefing">
              Request a lunar briefing
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
            </a>
            <a className="text-link" href="#intelligence-platform">
              Explore the platform
              <ArrowDownRight aria-hidden="true" size={17} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-label="Pathfinder lunar scout concept"
        >
          <img
            src="/pathfinder-1448.webp"
            srcSet="/pathfinder-640.webp 640w, /pathfinder-960.webp 960w, /pathfinder-1448.webp 1448w"
            sizes="(max-width: 1160px) 100vw, 50vw"
            alt="Pathfinder lunar scout on the Moon"
            width={1448}
            height={1086}
            fetchPriority="high"
          />
          <div className="visual-shade" />
          <div className="reticle reticle-one" aria-hidden="true" />
          <div className="reticle reticle-two" aria-hidden="true" />

          <div className="mission-badge">
            <span>Pathfinder</span>
          </div>

          <div className="visual-caption">
            <span>78.5° S</span>
            <span>Site intelligence / Lunar south</span>
          </div>
        </div>
      </section>

      <section className="market-section" id="market">
        <div className="market-intro">
          <div>
            <p className="eyebrow-dark">Ground truth without mission risk</p>
            <h2>
              The Moon is an emerging market.
              <em>Data is its first export.</em>
            </h2>
          </div>

          <div className="market-copy">
            <p>
              Potomac provides proprietary lunar data and intelligence to space
              industrialists. Don’t buy the mission risk – buy the data.
              Pathfinder is Potomac&apos;s first lunar hardware product that
              collects proprietary data at priority lunar sites.
            </p>
          </div>
        </div>

        <div className="market-evidence">
          <div className="market-stat">
            <span>Total lunar economy</span>
            <strong>$566B</strong>
            <p>Potential cumulative economic value</p>
          </div>
          <div className="market-stat market-stat-data">
            <span>Lunar data &amp; services</span>
            <strong>$31.7B</strong>
            <p>Potential cumulative economic value</p>
          </div>
          <div className="market-source">
            <p>
              Deloitte estimates for 2026–2050, accelerated-growth scenario.
              Cumulative values in US dollars, discounted at 7% in real terms.
            </p>
            <a href={reportUrl + '#page=11'} target="_blank" rel="noreferrer">
              Read the Deloitte report{' '}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <IntelligencePlatform />

      <section className="pathfinder-section" id="pathfinder">
        <figure className="pathfinder-image">
          <img
            src="/pathfinder-1448.webp"
            srcSet="/pathfinder-640.webp 640w, /pathfinder-960.webp 960w, /pathfinder-1448.webp 1448w"
            sizes="(max-width: 1160px) 100vw, 53vw"
            alt="Rendering of the Pathfinder lunar scout"
            width={1448}
            height={1086}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="pathfinder-copy">
          <p className="eyebrow">Pathfinder</p>
          <h2>
            The CubeSat
            <em>for the Moon.</em>
          </h2>
          <p className="pathfinder-summary">
            Pathfinder gives universities, startups, and established lunar
            customers a far lower-cost way to put hardware on the Moon—and opens
            the market to many more participants.
          </p>
          <div className="pathfinder-context">
            <p>
              CubeSats helped open orbit beyond large, expensive spacecraft,
              bringing small-satellite missions within reach of university teams
              and new companies. Pathfinder brings that market-opening idea to
              the lunar surface.
            </p>
            <p>
              Lunar delivery remains a major undertaking: NASA&apos;s Blue Ghost
              delivery contract reached $101.5 million. By lowering the cost of
              access, Pathfinder enables more teams to deploy instruments, test
              ideas, and build businesses on the Moon.
            </p>
          </div>
          <p className="pathfinder-sources">
            NASA context:{' '}
            <a
              href="https://science.nasa.gov/science-research/science-enabling-technology/technology-highlights/cubesat-platform-enables-inexpensive-space-telescope/"
              target="_blank"
              rel="noreferrer"
            >
              CubeSat access
            </a>
            {' · '}
            <a
              href="https://www.nasa.gov/news-release/nasa-sets-coverage-of-fireflys-first-robotic-commercial-moon-landing/"
              target="_blank"
              rel="noreferrer"
            >
              Blue Ghost delivery award
            </a>
            . The award covers end-to-end delivery, not an individual payload.
          </p>

          <dl className="spec-list">
            <div>
              <dt>Mass</dt>
              <dd>
                <strong>10 kg</strong>
                <span>About a Thanksgiving turkey</span>
              </dd>
            </div>
            <div>
              <dt>Dimensions</dt>
              <dd>
                <strong>30 × 9 cm</strong>
                <span>About the length of a football</span>
              </dd>
            </div>
            <div>
              <dt>Sensing</dt>
              <dd>
                <strong>Water · terrain · vibration · radio · optical</strong>
                <span>
                  Finds water, assesses safe landing sites, detects vibrations
                  and nearby radios, and captures imagery
                </span>
              </dd>
            </div>
            <div>
              <dt>Target launch</dt>
              <dd>
                <strong>2028</strong>
                <span>Rideshare deployment</span>
              </dd>
            </div>
          </dl>
          <div className="pathfinder-heritage">
            <h3>Flight-qualified technology. Ground-level intelligence.</h3>
            <p>
              Using space-nuclear technology developed to deploy electronics
              from orbit, Pathfinder adapts a NASA flight-qualified design for a
              focused lunar scouting mission.
            </p>
          </div>
        </div>
      </section>

      <section className="company-section" id="company">
        <div className="company-layout">
          <div className="company-copy">
            <h2 className="company-heading">
              BUILT BY OPERATORS ACROSS DEFENSE, POWER, AEROSPACE, AND MEDIA.
            </h2>
            <p className="company-summary">
              Potomac combines reconnaissance instinct, space systems execution,
              and market intelligence to build the infrastructure lunar
              decision-makers are missing.
            </p>

            <div className="team-list">
              {team.map((member) => (
                <article key={member.name}>
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <small>{member.detail}</small>
                  </div>
                </article>
              ))}
            </div>

            <p className="advisors">
              Advisors / Tom Reed · Clive Neal &nbsp;&nbsp; Partnership / UDRI ·
              Chad Barklay
            </p>
          </div>

          <figure className="company-image">
            <img
              src="/team-1672.webp"
              srcSet="/team-640.webp 640w, /team-1040.webp 1040w, /team-1672.webp 1672w"
              sizes="(max-width: 1160px) 90vw, 48vw"
              alt="The full Potomac leadership team"
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>Potomac leadership</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <BriefingForm />

      <footer className="site-footer">
        <a className="footer-brand" href="#top" aria-label="Back to top">
          <BrandMark />
        </a>
        <p>Leaders of the lunar data market.</p>
        <div>
          <a href="mailto:info@potomacdb.com">info@potomacdb.com</a>
          <Link href="/inquiries">Team inbox</Link>
          <span>© 2026 Potomac</span>
        </div>
      </footer>
    </main>
  );
}
