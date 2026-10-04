import { useState } from 'react';
import QRCode from 'react-qr-code';
import './styles/content.css';
import './styles/meals.css';

type Meal = 'Dinner' | 'Breakfast' | 'Lunch';

const Meals = () => {
    const [openMeal, setOpenMeal] = useState<Meal | null>(null);

    function toggleMeal(meal: Meal) {
        setOpenMeal((currentMeal) =>
            currentMeal === meal ? null : meal
        );
    }

    return (
        <section className="content-page">
            <div className="content-card">
                <h1>Meals</h1>

                <p className="meals-description">
                    Select the meal you are picking up and present its
                    QR code to an organizer.
                </p>

                <div className="meals-list">
                    <div className="meal">
                        <button
                            type="button"
                            className="meal-dropdown-button"
                            onClick={() => toggleMeal('Dinner')}
                            aria-expanded={openMeal === 'Dinner'}
                        >
                            <span>Dinner</span>

                            <span
                                className={`meal-dropdown-arrow ${
                                    openMeal === 'Dinner' ? 'open' : ''
                                }`}
                            >
                                ▼
                            </span>
                        </button>

                        {openMeal === 'Dinner' && (
                            <div className="meal-qr-section">
                                <p>Present this QR code for Dinner.</p>

                                <div className="meal-qr-code">
                                    <QRCode
                                        value="dinner-placeholder"
                                        size={180}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="meal">
                        <button
                            type="button"
                            className="meal-dropdown-button"
                            onClick={() => toggleMeal('Breakfast')}
                            aria-expanded={openMeal === 'Breakfast'}
                        >
                            <span>Breakfast</span>

                            <span
                                className={`meal-dropdown-arrow ${
                                    openMeal === 'Breakfast' ? 'open' : ''
                                }`}
                            >
                                ▼
                            </span>
                        </button>

                        {openMeal === 'Breakfast' && (
                            <div className="meal-qr-section">
                                <p>Present this QR code for Breakfast.</p>

                                <div className="meal-qr-code">
                                    <QRCode
                                        value="breakfast-placeholder"
                                        size={180}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="meal">
                        <button
                            type="button"
                            className="meal-dropdown-button"
                            onClick={() => toggleMeal('Lunch')}
                            aria-expanded={openMeal === 'Lunch'}
                        >
                            <span>Lunch</span>

                            <span
                                className={`meal-dropdown-arrow ${
                                    openMeal === 'Lunch' ? 'open' : ''
                                }`}
                            >
                                ▼
                            </span>
                        </button>

                        {openMeal === 'Lunch' && (
                            <div className="meal-qr-section">
                                <p>Present this QR code for Lunch.</p>

                                <div className="meal-qr-code">
                                    <QRCode
                                        value="lunch-placeholder"
                                        size={180}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Meals;