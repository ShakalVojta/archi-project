import React from 'react';
import './About.scss';
import Icon from '@mdi/react';
import { mdiHandshakeOutline, mdiCertificateOutline, mdiShieldCheckOutline } from '@mdi/js';
import { useTextUtils } from '../../context/TextUtilsContext.jsx';  // Importujeme náš kontext

const About = () => {
    const { replaceWithNonBreakingSpace } = useTextUtils(); // Použijeme funkci z kontextu

    const text1 = "Rádi byste se zařadili mezi další obce v ČR, které uspořádají architektonickou soutěž, a potřebujete pomoci s její organizací? Rádi Vám pomůžeme s výběrem nejvhodnějšího dodavatele pro Váš architektonický, krajinářský, urbanistický nebo výtvarný návrh.";
    const text2 = "Jsme tým složený z architektky a právníka, kteří Vás provedou celým průběhem architektonické soutěže. Poskytujeme kompletní poradenství od počátečních příprav přes zajištění řádného procesu až ke zveřejnění a propagaci výsledku.";
    const text3 = "Zajistíme hladký průběh soutěže, která bude splňovat podmínky stanovené Českou komorou architektů a zákonem o zadávání veřejných zakázek. Zaručujeme osobní přístup k celému projektu a klademe důraz na osobní setkání a konzultace.";

    return (
        <section className="about" id="about">
            <h2>S námi zvládnete každou architektonickou výzvu</h2>
            <div className="about-content">
                <div className="about-text">
                    <div className="text-block">
                        <Icon path={mdiHandshakeOutline} size={1.5} rotate={40} color="black"/>
                        <p>{replaceWithNonBreakingSpace(text1)}</p>
                    </div>
                    <div className="text-block">
                        <Icon path={mdiCertificateOutline} size={1.5} color="black"/>
                        <p>{replaceWithNonBreakingSpace(text2)}</p>
                    </div>
                    <div className="text-block">
                        <Icon path={mdiShieldCheckOutline} size={1.5} color="black"/>
                        <p>{replaceWithNonBreakingSpace(text3)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
