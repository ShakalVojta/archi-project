import './Services.scss';
import { useState } from 'react';
import { useTextUtils } from '../../context/TextUtilsContext.jsx';


const servicesData = [
    {
        title: 'Zajištění soutěžních podkladů',
        description: 'Společně navštívíme řešené území a ujasníme si smysl a účel soutěže. Doporučíme vhodný typ soutěže (soutěž o návrh, soutěžní dialog apod.). Postupně definujeme soutěžní zadání včetně dalších nezbytných podkladů pro vypracování návrhů. Sestavíme soutěžní podmínky a předložíme je České komoře architektů ke konzultaci. Obstaráme, aby celá soutěž byla v souladu s platnou legislativou ČR.'
    },
    {
        title: 'Porota a pomocné orgány soutěže',
        description: 'Pro nezávislou část poroty soutěže doporučíme vhodné členy a přizvané odborníky. Zajistíme pomocné orgány soutěže, sekretáře a přezkušovatele. Svoláme a povedeme ustavující schůzi poroty, která je jedním z posledních kroků přípravy pro získání regulérnosti soutěže.'
    },
    {
        title: 'Vyhlášení soutěže a její průběh',
        description: 'Po vydání regulérnosti České komory architektů a oficiálním vyhlášení soutěže začíná běžet lhůta pro odevzdání soutěžního návrhu. V této době zajistíme prohlídky soutěžního místa a odpovíme na dotazy, které potenciální účastníci soutěže vznesou.'
    },
    {
        title: 'Hodnotící zasedání poroty',
        description: 'Po termínu odevzdání zkontrolujeme a přezkoušíme odevzdané soutěžní návrhy. Připravíme všechny náležité dokumenty na hodnotící zasedání poroty, na kterém budeme osobně přítomni a zaručíme jeho průběh v souladu se Soutěžním řádem České komory architektů.'
    },
    {
        title: 'Propagace výsledků soutěže',
        description: 'Pomůžeme s řádným vyhlášením výsledků soutěže a jejich propagací. Nabízíme sestavení katalogu k soutěži, tvorbu výstavního materiálu či organizaci představení vítězného návrhu veřejnosti. Po ukončení soutěže poskytujeme poradenství v navazujících fázích projektu.'
    }
];

const Services = () => {
    const { replaceWithNonBreakingSpace } = useTextUtils();
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleDescription = (index) => {
        setOpenIndexes((prevOpenIndexes) => {
            if (prevOpenIndexes.includes(index)) {
                return prevOpenIndexes.filter((i) => i !== index);
            } else {
                return [...prevOpenIndexes, index];
            }
        });
    };

    return (
        <section className="services" id="services">
            <h2>Nabízíme vám komplexní řešení</h2>
            <div className="services-list">
                {servicesData.map((service, index) => (
                    <div key={index} className="service-item">
                        <h3 onClick={() => toggleDescription(index)}>
                            {service.title}
                            <span className={`arrow ${openIndexes.includes(index) ? 'open' : ''}`}>▼</span>
                        </h3>
                        {openIndexes.includes(index) && (
                            <p className="service-description">{replaceWithNonBreakingSpace(service.description)}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
