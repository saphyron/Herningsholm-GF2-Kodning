import React, { useState, useEffect } from "react";
import "../css/centaurList.css";
import PageShell from "../layouts/PageShell";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CentaurList() {
  const [centaurs, setCentaurs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCentaurs, setFilteredCentaurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔵 Hent statisk JSON fra /public/data/centaurs.json
  useEffect(() => {
    fetch("/data/centaurs.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCentaurs(data);
        setFilteredCentaurs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          `Kunne ikke hente /data/centaurs.json: ${err.message}. 
Sørg for at filen ligger i /public/data/ og at URL'en virker i browseren.`
        );
        setLoading(false);
      });
  }, []);

  // 🔵 Søgning (du kan tilføje sortering, hvis du vil)
  useEffect(() => {
    const filtered = centaurs.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCentaurs(filtered);
  }, [searchTerm, centaurs]);

  // Helper: find korrekt billede (brug "image" i JSON eller fallback til {id}.png)
  const getImageSrc = (c) => {
    const file = c.image ? c.image : `${c.id}.png`;
    return `/data/pics/${file}`;
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <PageShell>
      <div className="centaur-list">
        <h1>Centaur List</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}

        <div className="controls">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 🔵 Vandret liste med små thumbnails */}
        <div className="thumb-strip" role="list">
          {filteredCentaurs.map((c) => {
            const isExpanded = expandedId === c.id;
            return (
              <div key={c.id} role="listitem" className="thumb-item">
                <button
                  className={`thumb-button ${isExpanded ? "active" : ""}`}
                  onClick={() => toggleExpand(c.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`centaur-details-${c.id}`}
                  title={`Vis detaljer for ${c.name}`}
                >
                  <img
                    src={getImageSrc(c)}
                    alt={c.name}
                    className="thumb-image"
                    onError={(e) => {
                      // fallback hvis billede mangler
                      e.currentTarget.src = "/data/pics/placeholder.png";
                    }}
                  />
                  <div className="thumb-meta">
                    <span className="thumb-name">{c.name}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* 🔵 Udvalgt detailpanel */}
        {expandedId != null && (
          <div
            id={`centaur-details-${expandedId}`}
            className="details-panel"
            role="region"
            aria-live="polite"
          >
            {(() => {
              const c = filteredCentaurs.find((x) => x.id === expandedId);
              if (!c) return null;
              return (
                <div className="details-content">
                  <div className="details-left">
                    <img
                      src={getImageSrc(c)}
                      alt={c.name}
                      className="details-image"
                      onError={(e) => {
                        e.currentTarget.src = "/data/pics/placeholder.png";
                      }}
                    />
                  </div>

                  <div className="details-right">
                    <h2 className="details-title">{c.name}</h2>
                    {c.description && (
                      <p className="details-row">
                        <strong>Description:</strong> {c.description}
                      </p>
                    )}

                    {c.appearance && (
                      <>
                        <h3 className="section-title">Appearance</h3>
                        <ul className="appearance-list">
                          {"hair" in c.appearance && (
                            <li>
                              <strong>Hair:</strong> {c.appearance.hair}
                            </li>
                          )}
                          {"skin" in c.appearance && (
                            <li>
                              <strong>Skin:</strong> {c.appearance.skin}
                            </li>
                          )}
                          {"horseColor" in c.appearance && (
                            <li>
                              <strong>Horse Color:</strong> {c.appearance.horseColor}
                            </li>
                          )}
                          {"outfit" in c.appearance && (
                            <li>
                              <strong>Outfit:</strong> {c.appearance.outfit}
                            </li>
                          )}
                        </ul>
                      </>
                    )}

                    {c.setting && (
                      <p className="details-row">
                        <strong>Setting:</strong> {c.setting}
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </PageShell>
  );
}