import React, { useEffect } from 'react';

function GoogleTrendsWidget() {
  useEffect(() => {
    // Créer un élément script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ssl.gstatic.com/trends_nrtr/3461_RC01/embed_loader.js';
    script.async = true;

    // Ajouter le script à la page
    document.head.appendChild(script);

    // Fonction pour rendre le widget une fois que le script est chargé
    script.onload = () => {
      window.trends.embed.renderExploreWidget(
        "TIMESERIES",
        {
          "comparisonItem": [{ "keyword": "prospection entreprise", "geo": "FR", "time": "today 3-m" }],
          "category": 0,
          "property": ""
        },
        {
          "exploreQuery": "date=today%203-m&geo=FR&q=prospection%20entreprise&hl=fr",
          "guestPath": "https://trends.google.fr:443/trends/embed/"
        }
      );
    };

    // Nettoyer le script lorsque le composant est démonté
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div id="google-trends-widget">
      {/* Ce div sera rempli par le widget Google Trends */}
    </div>
  );
}

export default GoogleTrendsWidget;
