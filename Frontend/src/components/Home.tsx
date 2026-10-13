import { Link } from 'react-router-dom';
import './styles/home.css';
import type { Person } from '../types/person';
import { useDocumentTitle } from '../useDocumentTitle';

interface HomeProps {
    user: Person | null;
}

const Home = ({user}: HomeProps) => {
    useDocumentTitle('Home');

    return (
        <div className="home">
            <section className="home-hero">
                <div className="home-hero-content">
                    <p className="home-eyebrow">
                        University of Massachusetts Amherst
                    </p>

                    <h1>
                        HackUMass <span className="home-edition">XIV</span>
                    </h1>

                    <p className="home-tagline">
                        Build. Learn. Create.
                    </p>

                    <p className="home-description">
                        HackUMass is the perfect place for students of all
                        backgrounds and experience levels to dive into the
                        world of technology. As a beginner-friendly hackathon,
                        we provide hands-on workshops and dedicated mentorship
                        to teach you the skills you need to apply technology
                        in your field.
                    </p>

                    <div className="home-actions">
                        {user && user.applied
                        ? <Link
                            to="/application-status"
                            className="home-apply-button"
                        >
                            Check Your Application Status
                            <span aria-hidden="true">→</span>
                        </Link>
                        : <Link
                            to="/apply"
                            className="home-apply-button"
                        >
                            Apply to HackUMass
                            <span aria-hidden="true">→</span>
                        </Link>}
                    </div>
                </div>

                <div className="home-event-card">
                    <div className="home-event-number">
                        <span>36</span>
                        <p>Hours</p>
                    </div>

                    <div className="home-event-divider" />

                    <div className="home-event-text">
                        <h2>One weekend.</h2>
                        <p>
                            Learn new skills, meet other students,
                            and turn an idea into something real.
                        </p>
                    </div>
                </div>
            </section>

            <section className="home-about">
                <div className="home-about-heading">
                    <p className="home-section-label">
                        More Than a Competition
                    </p>

                    <h2>
                        Your ideas.
                        <br />
                        Your team.
                        <br />
                        Your project.
                    </h2>
                </div>

                <div className="home-about-content">
                    <p>
                        Over the course of 36 hours, you'll have the chance
                        to collaborate with like-minded students from across
                        the country, build an exciting project with our
                        support, and compete for amazing prizes.
                    </p>

                    <p>
                        Beyond the competition, HackUMass is also an
                        incredible opportunity to network with industry
                        professionals, gain real-world experience, and join
                        a vibrant community of innovators who share your
                        passion for learning and creating.
                    </p>
                </div>
            </section>

            <section className="home-features">
                <article className="home-feature">
                    <span className="home-feature-number">01</span>
                    <h3>Learn</h3>
                    <p>
                        Explore new technologies through hands-on workshops
                        designed for hackers of every experience level.
                    </p>
                </article>

                <article className="home-feature">
                    <span className="home-feature-number">02</span>
                    <h3>Build</h3>
                    <p>
                        Work with other students to transform an idea into
                        a project over an unforgettable 36 hours.
                    </p>
                </article>

                <article className="home-feature">
                    <span className="home-feature-number">03</span>
                    <h3>Connect</h3>
                    <p>
                        Meet mentors, industry professionals, and students
                        who are just as excited about creating as you are.
                    </p>
                </article>
            </section>

            <section className="home-cta">
                <p>Ready to build something?</p>

                <h2>Join us at HackUMass XIV.</h2>

                {user && user.applied
                ? <Link
                    to="/application-status"
                    className="home-apply-button"
                >
                    Check Your Application Status
                    <span aria-hidden="true">→</span>
                </Link>
                : <Link
                    to="/apply"
                    className="home-apply-button"
                >
                    Apply to HackUMass
                    <span aria-hidden="true">→</span>
                </Link>}
            </section>
        </div>
    );
};

export default Home;