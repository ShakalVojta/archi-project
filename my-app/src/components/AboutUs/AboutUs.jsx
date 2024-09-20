import React from "react";
import { useTextUtils } from "../../context/TextUtilsContext";
import './AboutUs.scss';
import lawyer  from '../../assets/lawyer.jpg'
import architect from '../../assets/architect.jpg'

const AboutUs = () => {
    const { replaceWithNonBreakingSpace } = useTextUtils();

    return (
        <section className="about-us" id="about-us">
            <h2>Náš tým</h2>
            <div className="about-team">
                <div className="team-member">
                    <img src={architect} alt="Architektka Anna Laubová"/>
                    <h3>Ing. arch. Anna Laubová</h3>
                    <p>{replaceWithNonBreakingSpace('Anna je absolventkou Fakulty architektury ČVUT v Praze. Během a po ukončení studií získávala zkušenosti v atelieru Bod architekti, který do velké míry formoval její vztah k architektuře. Po úspěchu v architektonické soutěži se profesně osamostatnila a od roku 2022 pracuje na vlastních projektech rozmanitého měřítka.')}</p>
                </div>
                <div className="team-member">
                    <img src={lawyer} alt="Právník Petr Kouba"/>
                    <h3>Mgr. Petr Kouba</h3>
                    <p>{replaceWithNonBreakingSpace('Petr získal právnické vzdělání na Právnické fakultě Masarykovy univerzity v Brně. Zaměřuje se na právo veřejných zakázek se specializací na architektonické soutěže. Současně působí v místní samosprávě jako zastupitel města Třeboň a v advokátní kanceláři. Disponuje potřebnými právními znalostmi a má praktické zkušenosti z komunální politiky.')}</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs;