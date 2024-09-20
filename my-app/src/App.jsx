import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import About from './components/About/About.jsx';
import Services from './components/Services/Services.jsx';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import { TextUtilsProvider } from "./context/TextUtilsContext.jsx";

function App() {
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleFormSubmit = () => {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <TextUtilsProvider>
            <Header />
            <main>
                {isSubmitted && (
                    <div className="submission-message">
                        <p>Email úspěšně odeslán!</p>
                    </div>
                )}
                <About />
                <Services />
                <AboutUs />
                <ContactForm onFormSubmit={handleFormSubmit} />
            </main>
            <Footer />
        </TextUtilsProvider>
    );
}

export default App;
